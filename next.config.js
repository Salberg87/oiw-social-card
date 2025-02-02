/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lohpyvtniqesxzjxhvby.supabase.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig 