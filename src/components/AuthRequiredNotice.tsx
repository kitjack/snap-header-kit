
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AuthRequiredNotice = () => {
  return (
    <div className="space-y-2">
      <Alert variant="destructive" className="py-2 border-2 border-[#ea384c]">
        <AlertDescription className="text-sm font-medium">
          You must be logged in to generate contents
        </AlertDescription>
      </Alert>
      <div className="flex space-x-2">
        <Button asChild variant="outline" size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="bg-primary hover:bg-primary/90 text-white">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthRequiredNotice;
