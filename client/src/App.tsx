import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">React 19 Playground</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="https://react.dev/blog/2024/12/05/react-19" className="text-gray-600 hover:text-gray-900 px-3 py-2" target='_blank'>Features</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Explore React 19 Features
          </h2>
          <p className="text-xl text-gray-600">
            Discover the latest improvements and additions in React 19
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>use() Hook Example</CardTitle>
              <CardDescription>
                Learn how `use` simplifies promise handling compared to traditional approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                The use Hook enables seamless integration of promises and other resources directly in your components,
                making async data handling more intuitive.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View Example <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Placeholder cards for other features */}
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>More React 19 features will be added here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Stay tuned for more examples and demonstrations
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;