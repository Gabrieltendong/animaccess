import { create } from 'zustand'

export const useBookingStore = create((set) => ({
    list_booking_etablissment: [],
    setListBookingEtablissement: (list_booking_etablissment) => set({list_booking_etablissment})
}))