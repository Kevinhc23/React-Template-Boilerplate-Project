import type { FC } from "react";
import { Shell } from "lucide-react";
import { createPortal } from "react-dom";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import { motion, AnimatePresence } from "motion/react";

const LoadingOverlay: FC = () => {
  const { isVisible, message } = useLoadingStore();

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/25 backdrop-blur-xs"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col items-center gap-6 p-12 rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-50 w-1/4"
          >
            <div className="relative flex items-center justify-center">
              <div className="relative flex items-center justify-center bg-background p-5 rounded-full border border-background shadow-inner">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <Shell className="h-10 w-10 text-primary" strokeWidth={1.2} />
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-slate-800 tracking-tight"
              >
                {message}
              </motion.p>

              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.15,
                    }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default LoadingOverlay;
