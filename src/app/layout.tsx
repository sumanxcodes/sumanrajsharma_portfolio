import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Suman Raj Sharma - Portfolio',
  description: 'Personal portfolio showcasing projects, experience, and blog posts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}