/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lohpyvtniqesxzjxhvby.supabase.co'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lohpyvtniqesxzjxhvby.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
};

module.exports = nextConfig; 