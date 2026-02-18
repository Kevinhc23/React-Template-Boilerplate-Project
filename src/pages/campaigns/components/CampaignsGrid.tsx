import { motion, AnimatePresence } from "motion/react";
import CampaignCard from "@/components/widgets/cards/campaignCard";
import { Link } from "react-router";
import { Shimmer } from "shimmer-from-structure";
import type { Campaign } from "@/shared/entities/campaign";
import { SKELETON_CAMPAIGNS } from "./CampaignsConstants";

interface CampaignsGridProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export const CampaignsGrid = ({ campaigns, isLoading }: CampaignsGridProps) => {
  const displayCampaigns = isLoading ? SKELETON_CAMPAIGNS : campaigns;

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {displayCampaigns.map((campaign, index) => (
          <motion.div
            key={isLoading ? `skeleton-${index}` : campaign.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            {isLoading ? (
              <Shimmer loading={true}>
                <CampaignCard campaign={campaign} />
              </Shimmer>
            ) : (
              <Link to={`/campaigns/${campaign.id}`}>
                <CampaignCard campaign={campaign} />
              </Link>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
