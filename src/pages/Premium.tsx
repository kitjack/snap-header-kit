
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Premium = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Get More Credits</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Basic</CardTitle>
              <CardDescription>For casual users</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-4xl font-bold mb-2">$5</div>
              <p className="text-muted-foreground mb-4">100 Credits</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-emerald-500" />
                  <span>Generate 10 business names</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Purchase</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-b from-amber-50 to-transparent border-t-4 border-t-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Standard</CardTitle>
              <CardDescription>Most popular</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-4xl font-bold mb-2">$20</div>
              <p className="text-muted-foreground mb-4">500 Credits</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-emerald-500" />
                  <span>Generate 50 business names</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-500 hover:bg-amber-600">Purchase</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Premium</CardTitle>
              <CardDescription>For power users</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-4xl font-bold mb-2">$50</div>
              <p className="text-muted-foreground mb-4">1500 Credits</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-emerald-500" />
                  <span>Generate 150 business names</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Purchase</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need more credits? Contact us for custom plans.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Premium;
