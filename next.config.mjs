/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder stock images. These should be replaced with real screenshots
    // in /public/images — once they all are, this block can be deleted.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
