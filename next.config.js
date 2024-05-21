/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tse1-mm.cn.bing.net"
            },
            {
                protocol: "https",
                hostname: "tse3-mm.cn.bing.net"
            }
        ]
    }
}

module.exports = nextConfig
