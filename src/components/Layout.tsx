
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Header />
        </div>
      </div>
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
