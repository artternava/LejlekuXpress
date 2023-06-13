import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard"
import Header from "../components/Header"
import useAuthToken from '../components/useAuthToken';


const OurStore = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const [items, setItems] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const [addToCart, setAddToCart] = useState(null);
  const [cart, setCart] = useState(null);
  const { userId } = useAuthToken();

  useEffect(() => {
    fetchListings();
    console.log('Search Query in ourStore:', searchQuery);
  }, [searchQuery]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/Product/getallwhereapprovedandnamelike?searchQuery=${searchQuery}`);
      setItems(response.data);
      console.log(items)
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchWishlist() {
    try {
      const response = await axios.get(`http://localhost:39450/api/Wishlist/getbyuserid?userID=${userId}`);
      if (response.status === 200) {
        const itemsResponse = response.data;
        setWishlist(itemsResponse);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const isLoggedInCart = (productId) => {
    if(!userId){
      const confirm = window.confirm('You must login if you wanna add to cart');
      if(confirm){
        window.location.href = '/login'
      }
    }
    else{
      handleAddToCart(productId)
    }
  }
  
  const isLoggedInWishlist = (productId) => {
    if(!userId){
      const confirm = window.confirm('You must login if you wanna add to wishlist');
      if(confirm){
        window.location.href = '/login'
      }
    }
    else{
      handleAdd(productId)
    }
  }
  
  async function handleAdd(productId) {
    try {
      const itemsData ={
        UserId: parseInt(userId, 10),
        ProductId: productId,
      }
      console.log(itemsData);
      setAddItem(itemsData)
      await axios.post('http://localhost:39450/api/Wishlist/add', addItem)
      .then((response) => {
        window.alert('add successful');
      });
      fetchWishlist(); 
    } catch (error) {
      console.error('Error adding items:', error);
    }
  }

  async function handleAddToCart(productId) {
    try {
      const itemsData = {
        UserId: parseInt(userId, 10),
        ProductId: productId,
      }
      console.log(itemsData);
      setAddToCart(itemsData)
      await axios.post('http://localhost:39450/api/Cart/add', addToCart)
      .then((response) => {
        window.alert('add successful');
      });
      fetchCart(); 
    } catch (error) {
      console.error('Error adding items:', error);
    }
  }

  async function fetchCart() {
    try {
      const response = await axios.get(`http://localhost:39450/api/Cart/getbyuserid?userID=${userId}`);
      if (response.status === 200) {
        const itemsResponse = response.data;
        setCart(itemsResponse);
        }
      } catch (error) {
        console.error(error);
      }
    }


  //#region getImageExtension
  const getImageExtension = (imageData) => {
    if (!imageData) {
      return '';
    }

    if (imageData[0] === 0xFF && imageData[1] === 0xD8 && imageData[2] === 0xFF) {
      return 'jpeg';
    }
    if (
      imageData[0] === 0x89 &&
      imageData[1] === 0x50 &&
      imageData[2] === 0x4E &&
      imageData[3] === 0x47 &&
      imageData[4] === 0x0D &&
      imageData[5] === 0x0A &&
      imageData[6] === 0x1A &&
      imageData[7] === 0x0A
    ) {
      return 'png';
    }
    return 'jpeg';
  };
//#endregion


if (items === null || items.length === 0) {
  return (
    <div className="text-center">
      <h1 className="mt-4 mb-3">We don't have it ghaddd damnit</h1>
      <img src="/images/bonocular.png" style={{width: "45%"}} alt="Offer 1" />
      <h4 className="mt-4 mb-3">Product not found!</h4>
    </div>
  ); 
}
  

  return (
    <>
    <Meta title="Our Store"></Meta>
    <div className='store-wrapper home-wrapper-2 py5' style={{minHeight:"100vh"}}>
    {items && items.map((item) => (
        <section style={{ backgroundColor: "#fff" }}>
          <div className="container py-3">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xl-10">
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                          <Link to={`/product/${item.id}`} className="input-group-text justify-content-center p-3" id="basic-addon2">
                            <img src={`data:image/${getImageExtension(item.image)};base64,${item.image}`} alt="Product" style={{width: "60%", aspectRatio: "1/1"}} />
                          </Link>
                          <a href="#!">
                            <div className="hover-overlay">
                              <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>{item.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <p><b>Quantity</b></p>
                          </div>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="mt-1 mb-0 text-muted small">
                          <p>{item.specifications}</p>
                        </div>
                        <p className="text-truncate mb-4 mb-md-0">
                          {item.description}
                        </p>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1">${item.price}</h4>
                        </div>
                        <h6 className="text-success">${item.shippingPrice}</h6>
                        <div className="d-flex flex-column mt-4">
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => isLoggedInCart(item.id)}>Add to Cart</button>
                          <button className="btn btn-danger btn-sm mt-2" type="button" onClick={() => isLoggedInWishlist(item.id)}>
                            <i className="bi bi-heart-fill me-2"></i>Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
    </>
  )
}

export default OurStore