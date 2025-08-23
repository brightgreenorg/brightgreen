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
  applicationName: 'Bright Green PAC',
  title: {
    default: 'Bright Green PAC',
    template: '%s · Bright Green PAC',
  },
  description:
    'Bright Green is a people-powered political action committee from Portland, Oregon USA focused on innovation, preservation, and fairness.',
  keywords: [
    'Bright Green PAC',
    'Oregon politics',
    'clean energy',
    'fair elections',
    'climate resilience',
    'Portland Oregon',
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://brightgreen.org',
    siteName: 'Bright Green PAC',
    title: 'Bright Green PAC',
    description:
      'People-powered action from Portland, Oregon USA—focused on innovation, preservation, and fairness.',
    images: [
      // Swap in a JPG/PNG if you add one later
      { url: '/images/brand/bright-green-fullcolor.svg', width: 1200, height: 630, alt: 'Bright Green' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Green PAC',
    description:
      'People-powered action from Portland, Oregon USA—focused on innovation, preservation, and fairness.',
    images: ['/images/brand/bright-green-fullcolor.svg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  category: 'politics',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8E44AD', // brand violet
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${league.variable}`}>
      <body className={roboto.className}>
        <SkipNav />
        <Header />
        <main id="main" className="container" style={{ paddingBlock: '24px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
