import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(persist((set)=>({
    auth:null,
    setAuth:(data)=>set({
        auth:data
    }),
    logoutAuth:()=>set({
        auth:null
    })
}),{
    name:"login-store"
}))

export default useLoginStore;