/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "file.mir4global.com",
        port: "",
        pathname: "/xdraco-thumb/**",
      },
    ],
  },
};

export default nextConfig;
