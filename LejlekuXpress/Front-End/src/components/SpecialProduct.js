import React, { useState, useEffect } from "react";
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SpecialProduct() {
  const location = useLocation();
  const { userId } = useAuthToken();
  const [items, setItems] = useState([]);
  const [listings, setListings] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchListings();
    fetchCart();
  }, [userId]);

const fetchListings = async () => {
  try {
    const response = await axios.get('http://localhost:39450/api/Product/getall');
    setListings(response.data);
  } catch (error) {
    console.log(error);
  }
};

async function fetchProduct() {
  try {
    const response = await axios.get(`http://localhost:39450/api/Product/getrandomsix`);
    if (response.status === 200) {
      const itemsResponse = response.data;
      setItems(itemsResponse);
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
    handleAddCart(productId)
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
    handleAddWishlist(productId)
  }
}

async function handleAddCart(productId) {
  try {
    const itemsData = {
      UserId: parseInt(userId, 10),
      ProductId: productId,
    }
    console.log(itemsData);
    setAddItem(itemsData)
    await axios.post('http://localhost:39450/api/Cart/add', addItem)
    .then((response) => {
      window.alert('add successful');
    });
    fetchCart(); 
  } catch (error) {
    console.error('Error adding items:', error);
  }
}

async function handleAddWishlist(productId) {
  try {
    const itemsData = {
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

async function fetchCart() {
  try {
    const response = await axios.get(`http://localhost:39450/api/Cart/getbyuserid?userID=${userId}`);
    if (response.status === 200) {
      const itemsResponse = response.data;
      setCart(itemsResponse);
      console.log(items)
      }
    } catch (error) {
      console.error(error);
    }
  }

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

 
  if (!items) {
    return (
      <div className="text-center" style={{minHeight: "58vh"}}>
        <h1 className="mt-4 mb-3"> Error loading </h1>
      </div>
      ); 
    }
        return (
          <>
            {items.map((item) => (
              
               <div className="col-md-6 col-lg-4 mb-4 mb-md-0 ">
                <div className="mb-4">
               <div className="card">
                 <div className="d-flex justify-content-between p-3">
                   <p className="lead mb-0">Items of the day</p>     
                 </div>
                 <div className="text-center">
                 <Link to={`/product/${item.id}`} className="input-group-text p-3 justify-content-center" id="basic-addon2">
                         <img className="" src={`data:image/${getImageExtension(item.image)};base64,${item.image}`} alt="Product" style={{ width: "50%", height: "auto", objectFit: "contain", aspectRatio: "1/1" }} />
                       </Link>
                 </div>
                 <div className="card-body">
                   <div className="d-flex justify-content-between">
                     <p className="small"><a href="#!" className="text-muted">{item.specification}</a></p>
                   </div>
         
                   <div className="d-flex justify-content-between mb-3">
                     <h5 className="mb-0">{item.name}</h5>
                     <h5 className="text-dark mb-0">${item.price}</h5>
                   </div>
         
                   <div className="d-flex justify-content-between mb-2">
                     <p className="text-muted mb-0">Available: <span className="fw-bold">{item.quantity}</span></p> 
                     <div className="ms-auto text-warning">
                       
                     <button type="button" class="btn btn-danger btn-sm mb-2 me-4 " data-mdb-toggle="tooltip" title="Move to the wish list">
                        <i class="bi bi-heart-fill" onClick={() => isLoggedInWishlist(item.id)}></i>
                     </button>
                     
                     <button type="button" class="btn btn-warning btn-sm mb-2 " data-mdb-toggle="tooltip" title="Move to the wish list">
                     <i className="bi bi-cart4 " onClick={() => isLoggedInCart(item.id)}></i>
                     </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             </div>
            ))}
            </>
          );          
    }


export default SpecialProduct