import React, { useEffect, useState } from "react";
import "./featured-products.css";
import data from "../../data.json";
// import { useContext } from "react";
// import ProductContext from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productstore";

const { featuredproducts } = data;

const Featuredproduct = () => {

  const navigate = useNavigate()

  const rating = "⭐⭐⭐⭐⭐";
  const icondata = [
    {
      id: 1,
      icon: "fa-solid fa-box-open",
      action: "cart",
      tooltip: "Add To Cart",
    },
    {
      id: 2,
      icon: "fa-regular fa-eye",
      action: "view",
      tooltip: "Quick View",
    },
    {
      id: 3,
      icon: "fa-regular fa-heart",
      action: "wishlist",
      tooltip: "Add To Wishlish",
    },
  ];
  const [icondesc, Seticondesc] = useState(null);

  const [currentindex, Setcurrentindex] = useState(0);

  const [ishovered, Setishovered] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showQuickView, setShowQuickView] = useState(false);

  const visibleproduct = featuredproducts.slice(currentindex, currentindex + 4);

  // const { cartItems, setCartItems,wishlistItems,setwishlistItems } = useContext(ProductContext); //////

  const cartItems = useProductStore((state)=>state.cartItems)
  const wishlistItems = useProductStore((state)=>state.wishlistItems)
  const addtocart = useProductStore((state)=>state.addtocart)
  const addtowishlist = useProductStore((state)=> state.addtowishlist)

  const addToCart = (product)=>{
    addtocart(product);
    navigate("/cart")
  }

  const addToWishlist = (product)=>{
    addtowishlist(product);
    navigate("/wishlist")
  }
  // const addToCart = (product) => {
  //   setCartItems((prev) => {
  //     const existing = prev.find((item)=>

  //       item.id === product.id
  //     )

  //     if(existing){
  //       return prev.map((item)=>
  //         item.id === product.id ? {...item,quantity:item.quantity+1} : item
  //       )
  //     }

  //     return[
  //       ...prev,
  //       {
  //         ...product,quantity:1 
  //       }
  //     ]
  //   });
  //   navigate("/cart")
  // };
  // const addToWishlist = (product)=>{
  //   setwishlistItems((prev)=>{
  //     const existing = prev.find((item)=>

  //       item.id === product.id
  //     )

  //     if(existing){
  //       return prev.map((item)=>
  //         item.id === product.id ? {...item,quantity:item.quantity+1} : item
  //       )
  //     }

  //     return[
  //       ...prev,
  //       {
  //         ...product,quantity:1 
  //       }
  //     ]
  //   })
  // }

  const handleiconclick = (action, product) => {
    switch (action) {
      case "cart": {
        addToCart(product);
        break;
      }
      case "view": {
        setSelectedProduct(product);
        setShowQuickView(true);
        break;
      }
      case "wishlist": {
        addToWishlist(product);
        console.log(wishlistItems)
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (ishovered) return;
    const interval = setInterval(() => {
      Setcurrentindex((prev) => {
        return prev < featuredproducts.length - 4 ? prev + 1 : 0;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [ishovered]);

  useEffect(() => {
    if (showQuickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showQuickView]);

  return (
    <div id="featuredprods">
      <h4>TOP SALE</h4>
      <h1>Featured Product</h1>
      <div id="outerdiv">
        <button
          id="leftbtn"
          onClick={() =>
            Setcurrentindex((prev) => (prev > 0 ? prev - 1 : prev))
          }
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {visibleproduct.map((item, productIndex) => {
          return (
            <div
              className="innerdiv"
              key={productIndex}
              onMouseEnter={() => Setishovered(true)}
              onMouseLeave={() => Setishovered(false)}
            >
              <div className="featureimgdiv">
                <img src={item.image} alt="" />
                <div className="featureprodicondiv">
                  {icondata.map((iconitem) => {
                    return (
                      <div key={iconitem.id} className="iconwrap">
                        <i
                          className={iconitem.icon}
                          onClick={() => handleiconclick(iconitem.action, item)}
                          onMouseEnter={() =>
                            Seticondesc({
                              productIndex,
                              iconId: iconitem.id,
                            })
                          }
                          onMouseLeave={() => Seticondesc(null)}
                        ></i>
                        {icondesc?.productIndex === productIndex &&
                          icondesc?.iconId === iconitem.id && (
                            <p className="para">{iconitem.tooltip}</p>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="featurecontentdiv">
                <h3>{item.title}</h3>
                <h6>{rating}</h6>
                <p>{item.price}</p>
              </div>
            </div>
          );
        })}
        <button
          id="rightbtn"
          onClick={() =>
            Setcurrentindex((prev) =>
              prev < featuredproducts.length - 4 ? prev + 1 : prev,
            )
          }
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      {showQuickView && selectedProduct && (
        <div className="overlay">
          <div id="quickshow" onMouseEnter={() => Setishovered(true)}>
            <img src={selectedProduct.image} alt="image" />
            <div>
              <h1>{selectedProduct.title}</h1>
              <h3>{selectedProduct.price}</h3>
              <p>{selectedProduct.description}</p>
              <button onClick={() => addToCart(selectedProduct) }>
                Add To Cart
              </button>

              <button onClick={() => setShowQuickView(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featuredproduct;
