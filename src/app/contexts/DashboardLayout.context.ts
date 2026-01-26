import { createContext, useContext } from "react";

export interface DashboardLayoutContextValue {
    sidebarWidth: number;
    isCollapsed: boolean;
    toggleSidebar: () => void;
    setSidebarWidth: (width: number) => void;
}

export const DashboardLayoutContext =
    createContext<DashboardLayoutContextValue | null>(null);

export const useDashboardLayout = (): DashboardLayoutContextValue => {
    const ctx = useContext(DashboardLayoutContext);
    if (!ctx) {
        throw new Error(
            "useDashboardLayout must be used within DashboardLayout"
        );
    }
    return ctx;
};
