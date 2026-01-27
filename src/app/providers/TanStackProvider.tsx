import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
    mutations: {
      gcTime: 60 * 1000,
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
