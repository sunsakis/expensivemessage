import { ethers } from 'ethers';
import ABI from '../../../contract/ABI.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { untrustedData, trustedData } = req.body;

        // Provider for Base network
        const baseProvider = new ethers.providers.JsonRpcProvider(
            `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
        );
        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            ABI,
            baseProvider
        );

        // Get latest message data
        const newMessageCall = await contract.readMessage();
        const newestMessage = newMessageCall[0].toString();
        const newestCounter = newMessageCall[1].toNumber();
        const newestImgHash = await contract.getImgHashes(newestCounter - 1);

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
                image: getImgURLFromHash(newestImgHash), // Use the actual IPFS image
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
    } catch (error) {
        console.error('Frame error:', error);
        return res.status(500).json({ 
            frame: {
                version: 'vNext',
                image: 'https://www.expensivemessage.com/defaultMessage.png',
                buttons: [
                    {
                        label: 'Go to Website',
                        action: 'link',
                        target: 'https://www.expensivemessage.com'
                    }
                ]
            }
        });
    }
}