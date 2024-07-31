export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { msg } = req.body;
    msg = "ALERT!\n\nSomeone has just claimed the MXM. Here's their message:\n\n" + msg;

    try {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const channelID = "@MostXMessage";
        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${channelID}&text=${encodeURIComponent(msg)}`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          throw new Error('Failed to send message');
        }
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}