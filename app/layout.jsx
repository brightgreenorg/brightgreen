// app/layout.jsx
import '../styles/globals.css';
import { League_Spartan, Roboto } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipNav from '../components/SkipNav';

// Fonts
const league = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://brightgreen.org'),
  title: { default: 'Bright Green PAC', template: '%s · Bright Green PAC' },
  description:
    'Bright Green is a people‑powered political action committee from Portland, Oregon USA focused on innovation, fairness, and sustainability.',
  // Best‑practice favicon set
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-64.png', type: 'image/png', sizes: '64x64' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Bright Green PAC',
    url: 'https://brightgreen.org',
    title: 'Bright Green PAC',
    description: 'Energy, optimism, and clarity for a people‑powered PAC. Join us.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Green PAC',
    description: 'Energy, optimism, and clarity for a people‑powered PAC. Join us.',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#111213' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${league.variable} ${roboto.className}`}
      suppressHydrationWarning
    >
      <body>
        <SkipNav />
        <Header />
        {/* Use page-level <div className="container"> when you want constrained width */}
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
