
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center flex-grow py-12">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center flex-grow py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Your Profile</CardTitle>
            <CardDescription className="text-center">
              Your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email:</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Credits:</p>
              <p className="text-lg">{profile?.credits || 0}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Account Created:</p>
              <p className="text-lg">{new Date(profile?.created_at || '').toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
