// REPLACE FILE: app/layout.jsx
import '../styles/globals.css';
import { League_Spartan, Roboto } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipNav from '../components/SkipNav';
import { SITE_URL } from '../lib/config';

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
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Bright Green PAC', template: '%s · Bright Green PAC' },
  description:
    'Bright Green is a people-powered political action committee from Portland, Oregon USA focused on innovation, fairness, and sustainability.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Bright Green PAC',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${league.variable} ${roboto.variable}`}>
      <body>
        <SkipNav />
        <Header />
        {/* Align with SkipNav target */}
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
