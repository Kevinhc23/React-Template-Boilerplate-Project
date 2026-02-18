import type { Campaign } from "@/shared/entities/campaign";


export const Campaigns: Campaign[] = [
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

export const getCampaigns = () => {
    return new Promise<Campaign[]>((resolve) => {
        setTimeout(() => {
            resolve(Campaigns);
        }, 1000);
    });
}
