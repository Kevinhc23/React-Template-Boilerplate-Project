export type Priority = "Low" | "Medium" | "High";
export type Status = "draft" | "active" | "paused" | "completed";

export type Ad = {
    id: string;
    name: string;
    creative: string;
    status: Status;
};

export type AdGroup = {
    id: string;
    name: string;
    description: string;
    ads: Ad[];
    status: Status;
};

export type Campaign = {
    id: string;
    name: string;
    description: string;
    priority: Priority;
    status: Status;
    date: string;
    adGroups: AdGroup[];
    members: Member[];
};

export type Member = {
    name: string;
    avatar: string;
}