// pages/api/frame/image/index.js

import { ImageResponse } from '@vercel/og';

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

  // Handle CORS preflight requests
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
    const { searchParams } = new URL(req.url);
    const message = searchParams.get('message') || 'No message';
    const messenger = searchParams.get('messenger') || 'Unknown';
    const price = searchParams.get('price') || '0';

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
            Price: {price} ETH
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? ALLOWED_ORIGIN : '',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'cache-control': 'no-cache, no-store',
          'content-type': 'image/png',
        },
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
      }
    });
  }
}