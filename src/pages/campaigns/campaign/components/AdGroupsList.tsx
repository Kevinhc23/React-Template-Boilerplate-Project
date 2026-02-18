import { motion, AnimatePresence } from "motion/react";
import AdGroupCard from "@/components/widgets/cards/adGroupCard";
import { Shimmer } from "shimmer-from-structure";
import type { AdGroup } from "@/shared/entities/campaign";
import { SKELETON_AD_GROUPS } from "./CampaignDetailConstants";

interface AdGroupsListProps {
  adGroups: AdGroup[];
  isLoading: boolean;
}

export const AdGroupsList = ({ adGroups, isLoading }: AdGroupsListProps) => {
  const displayAdGroups = isLoading ? SKELETON_AD_GROUPS : adGroups;

  return (
    <motion.div layout className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {displayAdGroups.map((adGroup, index) => (
          <motion.div
            key={isLoading ? `skeleton-${index}` : adGroup.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            {isLoading ? (
              <Shimmer loading={true}>
                <AdGroupCard adGroup={adGroup} />
              </Shimmer>
            ) : (
              <AdGroupCard adGroup={adGroup} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
