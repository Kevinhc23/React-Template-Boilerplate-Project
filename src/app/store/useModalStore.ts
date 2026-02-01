import { create } from 'zustand';
import type { ComponentType } from 'react';

interface ModalState {
    isOpen: boolean;
    view: ComponentType<any> | null;
    data: any;
    openModal: <T>(view: ComponentType<T>, data?: T) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    view: null,
    data: null,
    openModal: (view, data) => set({
        isOpen: true,
        view,
        data: data ?? null
    }),
    closeModal: () => set({
        isOpen: false,
        view: null,
        data: null
    }),
}));