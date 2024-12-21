import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Layout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                React 19 Playground
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    isActive('/')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  Home
                </Link>
                <Link
                  to="/features/use-hook"
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    isActive('/features/use-hook')
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  use() Hook Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            React 19 Features Playground - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
