/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: false,
    allowMiddlewareResponseBody: true,
  },
  images: {
    domains: ['gateway.pinata.cloud'],
  },
  async rewrites() {
    return [
      {
        source: '/api/frame/image/latest',
        destination: '/api/frame/image/latest'
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  }
}

module.exports = withPlausibleProxy()(
  nextConfig
)