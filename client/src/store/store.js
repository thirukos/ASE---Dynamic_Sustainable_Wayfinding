import create from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        username : '',
        active : false
    },
    score: 0,
    setScore: (newScore) => set({ score: newScore }),
    setUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }})) 
}))
