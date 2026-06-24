import React from 'react'
import "./showcase.css"
import data from "../../data.json"
import { useNavigate } from 'react-router-dom'

const Showcase = () => {
  const navigate = useNavigate()
  return (
    <div id='showcaseouter'>
      {
        data.showcase.map((item,index)=>{
          return <div key={index} className='showcaseinner'>
            <div className='contentdiv'>
              <p>{item.offer}</p>
              <h3>{item.title}</h3>
              <button
              onClick={()=>navigate("/checkout")}> BUY NOW</button>
            </div>
            <div className='imgdiv'>
              <img src={item.image} alt="furniture" />
            </div>
          </div>
          
        })
      }   
    </div>
  )
}

export default Showcase