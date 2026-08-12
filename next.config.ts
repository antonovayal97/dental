import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

function siteHostname(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) return null
  try {
    return new URL(siteUrl).hostname
  } catch {
    return null
  }
}

const hostname = siteHostname()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      ...(hostname
        ? ([
            {
              protocol: 'https' as const,
              hostname,
              pathname: '/api/media/file/**',
            },
            {
              protocol: 'http' as const,
              hostname,
              pathname: '/api/media/file/**',
            },
          ] as const)
        : []),
    ],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
