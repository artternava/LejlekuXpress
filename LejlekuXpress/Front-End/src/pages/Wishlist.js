import React, { useState, useEffect } from "react";
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Wishlist() {
  const location = useLocation();
  const { userId } = useAuthToken();
  const [items, setItems] = useState(null);
  const [listings, setListings] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchListings();
    fetchWishlist();
  }, [userId]);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/Product/getall');
      setListings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedInCart = (productId) => {
    if(!userId){
      const confirm = window.confirm('You must login if you wanna add to cart');
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

  async function fetchWishlist() {
    try {
      const response = await axios.get(`http://localhost:39450/api/Wishlist/getbyuserid?userID=${userId}`);
      if (response.status === 200) {
        const itemsResponse = response.data;
        setItems(itemsResponse);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      const confirmDelete = window.confirm('Are you sure you want to remove this item from your Wishlist?');
      if (confirmDelete){
        await axios.delete(`http://localhost:39450/api/Wishlist/delete?id=${id}`);
        fetchWishlist();
        window.location.href = '/Wishlist';
      }
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  }

  const getProductName = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? `${listing.name}` : '';
  };
  const getProductId = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? `${listing.id}` : '';
  };

  const getimage = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? `${listing.image}` : '';
  };

  const getPrice = (productId) => {
    const listing = listings && listings.find(listing => listing.id === productId);
    return listing ? `${listing.price}` : '';
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
    return listing ? `${listing.shippingPrice}` : '';
  };



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

if (!items) {
  return (
    <div className="text-center" style={{minHeight: "58vh"}}>
      <h1 className="mt-4 mb-3"> Put something in the Wishlist ghaddd damnit </h1>
    <img src="/images/broken.png" style={{width: "25%"}} alt="Offer 1" />
    <h4 className="mt-4 mb-3">Your Wishlist is empty.</h4>
    </div>
    ); 
  }
  
  return (
    <>
    <section style={{ backgroundColor: "#fff", minHeight: "100vh" }} className="mt-3 mb-3">
      {items && items.map((item) => (
       <div className="container mt-3">
         <div className="row justify-content-center">
           <div className="col-md-12 col-xl-10">
             <div className="card shadow-0 border rounded-3">
               <div className="card-body">
                 <div className="row align-items-center">
                   <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0 d-flex ">
                     <div className="bg-image hover-zoom ripple rounded ripple-surface ">
                       <Link to={`/product/${item.productId}`} className="input-group-text p-3 justify-content-center" id="basic-addon2">
                         <img className="" src={`data:image/${getImageExtension(getimage(item.productId))};base64,${getimage(item.productId)}`} alt="Product" style={{ width: "70%", height: "auto", objectFit: "contain" }} />
                       </Link>
                       <a href="#!">
                         <div className="hover-overlay">
                           <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                         </div>
                       </a>
                     </div>
                   </div>
                   <div className="col-md-6 col-lg-6 col-xl-6">
                     <h5>{getProductName(item.productId)}</h5>
                     <div className="d-flex flex-row">
                       <div className="text-danger mb-1 me-2">
                         <p><b>Quantity:</b></p>
                       </div>
                       <span>{getQuantity(item.productId)}</span>
                     </div>
                     <div className="mt-1 mb-0 text-muted small">
                       <p>{getSpecifications(item.productId)}</p>
                     </div>
                     <p className="text-truncate mb-4 mb-md-0">
                       {getDescription(item.productId)}
                     </p>
                   </div>
                   <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                     <div className="d-flex flex-row align-items-center mb-1">
                       <h4 className="mb-1 me-1">Price: ${getPrice(item.productId)}</h4>
                     </div>
                     <h6 className="text-success">Shipping: ${getShippingPrice(item.productId)}</h6>
                     <div className="d-flex flex-column mt-4">
                       <button className="btn btn-primary btn-sm" type="button" onClick={() => isLoggedInCart(getProductId(item.productId))}>
                        Add to Cart
                        </button>
                       <button className="btn btn-outline-danger btn-sm mt-2" type="button" onClick={() => handleDelete(item.id)}>
                         Delete
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     
     
      ))}
      </section>
    </>
  );
}

export default Wishlist;