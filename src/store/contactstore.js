import { create } from "zustand";
import { persist } from "zustand/middleware";

const useContactStore = create(persist((set)=>({
    allForm:[],
    addToForm:(form)=>set((state)=>({allForm:[...state.allForm,form]}))
}),{
    name:"contact-storage"
}))

export default useContactStore