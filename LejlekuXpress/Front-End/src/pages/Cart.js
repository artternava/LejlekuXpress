import React, { useState, useEffect } from "react";
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

  
function Cart() {
  // const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const { userId } = useAuthToken();
  const [items, setItems] = useState(null);
  const [listings, setListings] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);
  const [ProductPrice, setProductPrice] = useState(0);

  useEffect(() => {  
    calculateTotalShippingPrice(items);
    calculateProductPrice(items);
    calculateTotalPrice(items); 
    fetchListings();
    fetchCart();
  }, [userId,items]);

  const  addToCheckout = async () => {
    try{
      console.log(items);

      for (const item of items) {
        const inputElement = document.getElementById(`quantity-${item.productId}`);
        const quantity = parseInt(inputElement.value);
        const data = {
          ...item,
          quantity: quantity,
        };
        await axios.post('http://localhost:39450/api/CheckOut/add', data);
      }
      window.location.href = '/Checkout';
    }
    catch (error){
        console.error('Error adding items:', error);
    }
  }
  

  //#region Calculate Total and Shipping price
  
  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    if (items) {
      items.forEach(item => {
        const price = getPrice(item.productId);
        const shippingPrice = getShippingPrice(item.productId);
        totalPrice += price + shippingPrice;
      });
    }
    return totalPrice;
  };

  const calculateProductPrice = (items) => {
    if (items) {
      const ProductPrice = items.reduce((acc, item) => {
        const productPrice = parseInt(getPrice(item.productId));
        return acc + productPrice;
      }, 0);
      setProductPrice(ProductPrice);
    }
  };
  

  const calculateTotalShippingPrice = (items) => {
    if (items) {
      const totalShippingPrice = items.reduce((acc, item) => {
        const shippingPrice = parseInt(getShippingPrice(item.productId));
        return acc + shippingPrice;
      }, 0);
      setTotalShippingPrice(totalShippingPrice);
    }
  };
  //#endregion

  //#region Fetch calls
  const fetchListings = async () => {
  try {
    const response = await axios.get('http://localhost:39450/api/Product/getall');
    setListings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchCart() {
  try {
    const response = await axios.get(`http://localhost:39450/api/Cart/getbyuserid?userID=${userId}`);
    if (response.status === 200) {
      const itemsResponse = response.data;
      setItems(itemsResponse);
      
      }
    } catch (error) {
      console.error(error);
    }
  }
  //#endregion


  async function handleDelete(id) {
  try {
    const confirmDelete = window.confirm('Are you sure you want to remove this item from your Cart?');
    if (confirmDelete){
      await axios.delete(`http://localhost:39450/api/Cart/delete?id=${id}`);
      fetchCart();
      window.location.href = '/Cart';
      } 
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  }

  const isLoggedIn = () => {
    if(!userId){
      const confirm = window.confirm('You must login if you wanna checkout');
      if(confirm){
        window.location.href = '/login'
      }
    }
    else{
      addToCheckout();
    }
  }
  //#region Get Individual Attributes for product
  const getProductName = (productId) => {
  const listing = listings && listings.find(listing => listing.id === productId);
  return listing ? `${listing.name}` : '';
  };

  const getimage = (productId) => {
  const listing = listings && listings.find(listing => listing.id === productId);
  return listing ? `${listing.image}` : '';
  };

  const getPrice = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? parseFloat(listing.price) : 0;
  };

  const getDescription = (productId) => {
  const listing = listings && listings.find(listing => listing.id === productId);
  return listing ? `${listing.description}` : '';
  };

  const getSpecifications = (productId) => {
  const listing = listings && listings.find(listing => listing.id === productId);
  return listing ? `${listing.specifications}` : '';
  };

  const getQuantity = (productId) => {
  const listing = listings && listings.find(listing => listing.id === productId);
  return listing ? `${listing.quantity}` : '';
  };

  const getShippingPrice = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? parseFloat(listing.shippingPrice) : 0;
  };


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
  
  if (!items) {
  return (
    <div className="text-center" style={{minHeight: "58vh"}}>
      <h1 className="mt-4"> Put something in the cart ghaddd damnit </h1>
    <img src="/images/empty-cart-ipack.webp" style={{width: "39%"}} alt="Offer 1" />
    <h4 className="mt-2 mb-3">Your cart is empty.</h4>
    </div>
    ); 
  }


  return (
    <>
      <div class="d-flex mt-5" style={{minHeight: "100vh"}}>
        <div class="container py-2">
          <div class="row justify-content-center">
            <div class="col-md-8">
            {items && items.map((item) => (
               <div class="card mb-4">
               <div class="card-header py-3">
                 <h5 class="mb-0">{getProductName(item.productId)}</h5>
               </div>
               <div class="card-body">
                
                 <div class="row align-items-center">
                   <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    
                   <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                      <Link to={`/product/${item.productId}`} className="input-group-text p-3 justify-content-center mt-3" id="basic-addon2">
                        <img className="" src={`data:image/${getImageExtension(getimage(item.productId))};base64,${getimage(item.productId)}`} alt="Product" style={{ width: "80%", height: "auto", objectFit: "contain" }} />
                      </Link>
                      <a href="#!">
                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                      </a>
                    </div>
                   </div>
                   <div class="col-lg-5 col-md-6 mb-lg-0 align-items-center">
                     <p><b>Specifications:</b> {getSpecifications(item.productId)}</p>
                     <div className="d-flex align-items-center mb-3">
                       <b>Quantity:</b>
                       <div className="ml-1"> 
                       <input
                          className="form-control"
                          type="number"
                          id={`quantity-${item.productId}`} // Make sure the id is in the correct format
                          name=""
                          min={1}
                          max={getQuantity(item.productId)}
                          style={{ width: "70px", height: "30px" }}
                        />
                       </div>
                     </div>
                     <p><b>Price: </b>${getPrice(item.productId)}</p>
                     <p><b>Shipping Price: </b>${getShippingPrice(item.productId)}</p>
                    
                   </div>
                   <div class="col-lg-3 col-md-3 mb-lg-0 mt-2 d-flex justify-content-end align-items-center">
                     <button type="button" class="btn btn-danger me-3 fs-5 " data-mdb-toggle="tooltip" title="Remove item" style={{ width: "50%", height: "20%" }}>
                       <i class="bi bi-trash-fill" onClick={() => handleDelete(item.id)}></i>
                     </button>
                   </div>
                 </div>
                
               </div>
             </div>
             
              ))}
            </div>
            <div class="col-md-3">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0 t">Summary</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>${ProductPrice}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>${totalShippingPrice}</span>
                </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p class="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span><strong>$ {calculateTotalPrice(items)} </strong></span>
                  </li>
                </ul>
                <button className="btn btn-primary btn-block" onClick={isLoggedIn}>
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
          </div>
          <div class="row px-3 text-center">
          <div class="col-md-12 px-5 ">
          <div class="card col-lg-12 col-md-9 mb-lg-4">
              <div class="card-body">
                <p><strong>Expected shipping delivery</strong></p>
                <p class="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
            <div class=" card col-lg-12 col-md-7 mb-lg-4">
              <div class="card-body">
                <p><strong>We accept</strong></p>
                <img class="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                <img class="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express" />
                <img class="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
              </div>
            </div>      
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
          
  
  export default Cart