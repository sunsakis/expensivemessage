export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      // Handle the frame action here
      // Return a new frame response
      return res.status(200).json({
        frames: {
          version: 'vNext',
          image: 'https://expensivemessage.com/api/frame/image/latest',
          buttons: [
            {
              label: 'View Top $DEGEN',
            }
          ],
        }
      });
    } catch (error) {
      console.error('Error handling frame action:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }