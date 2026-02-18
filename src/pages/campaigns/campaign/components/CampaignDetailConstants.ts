import type { AdGroup } from "@/shared/entities/campaign";
import type { FilterGroup } from "@/shared/entities/filters/filter";

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
];

export const searchKeys = (adGroup: AdGroup) => [
    adGroup.name || "",
    adGroup.description || "",
];

export const SKELETON_AD_GROUPS = Array(3).fill({
    id: "skeleton",
    name: "Ad Group Name Placeholder",
    description: "This is a placeholder description for the loading state.",
    status: "draft",
    ads: [],
} as AdGroup);
