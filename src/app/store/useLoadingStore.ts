import { create } from 'zustand';

interface LoadingState {
    isVisible: boolean;
    message: string;
    showLoading: (message?: string) => void;
    hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isVisible: false,
    message: "Processing request...",
    showLoading: (message) => set({
        isVisible: true,
        message: message ?? "Processing request..."
    }),
    hideLoading: () => set({ isVisible: false }),
}));