import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: '个人财务分析工具 | 专业理财建议助手',
    template: '%s | 个人财务分析工具'
  },
  description: '专业的个人财务健康评估和理财建议工具，支持中英文双语。智能分析您的资产负债、储蓄率、投资数据，提供个性化财务建议和风险评估。',
  keywords: [
    '个人理财',
    '财务分析',
    '财务健康评估',
    '投资建议',
    '储蓄率计算',
    '资产配置',
    '债务管理',
    '理财工具',
    '财务规划',
    'personal finance',
    'financial analysis',
    'investment advice',
    'financial health'
  ],
  authors: [{ name: '个人财务分析工具团队' }],
  creator: '个人财务分析工具',
  publisher: '个人财务分析工具',
  category: 'finance',
  classification: 'Finance & Business',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: 'https://personal-finance-analyzer.com',
    siteName: '个人财务分析工具',
    title: '个人财务分析工具 | 专业理财建议助手',
    description: '专业的个人财务健康评估和理财建议工具，支持中英文双语。智能分析您的资产负债、储蓄率、投资数据。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '个人财务分析工具 - 专业理财建议助手',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '个人财务分析工具 | 专业理财建议助手',
    description: '专业的个人财务健康评估和理财建议工具，支持中英文双语。',
    images: ['/twitter-image.png'],
    creator: '@personal_finance_tool',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
        color: '#3B82F6',
      },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    languages: {
      'zh-CN': '/',
      'en-US': '/en',
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
    // yandex: 'yandex-verification-code-here',
    // yahoo: 'yahoo-verification-code-here',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': '财务助手',
    'application-name': '个人财务分析工具',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E40AF' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 额外的 SEO 和性能优化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '个人财务分析工具',
              description: '专业的个人财务健康评估和理财建议工具',
              url: 'https://personal-finance-analyzer.com',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'CNY'
              },
              featureList: [
                '财务健康评估',
                '投资建议分析',
                '风险因素识别',
                '多语言支持'
              ],
              author: {
                '@type': 'Organization',
                name: '个人财务分析工具团队'
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
