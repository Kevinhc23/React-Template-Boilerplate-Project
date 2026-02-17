import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { Megaphone, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/shared/services/campaigns";
import { Skeleton } from "@/components/ui/skeleton";
import { type AdGroup } from "@/shared/entities/campaign";
import { SearchFilterBar } from "@/components/widgets/search-and-filters/SearchFilterBar";
import { type FilterGroup } from "@/shared/entities/filters/filter";
import { motion, AnimatePresence } from "motion/react";
import AdGroupCard from "@/components/widgets/cards/adGroupCard";

const FILTER_OPTIONS: FilterGroup[] = [
  {
    id: "status",
    label: "Status",
    type: "single",
    options: [
      { label: "All Status", value: "all" },
      { label: "Draft", value: "draft" },
      { label: "Active", value: "active" },
      { label: "Paused", value: "paused" },
      { label: "Completed", value: "completed" },
    ],
  },
];

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [searchedAdGroups, setSearchedAdGroups] = useState<AdGroup[]>([]);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({
    status: "all",
  });

  const {
    data: campaign,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id!),
    enabled: !!id,
  });

  // Initialize searchedAdGroups when campaign data is loaded
  useEffect(() => {
    if (campaign?.adGroups) {
      setSearchedAdGroups(campaign.adGroups);
    }
  }, [campaign]);

  const searchKeys = (adGroup: AdGroup) => [
    adGroup.name || "",
    adGroup.description || "",
  ];

  const filteredAdGroups = useMemo(() => {
    let result = searchedAdGroups;

    if (filters.status && filters.status !== "all") {
      result = result.filter(
        (ag) =>
          ag.status.toLowerCase() === (filters.status as string).toLowerCase(),
      );
    }

    return result;
  }, [searchedAdGroups, filters]);

  const handleFilterChange = (groupId: string, value: string) => {
    setFilters((prev) => {
      const groupConfig = FILTER_OPTIONS.find((g) => g.id === groupId);
      if (!groupConfig) return prev;

      if (groupConfig.type === "multiple") {
        const current = (prev[groupId] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [groupId]: updated };
      } else {
        return { ...prev, [groupId]: value };
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 px-1 w-full h-full bg-background font-sans overflow-hidden">
      {/* Header profesional */}
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
      <SearchFilterBar
        data={campaign?.adGroups || []}
        searchKeys={searchKeys}
        onResultChange={setSearchedAdGroups}
        placeholder="Search ad groups..."
        filterOptions={FILTER_OPTIONS}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
        disabled={isLoading}
      />
      {/* List of Ad Groups */}
      <div className="flex-1 overflow-y-auto pr-1 pb-4">
        <motion.div layout className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filteredAdGroups.map((adGroup) => (
              <AdGroupCard key={adGroup.id} adGroup={adGroup} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filteredAdGroups.length === 0 && !isLoading && (
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
              <p className="text-sm">
                Try adjusting your search terms or filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CampaignDetailPage;
