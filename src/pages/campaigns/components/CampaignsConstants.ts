import type { Campaign } from "@/shared/entities/campaign";
import type { FilterGroup } from "@/shared/entities/filters/filter";

// --- Constants ---
export const searchKeys = (campaign: Campaign) => [
    campaign.name,
    campaign.description,
];

export const SKELETON_CAMPAIGNS = Array(6).fill({
    id: "skeleton",
    name: "Campaign Name Placeholder",
    description: "This is a placeholder description for the loading state.",
    priority: "Low",
    status: "draft",
    date: "2024-01-01",
    adGroups: [],
    members: [],
} as Campaign);

export const FILTER_OPTIONS: FilterGroup[] = [
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
