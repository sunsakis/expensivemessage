import { Message } from '@farcaster/core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate the Farcaster frame signature
    const { untrustedData, trustedData } = req.body;
    
    // Generate the next frame
    const frameResponse = {
      frames: {
        version: 'vNext',
        image: getImgURLFromHash(imgHash),
        buttons: [
          {
            label: 'View Message',
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