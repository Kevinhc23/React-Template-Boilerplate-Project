export type Priority = "Low" | "Medium" | "High";
export type Status = "todo" | "in-progress" | "complete";

export type Project = {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    date: string;
    members: Member[];
}

export type Member = {
    name: string;
    avatar: string;
}