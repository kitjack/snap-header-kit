
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            wpress<span className="text-primary">.</span>ai
          </Link>
        </div>
        
        {isMobile ? (
          <>
            <button 
              onClick={toggleMobileMenu} 
              className="p-2 text-gray-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4 border-t border-gray-100 mt-1">
                <div className="flex flex-col space-y-3">
                  {user ? (
                    <>
                      <div className="text-sm font-medium px-3 py-1 bg-secondary/10 text-secondary rounded-md self-start">
                        Credits: {profile?.credits || 0}
                      </div>
                      <Button asChild variant="ghost" className="bg-secondary hover:bg-secondary/90 text-white rounded-md px-6 w-full">
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 w-full"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="bg-secondary hover:bg-secondary/90 text-white rounded-md px-6 w-full">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild variant="ghost" className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 w-full">
                        <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-sm font-medium px-3 py-1 bg-secondary/10 text-secondary rounded-md">
                  Credits: {profile?.credits || 0}
                </div>
                <Button asChild variant="ghost" className="bg-secondary hover:bg-secondary/90 text-white rounded-md px-6">
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-md px-6"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="bg-secondary hover:bg-secondary/90 text-white rounded-md px-6">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="ghost" className="bg-primary hover:bg-primary/90 text-white rounded-md px-6">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
