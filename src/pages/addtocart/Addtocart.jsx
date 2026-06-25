import "./addtocart.css";
// import { useContext } from "react";
// import ProductContext from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productstore";
import { toast } from "react-toastify";

const Addtocart = () => {
  const navigate = useNavigate();

  // const { cartItems,setCartItems } = useContext(ProductContext);

  const cartItems = useProductStore((state) => state.cartItems);
  // const addtocart = useProductStore((state)=>state.addtocart)
  const removefromcart = useProductStore((state) => state.removefromcart);
  const updatecartitems = useProductStore((state) => state.updatecartitems);

  const removeItem = (id) => {
    removefromcart(id);
  };

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
  const checkandnavigate = ()=>{

    if([...cartItems].length === 0){
      toast.error("ADD PROUCTS TO CONTINUE...")
      return
    }
    navigate("/checkout")
  }
  const subtotal = totalPrice();
  const Shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + Shipping;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 && (
        <div id="zeroitem">
          <h2>No items in the Cart</h2>
        </div>
      )}
      {cartItems.map((cartItem, index) => {
        return (
          <div key={index}>
            <div className="cart-items">
              <div className="cart-item">
                <img src={cartItem.image} alt="Chair" />

                <div className="item-details">
                  <h3>{cartItem.title}</h3>
                  <p>{cartItem.price}</p>
                </div>

                <div className="quantity">
                  <button onClick={() => decrement(cartItem.id)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => increment(cartItem.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(cartItem.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: USD {subtotal.toFixed(2)}</p>
        <p>Shipping: USD {Shipping.toFixed(2)}</p>
        <h3>Total: USD {total.toFixed(2)}</h3>

        <button className="checkout-btn" onClick={() => checkandnavigate()}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Addtocart;
