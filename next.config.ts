import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			new URL('https://cs3.wettercomassets.com/images/interview/hafen.jpg'),
		],
	},
}

export default nextConfig
