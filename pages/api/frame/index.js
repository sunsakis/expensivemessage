import { ethers } from 'ethers';
import ABI from '../../../contract/ABI.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const frameResponse = {
          frame: {
            version: 'vNext',
            image: 'https://www.expensivemessage.com/api/frame/image/latest',
            buttons: [
              {
                label: 'Go to Website',
                action: 'link',
                target: 'https://www.expensivemessage.com'
              }
            ]
          }
        };
        return res.status(200).json(frameResponse);
      }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { untrustedData, trustedData } = req.body;

    // Provider for Base network
    const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, baseProvider);

    // Provider for Ethereum mainnet (for ENS resolution)
    const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

    let newestMessage, newestCounter, newestPrice, newestImgHash, newestMessenger;

    // Get message and counter
    try {
      const newMessageCall = await contract.readMessage();
      newestMessage = newMessageCall[0].toString();
      newestCounter = newMessageCall[1].toNumber();
    } catch (error) {
      console.error("Error calling readMessage:", error);
      newestMessage = "Error reading message";
      newestCounter = 0;
    }

    // Get price
    try {
      newestPrice = await contract.getPrice();
    } catch (error) {
      console.error("Error calling getPrice:", error);
      newestPrice = ethers.BigNumber.from(0);
    }

    const formatPrice = parseFloat(ethers.utils.formatEther(newestPrice)).toString();

    // Get image hash
    try {
      newestImgHash = await contract.getImgHashes(newestCounter - 1);
    } catch (error) {
      console.error("Error calling getImgHashes:", error);
      newestImgHash = "";
    }

    // Get messenger and resolve ENS
    try {
      newestMessenger = await contract.getMessengers(newestCounter - 1);
      try {
        const ensName = await mainnetProvider.lookupAddress(newestMessenger);
        if (ensName) {
          newestMessenger = ensName;
        }
      } catch (ensError) {
        console.error("Error resolving ENS:", ensError);
      }
    } catch (error) {
      console.error("Error calling getMessengers:", error);
      newestMessenger = ethers.constants.AddressZero;
    }

    // Function to get image URL from hash
    function getImgURLFromHash(imgHash) {
      if (imgHash === '' || imgHash === undefined) {
        return 'https://www.expensivemessage.com/defaultMessage.png';
      }
      return imgHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
    }

    const frameResponse = {
        frame: {
        version: 'vNext',
        // Use a static URL instead of query parameters
        image: 'https://www.expensivemessage.com/api/frame/image/latest',
        buttons: [
            {
            label: 'Claim This Space',
            action: 'post'
            }
        ],
        postUrl: 'https://www.expensivemessage.com/api/frame'
        }
    };

    return res.status(200).json(frameResponse);
  } catch (error) {
    console.error('Frame error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}