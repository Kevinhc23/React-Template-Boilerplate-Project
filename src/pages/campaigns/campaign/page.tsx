import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/shared/services/campaigns";
import { type AdGroup } from "@/shared/entities/campaign";
import { SearchFilterBar } from "@/components/widgets/search-and-filters/SearchFilterBar";
import {
  FILTER_OPTIONS,
  searchKeys,
} from "./components/CampaignDetailConstants";
import { CampaignDetailHeader } from "./components/CampaignDetailHeader";
import { AdGroupsList } from "./components/AdGroupsList";
import { CampaignDetailEmptyState } from "./components/CampaignDetailEmptyState";

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
      <CampaignDetailHeader
        campaign={campaign}
        isLoading={isLoading}
        error={error}
      />

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
        <AdGroupsList adGroups={filteredAdGroups} isLoading={isLoading} />

        <CampaignDetailEmptyState
          isEmpty={filteredAdGroups.length === 0 && !isLoading}
        />
      </div>
    </div>
  );
};

export default CampaignDetailPage;
