import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TaskFlow Dashboard',
  description: 'A beautiful and colorful task management dashboard built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} TaskFlow Dashboard. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}