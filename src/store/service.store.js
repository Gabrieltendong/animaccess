import { create } from 'zustand'

export const useServiceStore = create((set) => ({
    infos_service: {},
    list_service_prestataire: [],
    setSelectedService: (infos_service) => set({infos_service}),
    setListServicePrestataire: async (data) => set({list_service_prestataire: data})
}))