/** @type {import('next').NextConfig} */

const ContentSecPolicy = `default-src 'self' ka-f.fontawesome.com localhost:4000 web-cursos.azurewebsites.net webcursos.blob.core.windows.net; script-src 'self' 'unsafe-eval' kit.fontawesome.com; style-src 'self' 'unsafe-inline' *.fontawesome.com fonts.cdnfonts.com; font-src 'self' fonts.cdnfonts.com ka-f.fontawesome.com; img-src 'self' data:`
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["webcursos.blob.core.windows.net"],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecPolicy,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
