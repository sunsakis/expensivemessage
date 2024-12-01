import { createCanvas } from 'canvas';
import { ethers } from 'ethers';
import ABI from '../../../../../contract/ABI.js';

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=30'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    return res.end();
  }

  try {
    const baseProvider = new ethers.providers.JsonRpcProvider(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ABI,
      baseProvider
    );

    let newestMessage, newestCounter, newestPrice, newestMessenger;

    // Fetch message and counter
    try {
      const newMessageCall = await contract.readMessage();
      newestMessage = newMessageCall[0].toString();
      newestCounter = newMessageCall[1].toNumber();
    } catch (error) {
      console.error("Error calling readMessage:", error);
      newestMessage = "Error reading message";
      newestCounter = 0;
    }

    // Fetch price
    try {
      newestPrice = await contract.getPrice();
    } catch (error) {
      console.error("Error calling getPrice:", error);
      newestPrice = ethers.BigNumber.from(0);
    }

    // Fetch messenger
    try {
      newestMessenger = await contract.getMessengers(newestCounter - 1);
    } catch (error) {
      console.error("Error calling getMessengers:", error);
      newestMessenger = ethers.constants.AddressZero;
    }

    const formatPrice = ethers.utils.formatEther(newestPrice);

    // Create canvas
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Configure text
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Draw message
    ctx.font = '60px Arial';
    const words = newestMessage.split(' ');
    let y = height/2 - 60;
    words.forEach(word => {
      ctx.fillText(word, width/2, y);
      y += 70;
    });

    // Draw messenger address
    ctx.font = '30px Arial';
    const shortAddress = `Posted by: ${newestMessenger.slice(0, 6)}...${newestMessenger.slice(-4)}`;
    ctx.fillText(shortAddress, width/2, height/2 + 80);

    // Draw price
    ctx.font = '24px Arial';
    ctx.fillText(`Price: ${formatPrice} ETH`, width/2, height/2 + 140);

    const buffer = canvas.toBuffer('image/png');
    res.writeHead(200, headers);
    return res.end(buffer);

  } catch (error) {
    console.error('Error:', error);
    
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '40px Arial';
    ctx.fillText('Error generating image', width/2, height/2 - 20);
    
    ctx.font = '20px Arial';
    ctx.fillText(error.message, width/2, height/2 + 20);

    const buffer = canvas.toBuffer('image/png');
    res.writeHead(500, headers);
    return res.end(buffer);
  }
}