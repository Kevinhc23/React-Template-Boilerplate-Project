import { type FC, memo } from "react";
import { motion } from "motion/react";
import { MoreVertical, ArrowRight, Layers, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdGroup, Status } from "@/shared/entities/campaign";

const StatusBadge = ({ status }: { status: Status }) => {
  const styles: Record<Status, string> = {
    draft: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
    active:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    paused:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    completed:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  };

  const labels: Record<Status, string> = {
    draft: "Draft",
    active: "Active",
    paused: "Paused",
    completed: "Completed",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5",
        styles[status],
      )}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {labels[status]}
    </span>
  );
};

const AdGroupCard: FC<{ adGroup: AdGroup }> = memo(
  ({ adGroup }) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ scale: 1.005, backgroundColor: "var(--accent)" }}
        className="group relative bg-card border border-border/60 hover:border-primary/30 p-4 sm:p-5 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between overflow-hidden"
      >
        {/* Decorative left border on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Main Content */}
        <div className="flex items-start gap-4 flex-1 w-full">
          {/* Ad Group Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Layers className="size-5 sm:size-6" />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {adGroup.name}
              </h3>
              <StatusBadge status={adGroup.status} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {adGroup.description}
            </p>

            {/* Metadata for mobile */}
            <div className="flex sm:hidden items-center gap-3 mt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CircleDot className="w-3 h-3" /> {adGroup.ads?.length || 0} Ads
              </span>
            </div>
          </div>
        </div>

        {/* Metadata & Actions (Desktop) */}
        <div className="hidden sm:flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg border border-border/40">
            <CircleDot className="w-3.5 h-3.5 text-primary/60" />
            <span>{adGroup.ads?.length || 0} Ads</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              // Action menu logic here
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
          <ArrowRight className="w-5 h-5 text-primary translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.adGroup.id === nextProps.adGroup.id &&
      prevProps.adGroup.status === nextProps.adGroup.status &&
      prevProps.adGroup.ads?.length === nextProps.adGroup.ads?.length
    );
  },
);

export default AdGroupCard;
