/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: false,
  }
}
module.exports = withPlausibleProxy()({
  nextConfig
})
