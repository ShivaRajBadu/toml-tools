import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TOML Tools',
  description: 'Free online TOML tools including editor, validator, converter, and examples.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'TOML Editor with syntax highlighting',
    'Real-time TOML validation',
    'Convert TOML to multiple formats',
    'Compare TOML files',
    'TOML configuration examples and templates'
  ]
}

export const metadata: Metadata = {
  title: {
    default: 'TOML Tools - Online TOML Editor, Validator & Converter',
    template: '%s | TOML Tools'
  },
  description: 'Free online TOML tools including editor, validator, converter, and examples. Parse, validate, and convert TOML to JSON, YAML, XML, and more Also convert JSON to TOML.',
  keywords: 'TOML, TOML Editor, TOML Validator, TOML Converter, TOML to JSON, TOML to YAML, TOML to XML, JSON to TOML, TOML examples, TOML configuration, TOML parser, online tools, TOML server config, TOML Database config, TOML App config, TOML deployment config',
  authors: [{ name: 'TOML Tools' }],
  alternates: {
    canonical: 'https://toml-tools.com'
  },
  openGraph: {
    title: 'TOML Tools - Online TOML Editor, Validator & Converter',
    description: 'Free online TOML tools including editor, validator, converter, and examples. Parse, validate, and convert TOML to JSON, YAML, XML, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://toml-tools.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOML Tools - Online TOML Editor, Validator & Converter',
    description: 'Free online TOML tools including editor, validator, converter, and examples. Parse, validate, and convert TOML to JSON, YAML, XML, and more.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
