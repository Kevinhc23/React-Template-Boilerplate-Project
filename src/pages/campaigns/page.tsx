import { useState, useMemo } from "react";
import { SearchFilterBar } from "@/components/widgets/search-and-filters/SearchFilterBar";
import type { Campaign } from "@/shared/entities/campaign";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/mock/campaign-mock";
import { CampaignsHeader } from "./components/CampaignsHeader";
import { CampaignsGrid } from "./components/CampaignsGrid";
import { CampaignsEmptyState } from "./components/CampaignsEmptyState";
import { searchKeys, FILTER_OPTIONS } from "./components/CampaignsConstants";

const CampaignsPage = () => {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });

  const [searchedCampaigns, setSearchedCampaigns] = useState<Campaign[]>(
    campaigns || [],
  );
  const [filters, setFilters] = useState<Record<string, string | string[]>>({
    status: "all",
    priority: [],
  });

  const filteredCampaigns = useMemo(() => {
    let result = searchedCampaigns;

    // Filter by Status
    if (filters.status && filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    // Filter by Priority
    const priorityFilter = filters.priority as string[];
    if (priorityFilter && priorityFilter.length > 0) {
      result = result.filter((p) => priorityFilter.includes(p.priority));
    }

    return result;
  }, [searchedCampaigns, filters]);

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
      <CampaignsHeader />

      {/* Search & Filter Bar */}
      <SearchFilterBar
        data={campaigns || []}
        searchKeys={searchKeys}
        onResultChange={setSearchedCampaigns}
        placeholder="Search campaigns..."
        filterOptions={FILTER_OPTIONS}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-4">
        {/* Grid de Resultados */}
        <CampaignsGrid campaigns={filteredCampaigns} isLoading={isLoading} />

        {/* Empty State */}
        <CampaignsEmptyState
          isEmpty={filteredCampaigns.length === 0 && !isLoading}
        />
      </div>
    </div>
  );
};

export default CampaignsPage;
