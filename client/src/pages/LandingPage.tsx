import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Sparkles, Zap } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  isComingSoon?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  link,
  isComingSoon,
}) => (
  <Card
    className={`hover:shadow-lg transition-shadow ${isComingSoon ? 'opacity-50' : ''}`}
  >
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-sm text-gray-600">
        {isComingSoon
          ? 'Coming soon - Stay tuned for this exciting feature!'
          : 'Explore this feature with interactive examples and detailed explanations.'}
      </div>
    </CardContent>
    <CardFooter>
      {!isComingSoon && (
        <Link to={link} className="w-full">
          <Button className="w-full">
            Explore <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </CardFooter>
  </Card>
);

const LandingPage = () => {
  const features: FeatureCardProps[] = [
    {
      title: 'use() Hook',
      description: 'Simplify promise handling with the new use Hook',
      icon: <Upload className="h-6 w-6 text-blue-500" />,
      link: '/features/use-hook',
    },
    {
      title: 'useOptimistic',
      description: 'Implement optimistic updates for better UX',
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      link: '/features/use-optimistic',
    },
    {
      title: 'Document Model',
      description: 'Explore the new React 19 document model',
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      link: '/features/document-model',
      isComingSoon: true,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-900">
          React 19 Features Playground
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore and learn about the latest features in React 19 through
          interactive examples and comprehensive demonstrations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      {/* Getting Started Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-6">
          Begin your journey with React 19 by exploring our interactive demos
          and examples.
        </p>
        <Link to="/features/use-hook">
          <Button size="lg">
            Start with use() Hook <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
