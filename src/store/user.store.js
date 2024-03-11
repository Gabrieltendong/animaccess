import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: {},
    registerData: {},
    setUser: (data) => set({user: data}),
    updateUser: (account) => set((state) => {
        let newUser = state.user
        console.log("account", account)
        newUser.account = account
        console.log("new user", newUser)
        return ({user: newUser})
    }),
    setRegisterData: (registerData) => set({registerData})
}))