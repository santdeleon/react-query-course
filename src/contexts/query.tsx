import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const QueryProvider = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;
