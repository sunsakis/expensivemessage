import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const message = searchParams.get('message')
    const messenger = searchParams.get('messenger')
    const price = searchParams.get('price')

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
          }}
        >
          <div style={{ fontSize: 60, textAlign: 'center' }}>
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
      }
    )
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}