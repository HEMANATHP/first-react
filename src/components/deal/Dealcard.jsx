import React, { useState } from "react";
import "./dealcard.css";
import { useNavigate } from "react-router-dom";

const Dealcard = () => {

  const [ishovered,Setishovered]= useState(null)

  const navigate = useNavigate()
  return (
    <div id="dealouterdiv">
      <div id="leftdiv">
        <div id="leftfstinner">
          <div id="leftsecinner">
            <div id="leftdivcontent">
              <h4>HOT DEAL FURNITURE</h4>
              <h2>Live Furniture</h2>
              <h2>Your Love</h2>
              <button
              onClick={()=>navigate("/shop")}>
                BUY NOW <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="rightdiv">
        
        <div className="rightdivouter"
        onMouseEnter={()=>Setishovered(1)
        }
        onMouseLeave={()=>Setishovered(null)}>
          {
            ishovered===1 && (<><div className="hoverdiv"> "Furniture is the silent storyteller of every home."</div><div className="square"></div></>)
          }
          <div className="rightdivinner"></div>
        </div>
        <div className="rightdivouter"
        onMouseEnter={()=>Setishovered(2)}
        onMouseLeave={()=>Setishovered(null)}>
          {
            ishovered===2 && (<><div className="hoverdiv"> "Comfort begins with the perfect chair."</div><div className="square"></div></>)
          }
          <div className="rightdivinner"></div>
        </div>
        <div className="rightdivouter"
        onMouseEnter={()=>Setishovered(3)}
        onMouseLeave={()=>Setishovered(null)}>
          {
            ishovered===3 && (<><div className="hoverdiv"> "Design your space, design your life."</div><div className="square"></div></>)
          }
          <div className="rightdivinner"></div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Dealcard;
