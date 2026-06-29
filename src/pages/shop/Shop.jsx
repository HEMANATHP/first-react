import React from "react";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productstore";
import "./shop.css"
import { useCart } from "../../hooks/useCart";

const { featuredproducts } = data;

const Shop = () => {
  const navigate = useNavigate();

  const {addtocart}=useCart()
  const addtowishlist = useProductStore((state) => state.addtowishlist);

  const handleCart = (product) => {
    addtocart(product);
    navigate("/cart");
  };

  const handleWishlist = (product) => {
    addtowishlist(product);
    navigate("/wishlist");
  };

  return (
    <div className="shop-page">
      <h1>Shop</h1>

      <div className="shop-grid">
        {featuredproducts.map((product) => (
          <div className="shop-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>{product.price}</p>

            <div className="shop-btns">
              <button onClick={() => handleCart(product)}>
                Add To Cart
              </button>

              <button onClick={() => handleWishlist(product)}>
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;