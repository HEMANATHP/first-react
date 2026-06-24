import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCheckoutStore = create(persist((set)=>({
    allCheckoutData:[],
    addCheckoutData:(checkoutdata)=>set((state)=>({allCheckoutData:[...state.allCheckoutData,checkoutdata]}))
}),{
    name:"checkoutdata-storage"
}))

export default useCheckoutStore;