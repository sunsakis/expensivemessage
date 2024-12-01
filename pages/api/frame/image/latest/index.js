import { ImageResponse } from '@vercel/og';
import { ethers } from 'ethers';
import ABI from '../../../../../contract/ABI.js';

export const config = {
  runtime: 'edge',
  api: {
    responseLimit: false,
  },
};

const ALLOWED_ORIGIN = 'https://www.expensivemessage.com';

export default async function handler(req) {
  const origin = req.headers.get('origin');
  const isAllowedOrigin = origin === ALLOWED_ORIGIN;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? ALLOWED_ORIGIN : '',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  try {
    // Provider for Base network
    const baseProvider = new ethers.providers.JsonRpcProvider(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 
      ABI, 
      baseProvider
    );

    // Provider for Ethereum mainnet (for ENS)
    const mainnetProvider = new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`
    );

    // Get latest message data
    const newMessageCall = await contract.readMessage();
    const message = newMessageCall[0].toString();
    const counter = newMessageCall[1].toNumber();
    
    // Get price
    const price = await contract.getPrice();
    const formatPrice = parseFloat(ethers.utils.formatEther(price)).toString();

    // Get messenger and resolve ENS
    let messenger = await contract.getMessengers(counter - 1);
    try {
      const ensName = await mainnetProvider.lookupAddress(messenger);
      if (ensName) {
        messenger = ensName;
      }
    } catch (ensError) {
      console.error("Error resolving ENS:", ensError);
    }

    // Success response headers with caching
    const headers = {
      'Access-Control-Allow-Origin': isAllowedOrigin ? ALLOWED_ORIGIN : '',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'content-type': 'image/png',
      'Cache-Control': 'public, immutable, no-transform, max-age=30'
    };

    return new ImageResponse(
      (
        <div
          style={{
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: '40px'
          }}
        >
          <div style={{ fontSize: 60, textAlign: 'center', wordBreak: 'break-word' }}>
            {message}
          </div>
          <div style={{ fontSize: 30, marginTop: 20 }}>
            Posted by: {messenger}
          </div>
          <div style={{ fontSize: 24, marginTop: 40 }}>
            Price: {formatPrice} ETH
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers,
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? ALLOWED_ORIGIN : '',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store, max-age=0'  // Don't cache errors
      }
    });
  }
}