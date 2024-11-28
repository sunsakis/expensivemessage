import { ethers } from 'ethers';
import ABI from '../../../contract/ABI.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { start, end } = req.body;

  try {
    const baseProvider = new ethers.providers.JsonRpcProvider(`https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI, baseProvider);
    
    // For ENS resolution
    const mainnetProvider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);

    let messages = [];
    let prices = [];
    let imgHashes = [];
    let names = [];

    for (let i = start; i < end && i >= 0; i--) {
      const [message, price, imgHash, messenger] = await Promise.all([
        contract.getMessages(i),
        contract.getPrices(i),
        contract.getImgHashes(i),
        contract.getMessengers(i),
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

      messages.push(message);
      prices.push(parseFloat(ethers.utils.formatEther(price)).toString());
      imgHashes.push(imgHash);
      names.push(resolvedName);
    }

    res.status(200).json({ messages, prices, imgHashes, names });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}