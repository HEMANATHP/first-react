import "./App.css";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import Addtocart from "./pages/addtocart/Addtocart";
import Addtowishlist from "./pages/addtowishlist/Addtowishlist";
import Checkout from "./pages/checkout/Checkout";
import Contact from "./pages/contact/Contact";
import Shop from "./pages/shop/Shop";


import {Routes,Route} from 'react-router-dom'


function App() {

  return (
      <>
      <ToastContainer position="top-right" autoClose={2000}/>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path='/cart' element={<Addtocart/>}></Route>
          <Route path='/wishlist' element={<Addtowishlist/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route  path="/shop" element={<Shop/>}></Route>
        </Routes>
      </>
  );
}

export default App;