import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * The query client for the application.
 * It is used to query data from the API.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute where data is considered fresh
      gcTime: 60 * 1000, // 1 minute where data is garbage collected
      refetchOnMount: false, // Don't refetch when component mounts
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchInterval: false, // Don't refetch at an interval
    },
    mutations: {
      gcTime: 60 * 1000, // 1 minute where data is garbage collected
    },
  },
});

/**
 * The TanStack Query provider component.
 * It provides the query client to the application.
 */
export const TanStackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
