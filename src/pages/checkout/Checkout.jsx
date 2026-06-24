// import React, { useContext, useState } from "react";
import "./checkout.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useProductStore from "../../store/productstore";
// import ProductContext from "../../context/ProductContext";
import useCheckoutStore from "../../store/checkoutstore";

const Checkout = () => {
  // const {cartItems}= useContext(ProductContext)

  const cartItems = useProductStore((state) => state.cartItems);

  const allCheckoutData = useCheckoutStore((state) => state.allCheckoutData);

  const addCheckoutData = useCheckoutStore((state) => state.addCheckoutData);

  // const [checkoutData, SetcheckoutData] = useState({
  //   name: "",
  //   email: "",
  //   phoneno: "",
  //   address: "",
  //   city: "",
  //   pincode: "",
  //   paymentmethod: "",
  // });

  // const nameregex = /^[a-zA-z\s]{3,30}$/;
  // const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const phonenoregex = /^\d{10}$/;
  // const addressregex = /^[^@#$%&*^()]+$/;
  // const cityregrex = /^[a-zA-Z]+$/;
  // const pincoderegrex = /^\d{6}$/;

  // const handlechange = (e) => {
  //   SetcheckoutData({
  //     ...checkoutData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleclick = (e) => {
  //   e.preventDefault();
  //   if (!nameregex.test(checkoutData.name)) {
  //     toast.error("enter vaild name")
  //     return;
  //   }
  //   if (!emailregex.test(checkoutData.email)) {
  //     toast.error("enter a valid email");
  //     return;
  //   }
  //   if (!phonenoregex.test(checkoutData.phoneno)) {
  //     toast.error("enter a valid mobile number");
  //     return;
  //   }
  //   if (!addressregex.test(checkoutData.address)) {
  //     toast.error("enter valid address ");
  //     return;
  //   }
  //   if (!cityregrex.test(checkoutData.city)) {
  //     toast.error("enter a vaild city");
  //     return;
  //   }
  //   if (!pincoderegrex.test(checkoutData.pincode)) {
  //     toast.error("enter a valid pincode");
  //     return;
  //   }
  //   if(checkoutData.paymentmethod === ""){
  //     toast.info("choose a payment method")
  //     return
  //   }
  //   addCheckoutData(checkoutData);
  //   SetcheckoutData({
  //     name: "",
  //     email: "",
  //     phoneno: "",
  //     address: "",
  //     city: "",
  //     pincode: "",
  //     paymentmethod: "",
  //   });
  //    toast.success("order placed successfully")
  // };

  const checkoutSchema = z.object({
    name: z.string().min(3, "name should be alteast 3 character"),
    email: z.string().email("enter a valid email"),
    phoneno: z.string().regex(/^\d{10}$/, "enter a valid mobile number"),
    address: z.string().regex(/^[^@#$%&*^()]+$/, "enter a valid Address"),
    city: z.string().regex(/^[a-zA-Z]+$/, "Enter a valid city"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid pincode"),
    paymentmethod: z.string().min(1, "choose a payment method"),
  });

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
    console.log(data);
    addCheckoutData(data);

    toast.success("Order Placed Succesfully");

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
            // required
            // value={checkoutData.name}
            // onChange={handlechange}
            // name="name"
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
};

export default Checkout;
