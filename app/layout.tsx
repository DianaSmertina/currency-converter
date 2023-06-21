import { Inter } from 'next/font/google';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Providers } from '@/redux/providers';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Currency Converter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
