import type { FC, ReactNode } from "react";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";

type AppErrorBoundaryProps = {
  children: ReactNode;
  onReset?: (details: { reason: "imperative-api" | "keys" }) => void;
};

const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert" aria-live="assertive">
    <p>Something went wrong:</p>
    <pre style={{ color: "red" }}>{getErrorMessage(error)}</pre>
    <button type="button" onClick={resetErrorBoundary}>
      Retry
    </button>
  </div>
);

const AppErrorBoundary: FC<AppErrorBoundaryProps> = ({ children, onReset }) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => <Fallback {...props} />}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
