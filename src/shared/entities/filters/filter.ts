
export type FilterGroup = {
    id: string;
    label: string;
    type: "single" | "multiple";
    options: FilterOption[];
};

export type FilterOption = {
    label: string;
    value: string;
    icon?: React.ReactNode;
};