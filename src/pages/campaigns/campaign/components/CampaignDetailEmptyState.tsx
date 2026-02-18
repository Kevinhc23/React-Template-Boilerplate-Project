import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";

interface CampaignDetailEmptyStateProps {
  isEmpty: boolean;
}

export const CampaignDetailEmptyState = ({
  isEmpty,
}: CampaignDetailEmptyStateProps) => {
  return (
    <AnimatePresence>
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3 h-full"
        >
          <div className="p-4 bg-muted/30 rounded-full">
            <Search className="size-10 opacity-20" />
          </div>
          <p className="text-lg font-semibold text-foreground">
            No campaigns found
          </p>
          <p className="text-sm">Try adjusting your search terms or filters.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
