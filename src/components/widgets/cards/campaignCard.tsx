import { type FC, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Priority, Status, Campaign } from "@/shared/entities/campaign";

const stylesPriority = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-emerald-100 text-emerald-600",
} satisfies Record<Priority, string>;

const stylesStatus: Record<Status, string> = {
  draft: "bg-gray-100 text-gray-600",
  active: "bg-emerald-100 text-emerald-600",
  paused: "bg-orange-100 text-orange-600",
  completed: "bg-blue-100 text-blue-600",
};

const CampaignCard: FC<{ campaign: Campaign }> = memo(
  ({ campaign }) => {
    return (
      <motion.div
        key={campaign.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="group p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col gap-4 h-[200px] cursor-pointer ease-in-out duration-200"
      >
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {campaign.date}
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-sm text-[10px] font-bold uppercase",
              stylesPriority[campaign.priority],
            )}
          >
            {campaign.priority}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {campaign.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-border/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              {campaign.adGroups?.length || 0} Ad Groups
            </span>
            {/* Members overlap removed as it might not be primary for campaigns, but keeping if needed */}
            <div className="flex -space-x-2">
              {campaign.members?.slice(0, 3).map((member, i) => (
                <img
                  key={i}
                  src={member.avatar}
                  alt={member.name}
                  className="size-6 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
          </div>
          <span
            className={cn(
              "text-[11px] font-bold px-3 py-1 rounded-sm uppercase",
              stylesStatus[campaign.status],
            )}
          >
            {campaign.status}
          </span>
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.campaign.id === nextProps.campaign.id;
  },
);

export default CampaignCard;
