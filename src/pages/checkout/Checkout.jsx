// import React, { useContext, useState } from "react";
import "./checkout.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import useProductStore from "../../store/productstore";
// import ProductContext from "../../context/ProductContext";
import useCheckoutStore from "../../store/checkoutstore";

const checkoutSchema = z.object({
  name: z.string().min(3, "name should be alteast 3 character"),
  email: z.string().email("enter a valid email"),
  phoneno: z.string().regex(/^\d{10}$/, "enter a valid mobile number"),
  address: z.string().regex(/^[^@#$%&*^()]+$/, "enter a valid Address"),
  city: z.string().regex(/^[a-zA-Z]+$/, "Enter a valid city"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid pincode"),
  paymentmethod: z.string().min(1, "choose a payment method"),
});

const Checkout = () => {
  // const {cartItems}= useContext(ProductContext)

  const navigate = useNavigate()

  const cartItems = useProductStore((state) => state.cartItems);

  const clearCart = useProductStore((state) => state.clearCart);

  // const allCheckoutData = useCheckoutStore((state) => state.allCheckoutData);

  const addCheckoutData = useCheckoutStore((state) => state.addCheckoutData);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    // defaultValues:{
    //   name:"hemanath",
    // }
  });

  const onsubmit = (data) => {
    if ([...cartItems].length === 0) {
      toast.error("Order can't be placed. Add products to continue.")
      return
    }
    const orderRecord = {
      ...data,
      item: [...cartItems],
      totalPrice: total,
      orderedAT: new Date().toISOString()
    }
    addCheckoutData(orderRecord);
    toast.success("Order Placed Succesfully");
    clearCart();
    reset();
  };

  const paymentmethod = watch("paymentmethod", "");

  const renderpaymentfield = () => {
    switch (paymentmethod) {
      case "UPI":
        return <img src="" alt="SHOW QR CODE" />;

      case "Debit card":
        return <input placeholder="Enter the card number"></input>;

      case "Credit card":
        return <input placeholder="Enter the card number"></input>;

      default:
        return null;
    }
  };

  const totalPrice = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace("USD", ""));
      return acc + price * item.quantity;
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-container" style={{ textAlign: "center", padding: "50px" }}>
        <h2>Your cart is empty! 🛒</h2>
        <p>Please add some products to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
          Go to Shop
        </button>
      </div>
    );
  }

  const subtotal = totalPrice();
  const Shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + Shipping;

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit(onsubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />

          {errors.name && (
            <p className="errorindication">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <p className="errorindication">{errors.email.message}</p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phoneno")}
          />

          {errors.phoneno && (
            <p className="errorindication">{errors.phoneno.message}</p>
          )}

          <input type="text" placeholder="Address" {...register("address")} />
          {errors.address && (
            <p className="errorindication">{errors.address.message}</p>
          )}

          <div className="row">
            <input type="text" placeholder="City" {...register("city")} />

            <input type="text" placeholder="Pincode" {...register("pincode")} />
          </div>
          <div className="row1">
            {errors.city && (
              <p className="errorindication">{errors.city.message}</p>
            )}
            {errors.pincode && (
              <p className="errorindication pincode">{errors.pincode.message}</p>
            )}
          </div>

          <select
            {...register("paymentmethod", {
              required: "Choose a payment method",
            })}
          >
            <option value="">Select Payment Method</option>
            <option value="COD">Cash On Delivery</option>
            <option value={"UPI"}>UPI</option>
            <option value={"Credit card"}>Credit Card</option>
            <option value={"Debit card"}>Debit Card</option>
          </select>
          {errors.paymentmethod && (
            <p className="errorindication">{errors.paymentmethod.message}</p>
          )}
          {renderpaymentfield()}

          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="checkout-right">
        <h2>Order Summary</h2>

        <div className="summary-item">
          <span>SubTotal</span>
          <span> USD {subtotal}</span>
        </div>

        <div className="summary-item">
          <span>Shipping</span>
          <span> USD {Shipping}</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total</span>
          <span>USD {total}</span>
        </div>
      </div>
    </div>
  );
}


export default Checkout;
