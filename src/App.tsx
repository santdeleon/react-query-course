import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Home from './pages/Home';
import Issue from './pages/Issue';
import AddIssue from './pages/AddIssue';

import Layout from './components/Layout';
import Column from './components/Column';

// =============================================================================
// Constants
// =============================================================================

const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/add', element: <AddIssue /> },
  {
    path: '/issue/:number',
    // TODO: MAKE FALLBACK BETTER?
    element: (
      <ErrorBoundary
        fallback={
          <Column justify="center" padding="20px">
            <h2 style={{ margin: '0 0 5px 0' }}>There was an issue fetching this uh... issue</h2>
            <p style={{ color: '#777777', margin: 0 }}>It probably doesn't exist anymore...</p>
          </Column>
        }
      >
        <Issue />
      </ErrorBoundary>
    ),
  },
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
