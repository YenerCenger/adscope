import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'TrendCatcher AI — Rakiplerinizin Viral Sırlarını Keşfedin',
    description: 'Yapay zeka destekli trend analiz platformu. Viral videoları analiz edin, script üretin.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" className="dark">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} ${inter.className} min-h-screen text-white antialiased`}>
                {/* Fixed background — GPU-composited, never repaints on scroll */}
                <div className="bg-scene" aria-hidden="true" />
                <ToastProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </ToastProvider>
            </body>
        </html>
    );
}
