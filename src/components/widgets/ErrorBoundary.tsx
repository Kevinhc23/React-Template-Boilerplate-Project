import type { FC, ReactNode } from "react";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { motion } from "motion/react";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

type AppErrorBoundaryProps = {
  children: ReactNode;
  onReset?: (details: { reason: "imperative-api" | "keys" }) => void;
};

const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="fixed inset-0 z-9998 flex items-center justify-center bg-slate-50/80 backdrop-blur-md p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertCircle size={32} strokeWidth={1.5} />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          We're sorry, something went wrong in this section. You can try
          reloading the component or going back.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <code className="text-[10px] text-slate-400 break-all font-mono">
              {getErrorMessage(error)}
            </code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <button
            type="button"
            onClick={resetErrorBoundary}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/80 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </motion.div>
    </div>
  );
};

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
