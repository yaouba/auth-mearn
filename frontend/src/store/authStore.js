import { create } from 'zustand'
import axios from 'axios'
import env from '../config/env.js'

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })

        try {
            const res = await axios.post(`${env.apiUrl}/register`, { email, password, name }) 
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false })
            throw error; 
        }
    }
}))