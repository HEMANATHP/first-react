import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProductStore = create(
    persist((set) => ({
    cartItems: [],
    wishlistItems: [],
    
    addtocart: (product) =>set((state) => {const existing = state.cartItems.find(
        (item)=>item.id === product.id
    );
    if(existing){
        return{
            cartItems:state.cartItems.map((item)=>
                item.id === product.id?{
                    ...item,quantity:item.quantity+1
                }:item
            )
        }
    }
    return{
        cartItems:[...state.cartItems,{...product,quantity:1}]
    }

    }),
       
    addtowishlist: (product) => set((state) => {
        const existing = state.wishlistItems.some((item)=>
            item.id === product.id 
        )
        if(existing) return state;

        return{
            wishlistItems:[...state.wishlistItems,product]
        }
    }),

    removefromcart: (id) => set((state)=>({cartItems: state.cartItems.filter((items)=>items.id !== id)})),

    removefromwishlists: (id) => set((state)=>({wishlistItems: state.wishlistItems.filter((items)=>items.id !== id)})),

    updatecartitems : (items)=> set({cartItems:items,}),

}),
{
    name:"product-storage"
}))

export default useProductStore