  import "./addtowishlist.css";
  import useProductStore from "../../store/productstore";
import { useCart } from "../../hooks/useCart";

  const Addtowishlist = () => {

    const{addtocart}= useCart();
    const wishlistItems = useProductStore((state)=>state.wishlistItems)
    const removefromwishlists = useProductStore((state)=>state.removefromwishlists)

    const Addtocart = (product)=>{
      addtocart(product)
      removefromwishlists(product.id)
    }
      const removeItem = (id) =>{
      removefromwishlists(id)
    }
    return (
      <div className="wishlist-container">
        <h1>My Wishlist ❤️</h1>
        {
        wishlistItems.length ===0 && (
          <div id="zeroitem"><h2>No items in the wishlist</h2></div>
        )
        }
        <div className="wishlist-items" >
        {
          wishlistItems.map((items)=>{
        return(
          <div className="wishlist-item" key={items.id
          }>
            <img
              src={items.image}
              alt="product"
            />

            <div className="wishlist-details">
              <h3>{items.title}</h3>
              <p>{items.price}</p>
            </div>

            <div className="wishlist-actions">
              <button className="cart-btn"
              onClick={()=>Addtocart(items)}>
                Add To Cart
              </button>

              <button className="remove-btn"
              onClick={()=> removeItem(items.id)}>
                Remove
              </button>
            </div>
          </div>
        )     
          })
        }
        
        </div>
      </div>
    );
  };

  export default Addtowishlist;