/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/machine-learning-feature-extraction",
        destination: "https://backenddeveloper.tistory.com/183",
        permanent: true,
      },
    ];
  },
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
