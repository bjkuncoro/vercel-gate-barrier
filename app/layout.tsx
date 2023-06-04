import './globals.css';

// import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './navbar';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        {/* <AuthProvider> */}
          {/* <Suspense fallback={<p>loading. . .</p>}>
            <Navbar />
          </Suspense> */}
          {children}
        {/* </AuthProvider> */}
        {/* {children} */}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
