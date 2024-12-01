export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Return frame response with a link button
        const frameResponse = {
            frame: {
                version: 'vNext',
                image: 'https://www.expensivemessage.com/api/frame/image/latest',
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
        return res.status(500).json({ error: 'Internal server error' });
    }
}