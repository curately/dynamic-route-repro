/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'react-feather',
      '@mapbox/geo-viewport',
      '@mapbox/geojson-extent',
      '@nextui-org/react',
      'mapbox-gl',
      'swiper',
      'react-aria',
      'react-map-gl',
      'downshift',
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config) {
    config.experiments = { topLevelAwait: true, webpackBuildWorker: true }
    return config
  },
  reactStrictMode: true,
  swcMinify: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thefamilyhotelguide.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.trvl-media.com',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /swiper\.esm\.js/,
      sideEffects: false,
    })

    return config
  },
}

//module.exports = nextConfig

// Injected content via Sentry wizard below

//const { withSentryConfig } = require('@sentry/nextjs')
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy({})(withBundleAnalyzer(nextConfig))
