import { useState, useEffect } from 'react';
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
import { Loader2, CloudSun, Clock, Server } from 'lucide-react';

// Simulated weather data type
interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  timestamp: string;
}

// network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Weather data fetching (simulated)
async function fetchWeatherData(city: string): Promise<WeatherData> {
  await delay(1500); // delay

  // different weather conditions
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Snow'];
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * 30) - 10; // -10-40°C
  const randomHumidity = Math.floor(Math.random() * 50) + 30; // 30-80%

  return {
    city,
    temperature: randomTemp,
    condition: randomCondition,
    humidity: randomHumidity,
    timestamp: new Date().toISOString(),
  };
}

// Simulated Server Component for demo
function SimulatedServerComponent({ weather }: { weather: WeatherData }) {
  return (
    <Alert className="mt-4 bg-green-50">
      <Server className="h-4 w-4" />
      <AlertDescription>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <CloudSun className="h-5 w-5" />
            <span className="font-medium">{weather.condition}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl">{weather.temperature}°C</span>
            <span className="text-sm text-gray-500">
              Humidity: {weather.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>
              Updated: {new Date(weather.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}

// Server-side Approach Container
function ServerSideApproach({ city }: { city: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWeatherData(city)
      .then(setWeather)
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-green-700">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading weather data...</span>
      </div>
    );
  }

  return weather ? <SimulatedServerComponent weather={weather} /> : null;
}

// Client Component (Traditional Approach)
function ClientSideApproach({ city }: { city: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button onClick={fetchWeather} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Fetching...
          </>
        ) : (
          'Fetch Weather'
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weather && (
        <Alert className="mt-4 bg-blue-50">
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <CloudSun className="h-5 w-5" />
                <span className="font-medium">{weather.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl">
                  {weather.temperature}°C
                </span>
                <span className="text-sm text-gray-500">
                  Humidity: {weather.humidity}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>
                  Updated: {new Date(weather.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

const ServerComponentsDemo = () => {
  const cities = ['Helsinki', 'New York', 'Tokyo', 'Paris', 'Sydney'];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>React Server Components Demo</CardTitle>
          <CardDescription>
            Compare Server Components vs Client Components for data fetching
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Button
                key={city}
                variant={city === selectedCity ? 'default' : 'outline'}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Server Approach Section */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-sm">
                  Server Component Approach
                </CardTitle>
                <CardDescription>
                  Simulated server-side rendering with automatic data fetching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServerSideApproach city={selectedCity} />

                <div className="mt-4 bg-green-100 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {`// Server Component
async function WeatherServerComponent({ city }) {
  // Data is fetched on the server
  const weather = await fetchWeatherData(city);
  
  return (
    <div>
      <h2>{weather.temperature}°C</h2>
      <p>{weather.condition}</p>
    </div>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Client Component Section */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">Client Component</CardTitle>
                <CardDescription>
                  Traditional client-side data fetching with useState and manual
                  handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientSideApproach city={selectedCity} />

                <div className="mt-4 bg-blue-100 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {`// Client Component
function WeatherClientComponent({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchWeather}>
        {loading ? 'Loading...' : 'Fetch Weather'}
      </button>
      {weather && (
        <div>
          <h2>{weather.temperature}°C</h2>
          <p>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 text-sm text-gray-500">
          <div className="space-y-2">
            <p className="font-medium">Key Differences:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                Server Components automatically fetch data without explicit
                loading states
              </li>
              <li>
                No client-side state management needed for Server Components
              </li>
              <li>
                Server Components reduce client-side JavaScript bundle size
              </li>
              <li>Improved initial page load and SEO with Server Components</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServerComponentsDemo;
