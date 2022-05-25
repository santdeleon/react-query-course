import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// =============================================================================
// Constants
// =============================================================================

const client = new QueryClient();

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
