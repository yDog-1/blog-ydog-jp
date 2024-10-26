/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.microcms-assets.io",
				port: "",
				pathname: "/assets/78e4da89fd5b4ae1a8d1a56151a2875e/**/**",
			},
		],
	},
};

module.exports = nextConfig;
