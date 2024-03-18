import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from "zustand/middleware"
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({id: 'user-persist-storage'})

export const useUserStore = create(
    (set) => ({
        user: {},
        registerData: {},
        setUser: (data) => set({user: data}),
        updateUser: (account) => set((state) => {
            let newUser = state.user
            newUser.account = account
            return ({user: newUser})
        }),
        setRegisterData: (registerData) => set({registerData})
    })
)