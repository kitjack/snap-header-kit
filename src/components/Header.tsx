
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center border-b border-gray-100">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          wpress<span className="text-teal-500">.ai</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" className="bg-orange-400 hover:bg-orange-500 text-white rounded-md px-6">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="ghost" className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-6">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
