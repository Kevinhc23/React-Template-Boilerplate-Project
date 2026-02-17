import { useState, useMemo } from "react";
import { Search, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import CampaignCard from "@/components/widgets/cards/campaignCard";
import { Link } from "react-router";
import type { Campaign } from "@/shared/entities/campaign";
import { SearchFilterBar } from "@/components/widgets/search-and-filters/SearchFilterBar";
import type { FilterGroup } from "@/shared/entities/filters/filter";

// --- Constants ---
const searchKeys = (campaign: Campaign) => [
  campaign.name,
  campaign.description,
];

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
  {
    id: "priority",
    label: "Priority",
    type: "multiple",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
    ],
  },
];

// --- Mock Data ---
const Campaigns: Campaign[] = [
  {
    id: "d1366ad3-c866-48bd-94d0-4ef288da65d4",
    name: "Summer Sale 2025",
    description:
      "Main summer promotional campaign targeting youth demographics.",
    priority: "High",
    status: "active",
    date: "Jun 8, 2025",
    adGroups: [
      {
        id: "ag1",
        name: "Instagram Stories",
        description: "Stories for youth demographic",
        status: "active",
        ads: [],
      },
      {
        id: "ag2",
        name: "Facebook Feed",
        description: "Standard feed ads",
        status: "active",
        ads: [],
      },
    ],
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
    ],
  },
  {
    id: "ea2ef5fd-03a4-472d-aa83-73e37e30f08b",
    name: "Brand Awareness Q3",
    description: "Increasing brand reach through video ads.",
    priority: "Medium",
    status: "draft",
    date: "Jul 1, 2025",
    adGroups: [],
    members: [
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "83d3eab7-1257-4148-a599-c9217dfee0c7",
    name: "Retargeting Cart Abandoners",
    description: "Dynamic product ads for users who left checkout.",
    priority: "High",
    status: "paused",
    date: "Jun 15, 2025",
    adGroups: [
      {
        id: "ag3",
        name: "Display Network",
        description: "Google display network ads",
        status: "paused",
        ads: [],
      },
    ],
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
    ],
  },
  {
    id: "c55e59f6-4808-43c2-9be8-d805e9ea672a",
    name: "Holiday Special",
    description: "Early bird specials for holiday season.",
    priority: "Medium",
    status: "draft",
    date: "Aug 10, 2025",
    adGroups: [],
    members: [],
  },
  {
    id: "84266487-5777-4668-990a-325850484781",
    name: "New Product Launch",
    description: "Launch campaign for the new product line X.",
    priority: "High",
    status: "completed",
    date: "May 20, 2025",
    adGroups: [],
    members: [],
  },
];

const CampaignsPage = () => {
  const [searchedCampaigns, setSearchedCampaigns] =
    useState<Campaign[]>(Campaigns);
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

      {/* Search & Filter Bar */}
      <SearchFilterBar
        data={Campaigns}
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
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
              >
                <Link to={`/campaigns/${campaign.id}`}>
                  <CampaignCard campaign={campaign} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredCampaigns.length === 0 && (
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

export default CampaignsPage;
