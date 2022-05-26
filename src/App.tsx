import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Issue from './pages/Issue';
import AddIssue from './pages/AddIssue';

import Layout from './components/Layout';

// =============================================================================
// Constants
// =============================================================================

const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/add', element: <AddIssue /> },
  { path: '/issue/:number', element: <Issue /> },
];

// =============================================================================
// Main Component
// =============================================================================

const App = () => (
  <Layout>
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Layout>
);

export default App;
