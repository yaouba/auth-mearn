import { create } from 'zustand'
import axios from 'axios'
import env from '../config/env.js'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = env.apiUrl;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })

        try {
            const res = await axios.post(`/register`, { email, password, name }) 
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false })
            throw error; 
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })

        try {
            const res = await axios.get(`/check-auth`)
            set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ error: null, isCheckingAuth: false })
            throw error; 
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })

        try {
            const res = await axios.post(`/verify-email`, { code })
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
            return res.data
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false })
            throw error; 
        }
    }
}))