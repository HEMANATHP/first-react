import React, { useState, useEffect } from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const buttonelement = ["BUY NOW", "VIEW CART"];

  const [currentslide, Setcurrentslide] = useState(0);

  const slideimage = [
    "https://png.pngtree.com/png-vector/20250506/ourmid/pngtree-dark-blue-navy-sapphire-color-armchair-modern-designer-chair-png-image_16179711.png",
    "https://png.pngtree.com/png-vector/20250724/ourmid/pngtree-regal-white-and-gold-tufted-throne-chair-high-resolution-image-showcasing-png-image_16655689.webp",
    "https://static.vecteezy.com/system/resources/thumbnails/040/452/829/small/ai-generated-armchair-furniture-isolated-on-transparent-background-free-png.png",
  ];

  const buttonhandler = (button) => {
    if (button === "BUY NOW") {
      navigate("/shop");
    }
    if (button === "VIEW CART") {
      navigate("/cart");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      Setcurrentslide((prev) => {
        return prev === slideimage.length - 1 ? 0 : prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="hero">
      <div className="herodiv">
        <span id="fstherospan">NEW ARRIVAL...</span>
        <p id="fstpara">Elevate Your Home Aesthetics</p>
        <p id="secpara">
          A furniture e-commerce company operates in the digital space, offering
          a wide range of furniture products for sale through an online
          platform.
        </p>
        <div id="buttondiv">
          {buttonelement.map((button) => {
            return (
              <button key={button} onClick={() => buttonhandler(button)}>
                {button} <i className="fa-solid fa-angle-right"></i>
              </button>
            );
          })}
        </div>
      </div>
      <div id="imgdiv">
        <img src={slideimage[currentslide]} alt="" />
      </div>
      <div id="navigatediv">
        {slideimage.map((_, index) => {
          return (
            <button
              key={index}
              className={currentslide === index ? "active-dot" : ""}
              onClick={() => Setcurrentslide(index)}
            ></button>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
