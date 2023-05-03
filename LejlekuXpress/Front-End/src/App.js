import React from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import OurStore from './pages/OurStore';
import Wishlist from './pages/Wishlist';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='about' element={<About />}/>
            <Route path='product' element={<OurStore />}/>
            <Route path='product/:id' element={<SingleProduct/>} />
            <Route path='contact' element={<Contact />}/>
            <Route path='login' element={<Login />}/>
            <Route path='forgot-password' element={<ForgotPassword />}/>
            <Route path='signup' element={<Signup />}/>
            <Route path='wishlist' element={<Wishlist />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
