import { createCanvas, loadImage } from '@napi-rs/canvas';
import { ethers } from 'ethers';
import ABI from '../../../../../contract/ABI.js';

export default async function handler(req, res) {
  // Set proper headers for browser-viewable image
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('Cache-Control', 'public, max-age=10');

  try {
    const baseProvider = new ethers.providers.JsonRpcProvider(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ABI,
      baseProvider
    );

    // Get contract data
    const newMessageCall = await contract.readMessage();
    const newestMessage = newMessageCall[0].toString();
    const newestCounter = newMessageCall[1].toNumber();
    const newestPrice = await contract.getPrice();
    const newestMessenger = await contract.getMessengers(newestCounter - 1);
    const newestImgHash = await contract.getImgHashes(newestCounter - 1);

    // Create canvas with Frame-specific dimensions
    const width = 1200;
    const height = 628; // 1.91:1 aspect ratio
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load and draw background image
    const imgUrl = newestImgHash ? 
      newestImgHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : 
      '/defaultMessage.png';
    const backgroundImage = await loadImage(imgUrl);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // Add dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Add spotlight effect
    const spotlightSize = Math.min(width, height) * 0.5;
    const gradient = ctx.createRadialGradient(
      width/2, height/2, 0,
      width/2, height/2, spotlightSize
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, 'transparent');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw message
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const leftMargin = 100;
    let y = height/2 - 60;
    const words = newestMessage.split(' ');
    ctx.textAlign = 'left';
    words.forEach(word => {
      ctx.fillText(word, leftMargin, y);
      y += 70;
    });

    // Draw messenger address (with ENS support)
    try {
      const ethProvider = new ethers.providers.JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
      );
      const ensName = await ethProvider.lookupAddress(newestMessenger);
      const displayName = ensName || `${newestMessenger.slice(0, 6)}...${newestMessenger.slice(-4)}`;
      
      ctx.font = '25px Arial';
      ctx.textAlign = 'left';  // Changed to left align
      const leftMargin = 150;  // Same margin as the message
      const messageBottomY = height/2 - 60 + (newestMessage.split(' ').length * 70); // Calculate position below last message line
      ctx.fillText(`by ${displayName}`, leftMargin, messageBottomY + 40); // Add some padding (40px) below message
    } catch (error) {
      console.error("ENS lookup failed:", error);
      ctx.fillText(`by ${newestMessenger.slice(0, 6)}...${newestMessenger.slice(-4)}`, leftMargin, messageBottomY + 40);
    }

    const buffer = canvas.toBuffer('image/png');
    return res.status(200).send(buffer);

  } catch (error) {
    console.error('Error generating image:', error);
    
    // Generate error image
    const canvas = createCanvas(1200, 628);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1200, 628);
    
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '40px Arial';
    ctx.fillText('Error generating image', width/2, height/2 - 20);
    ctx.font = '20px Arial';
    ctx.fillText('Please try again later', width/2, height/2 + 20);
    
    const buffer = canvas.toBuffer('image/png');
    return res.status(200).send(buffer);
  }
}