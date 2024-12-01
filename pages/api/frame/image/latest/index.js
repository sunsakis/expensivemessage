import { createCanvas, loadImage } from '@napi-rs/canvas';
import { ethers } from 'ethers';
import ABI from '../../../../../contract/ABI.js';

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=10'
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

    let newestMessage, newestCounter, newestPrice, newestMessenger, newestImgHash;

    try {
      const newMessageCall = await contract.readMessage();
      newestMessage = newMessageCall[0].toString();
      newestCounter = newMessageCall[1].toNumber();
    } catch (error) {
      console.error("Error calling readMessage:", error);
      newestMessage = "Error reading message";
      newestCounter = 0;
    }

    try {
      newestPrice = await contract.getPrice();
    } catch (error) {
      console.error("Error calling getPrice:", error);
      newestPrice = ethers.BigNumber.from(0);
    }

    try {
      newestMessenger = await contract.getMessengers(newestCounter - 1);
    } catch (error) {
      console.error("Error calling getMessengers:", error);
      newestMessenger = ethers.constants.AddressZero;
    }

    try {
      newestImgHash = await contract.getImgHashes(newestCounter - 1);
    } catch (error) {
      console.error("Error calling getImgHashes:", error);
      newestImgHash = "";
    }

    // Create canvas
    const width = 1200;
    const height = 628;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load and draw background image
    let backgroundImage;
    try {
      const imgUrl = newestImgHash ? 
        newestImgHash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : 
        '/defaultMessage.png';
      backgroundImage = await loadImage(imgUrl);
    } catch (error) {
      console.error("Error loading background image:", error);
      backgroundImage = await loadImage('/defaultMessage.png');
    }

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // Create spotlight effect
    const spotlightSize = Math.min(width, height) * 0.5;
    const centerX = width / 2;
    const centerY = height / 2;

    // Add first gradient (dark overlay)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Add radial gradient
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, spotlightSize
    );

    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, 'transparent');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Configure text
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    const formatPrice = ethers.utils.formatEther(newestPrice);
    
    // Draw message
    ctx.font = '50px Arial Bold';
    const words = newestMessage.split(' ');
    let y = height/2 - 60;
    const leftMargin = 150; // Adjust this value to control how far from the left edge
    words.forEach(word => {
        ctx.fillText(word, leftMargin, y);
        y += 70;
      });

    // Draw price
    // ctx.font = '25px Arial';
    // ctx.textAlign = 'center';
    // const leftMargin2 = 100;
    // const bottomMargin = 50; // Distance from bottom of canvas
    // const cleanPrice = formatPrice.endsWith('.0') ? formatPrice.slice(0, -2) : formatPrice;
    // ctx.fillText(`$${cleanPrice}`, leftMargin2 + 3, height - bottomMargin);

    // Draw messenger address
    ctx.font = '20px Arial';
    const rightMargin = 0;

    // Assuming you have access to ethers or web3 provider
    let displayName = newestMessenger;
    try {
        const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`);
        const ensName = await provider.lookupAddress(newestMessenger);
        if (ensName) {
            displayName = ensName;
        } else {
            displayName = `${newestMessenger.slice(0, 6)}...${newestMessenger.slice(-4)}`;
        }
    } catch (error) {
        displayName = `${newestMessenger.slice(0, 6)}...${newestMessenger.slice(-4)}`;
    }

const shortAddress = `by ${displayName}`;
const xPosition = width - rightMargin;
ctx.textAlign = 'right';
ctx.fillText(shortAddress, xPosition, height/2);

    const buffer = canvas.toBuffer('image/png');
    res.writeHead(200, headers);
    return res.end(buffer);

  } catch (error) {
    console.error('Error:', error);
    
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create error message with spotlight effect
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width/2, height/2, 0,
      width/2, height/2, Math.min(width, height) * 0.3
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    
    ctx.fillStyle = gradient;
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