// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-cse.canva.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f.hellowork.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.brightcarbon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'forcreators.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'akm-img-a-in.tosshub.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

 
