import { useState,useEffect} from "react";
import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
 const [wishlistItems, setwishlistItems] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch {
    return [];
  }
});

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartItems))
  },[cartItems])

  useEffect(()=>{
    localStorage.setItem('wishlist',JSON.stringify(wishlistItems))
  },[wishlistItems])
  

  return (
    <ProductContext.Provider
      value={{
        cartItems,
        setCartItems,
        wishlistItems,
        setwishlistItems
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
