
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="py-4 px-6 flex justify-between items-center border-b border-gray-100">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          wpress<span className="text-primary">.</span>ai
        </Link>
      </div>
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
    </header>
  );
};

export default Header;
