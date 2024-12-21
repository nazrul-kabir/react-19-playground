import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UseHookDemo from './features/use-hooks/UseHooksDemo';
import Layout from './components/Layout';
import UseOptimisticDemo from './features/use-optimistic/UseOptimisticDemo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="features">
            <Route path="use-hook" element={<UseHookDemo />} />
            <Route path="use-optimistic" element={<UseOptimisticDemo />} />
          </Route>
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
