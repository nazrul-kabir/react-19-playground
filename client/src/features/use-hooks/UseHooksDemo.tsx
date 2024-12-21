import { use, useState, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Fetch from JSONPlaceholder API with error simulation
const fetchUser = async (
  id: number,
  shouldFail: boolean = false
): Promise<User> => {
  if (shouldFail) {
    throw new Error('Simulated fetch error');
  }

  if (id > 10) {
    throw new Error('User not found');
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch user (Status: ${response.status})`);
  }
  return response.json();
};

// Separate component for displaying user data using use() hook
const UserDataDisplay = ({ userPromise }: { userPromise: Promise<User> }) => {
  const user = use(userPromise);
  return (
    <Alert className="mt-4">
      <AlertDescription>
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </AlertDescription>
    </Alert>
  );
};

// Error Boundary Component
const ErrorDisplay = ({ error }: { error: Error }) => (
  <Alert variant="destructive" className="mt-4">
    <AlertDescription>Error: {error.message}</AlertDescription>
  </Alert>
);

const UseHookDemo = () => {
  const [userId, setUserId] = useState<number>(1);
  const [userPromise, setUserPromise] = useState<Promise<User> | null>(null);
  const [shouldFail, setShouldFail] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startFetch = () => {
    setError(null);
    const promise = fetchUser(userId, shouldFail).catch((err) => {
      setError(err);
      throw err;
    });
    setUserPromise(promise);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>use() Hook Demo</CardTitle>
          <CardDescription>
            See how the use Hook simplifies promise handling in React 19
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button onClick={startFetch} disabled={!!userPromise && !error}>
              Fetch User Data
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setUserPromise(null);
                setError(null);
                setUserId((prev) => (prev % 10) + 1);
              }}
            >
              Reset
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="error-mode"
                checked={shouldFail}
                onCheckedChange={setShouldFail}
              />
              <Label htmlFor="error-mode">Simulate Error</Label>
            </div>
          </div>

          {/* Status Display */}
          {shouldFail && (
            <Alert variant="warning" className="bg-yellow-50 text-yellow-800">
              <AlertDescription>
                Error simulation is enabled. The next fetch will fail.
              </AlertDescription>
            </Alert>
          )}

          {/* Result Display */}
          {userPromise && !error && (
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8 space-x-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <div className="text-blue-700">
                      <span className="font-medium">
                        Loading user {userId}...
                      </span>
                      <p className="text-sm text-blue-600">
                        Fetching data from JSONPlaceholder API
                      </p>
                    </div>
                  </div>
                </div>
              }
            >
              <UserDataDisplay userPromise={userPromise} />
            </Suspense>
          )}
          {error && <ErrorDisplay error={error} />}

          {/* Comparison Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* Traditional approach */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-sm">Traditional Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {`const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/users/\${id}\`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [id]);`}
                </pre>
              </CardContent>
            </Card>

            {/* New approach with use() */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">
                  New use() Hook Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-blue-100 p-4 rounded text-sm overflow-x-auto">
                  {`// Component using use() Hook
const UserDataDisplay = ({ userPromise }) => {
  const user = use(userPromise);
  return <div>{JSON.stringify(user)}</div>;
};

// Usage
const promise = fetchUser(id).catch(err => {
  setError(err);
  throw err;
});

<Suspense fallback={<Loading />}>
  <UserDataDisplay userPromise={promise} />
</Suspense>`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        <CardFooter className="text-sm text-gray-500">
          <p>
            Note: The use Hook works with Suspense to handle async operations.
            Errors are caught outside the component and handled separately.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UseHookDemo;
