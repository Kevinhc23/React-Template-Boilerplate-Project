import { Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CampaignsHeader = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-none">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Megaphone className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Campaigns
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          Manage your campaigns, ad groups and ads in real-time.
        </p>
      </div>

      <Button
        className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg min-h-12 shadow-primary/20 transition-all active:scale-95 px-6 hover:cursor-pointer hover:scale-105"
        size="lg"
        variant="default"
      >
        New Campaign
      </Button>
    </header>
  );
};
