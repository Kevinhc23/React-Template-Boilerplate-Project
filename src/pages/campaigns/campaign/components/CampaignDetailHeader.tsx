import { Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Campaign } from "@/shared/entities/campaign";

interface CampaignDetailHeaderProps {
  campaign?: Campaign;
  isLoading: boolean;
  error?: Error | null;
}

export const CampaignDetailHeader = ({
  campaign,
  isLoading,
  error,
}: CampaignDetailHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-none mt-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Megaphone className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {isLoading ? (
              <Skeleton className="w-64 h-6" />
            ) : error ? (
              "Error loading campaign"
            ) : (
              campaign?.name
            )}
          </h1>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {isLoading ? (
            <Skeleton className="w-96 h-4 mt-2" />
          ) : (
            campaign?.description
          )}
        </div>
      </div>

      <Button
        className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg min-h-12 shadow-primary/20 transition-all active:scale-95 px-6 hover:cursor-pointer hover:scale-105"
        size="lg"
        variant="default"
        disabled={isLoading}
      >
        New Ad Group
      </Button>
    </header>
  );
};
