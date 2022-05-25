import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// =============================================================================
// Constants
// =============================================================================

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      cacheTime: 1000 * 60 * 2, // 2 minutes
      retry: 1,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

// =============================================================================
// Typedefs
// =============================================================================

// =============================================================================
// Main Component
// =============================================================================

const QueryProvider: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default QueryProvider;
