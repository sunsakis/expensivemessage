import { ethers } from 'ethers';
import ABI from '../../../contract/ABI.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { index } = req.body;

  try {
    const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, baseProvider);
    
    const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

    const [message, price, imgHash, messenger] = await Promise.all([
      contract.getMessages(index),
      contract.getPrices(index),
      contract.getImgHashes(index),
      contract.getMessengers(index),
    ]);

    // Try to resolve ENS name
    let resolvedName = messenger;
    try {
      const ensName = await mainnetProvider.lookupAddress(messenger);
      if (ensName) {
        resolvedName = ensName;
      }
    } catch (error) {
      console.error("Error resolving ENS:", error);
    }

    res.status(200).json({
      message,
      price: parseFloat(ethers.utils.formatEther(price)).toString(),
      imgHash,
      name: resolvedName
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
}