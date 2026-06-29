import { useNavigate } from "react-router-dom";
import useProductStore from "../store/productstore";

export const useCart = () => {
  const cartItems = useProductStore((state) => state.cartItems);
  const addtocart = useProductStore((state) => state.addtocart);
  const removefromcart = useProductStore((state) => state.removefromcart);
  const updatecartitems = useProductStore((state) => state.updatecartitems);
  const clearCart = useProductStore((state) => state.clearCart);
  
  const increment = (id) => {
    const update = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    updatecartitems(update);
  };
  const decrement = (id) => {
    const update = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updatecartitems(update);
  };

  const totalPrice = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace("USD", ""));
      return acc + price * item.quantity;
    }, 0);
  };

  const subtotal = totalPrice();
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return {
    cartItems,
    increment,
    decrement,
    clearCart,
    subtotal,
    shipping,
    total,
    removefromcart,
    addtocart,
    updatecartitems,
  };
};
