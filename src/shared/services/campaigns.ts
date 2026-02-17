import { api } from "@/shared/config/api";
import type { Campaign } from "@/shared/entities/campaign";

export const getCampaignById = async (id: string): Promise<Campaign> => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
};