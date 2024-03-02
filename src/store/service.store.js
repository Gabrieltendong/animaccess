import { create } from 'zustand'

export const useServiceStore = create((set) => ({
    list_service_prestataire: [],
    setListServicePrestataire: async (data) => set({list_service_prestataire: data})
}))