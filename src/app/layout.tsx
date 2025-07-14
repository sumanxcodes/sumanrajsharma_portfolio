import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Suman Raj Sharma - Portfolio',
  description: 'Personal portfolio showcasing projects, experience, and blog posts',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FEF7FF' },
    { media: '(prefers-color-scheme: dark)', color: '#141218' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}