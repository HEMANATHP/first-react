import React from 'react'
import data from '../../data.json'
import './policy.css'

const Policy = () => {
  return (
    <section id='policy'>
      <div id='policycards'>
        {
          data.policy.map((item, key)=>{
            return <div key={key} className='policy-card'>
              <div className='icondiv'>
                <i className={item.icon}></i>
              </div>
              <div className='content'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          })
        }
      </div>
    </section>
  )
}

export default Policy;