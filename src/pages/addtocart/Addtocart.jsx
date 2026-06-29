import "./addtocart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";

const Addtocart = () => {
  const navigate = useNavigate();
  
  const { cartItems,
    removefromcart,
    increment,
    decrement,
    subtotal,
    shipping,
    total } = useCart()

  const removeItem = (id) => {
    removefromcart(id);
  };

  const checkandnavigate = () => {

    if ([...cartItems].length === 0) {
      toast.error("ADD PROUCTS TO CONTINUE...")
      return
    }
    navigate("/checkout")
  }


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
        <p>Shipping: USD {shipping.toFixed(2)}</p>
        <h3>Total: USD {total.toFixed(2)}</h3>

        <button className="checkout-btn" onClick={() => checkandnavigate()}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Addtocart;
