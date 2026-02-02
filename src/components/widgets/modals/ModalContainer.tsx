import type { FC } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/app/store/useModalStore";
import { motion, AnimatePresence } from "motion/react";

const ModalContainer: FC = () => {
  const { isOpen, view: ModalView, data, closeModal } = useModalStore();

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && ModalView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/25 backdrop-blur-xs"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0" onClick={closeModal} />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-50 overflow-hidden"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors duration-200 z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-4 text-slate-600" />
            </button>

            <ModalView {...data} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalContainer;
