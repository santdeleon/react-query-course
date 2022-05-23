import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;