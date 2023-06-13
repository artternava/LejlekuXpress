import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReactStars from "react-stars";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import useAuthToken from '../components/useAuthToken';

const SingleProduct = () => {
  const { id } = useParams();
  const [items, setItems] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const { userId } = useAuthToken();
  const [orderedProduct] = useState(true);
  const [checkout, setCheckout] = useState([]);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    fetchListings();
    console.log('Id:', id);
  }, [id]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/Product/get?id=${id}`);
      setItems(response.data);
      console.log(items)
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedInCheckOut = (productId, quantity) => {
    if(!userId){
      const confirm = window.confirm('You must login if you wanna checkout');
      if(confirm){
        window.location.href = '/login'
      }
    }
    else{
      handleBuyNow(productId, quantity)
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
      handleAddToWishlist(productId)
    }
  }

  async function handleAddToWishlist(productId) {
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
      const itemsData ={
        UserId: parseInt(userId, 10),
        ProductId: productId,
      }
      console.log(itemsData);
      setAddItem(itemsData)
      await axios.post('http://localhost:39450/api/Cart/add', addItem)
      .then((response) => {
        window.alert('add successful');        
      });
      fetchWishlist(); 
    } catch (error) {
      console.error('Error adding items:', error);
    }
  }

  async function handleBuyNow(productId, quantity) {
    try {
      const itemsData = {
        UserId: parseInt(userId, 10),
        ProductId: productId,
        Quantity: quantity,
      }
      console.log(itemsData);
      setCheckout(itemsData)
      await axios.post('http://localhost:39450/api/CheckOut/add', checkout)
      .then((response) => {
        window.alert('Proceed to checkout');
        window.location.href = '/checkout';
      });
      fetchWishlist(); 
    } catch (error) {
      console.error('Error adding items:', error);
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
  return <div>Loading...</div>; 
}

  return (
    <>
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                <img src={`data:image/${getImageExtension(items.image)};base64,${items.image}`} alt="Product" style={{ width: "80%", height: "auto", objectFit: "contain" }} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h1 className="title">{items.name}</h1>
                </div>
                <div className="border-bottom py-3">
                  <h4 className="price">${items.price}</h4>
                  <p className="price text-success">${items.shippingPrice}</p>
                </div>
                <div className="border-bottom py-3">
                <div className="mt-1 mb-0 text-muted small">
                  <p style={{fontSize: "16px"}}>{items.specifications}</p>
                </div>
                <div className="mt-1 mb-0 ">
                  <p>{items.description}</p>
                </div>
                  <div className="d-flex gap-15 flex-row mt-2 mb-3 align-items-center">
                    <h3 className="product-heading">Quantity :</h3>
                    <div>
                      
                    <input
                      className="form-control"
                      type="number"
                      name=""
                      min={1}
                      max={items.quantity}
                      style={{ width: "70px" }}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button className="btn btn-outline-success me-2" type="button" onClick={() => isLoggedInCart(items.id)}><i className="bi bi-cart-fill me-2"></i>
                        Add to Cart
                      </button>

                      <button className="btn btn-success me-2" type="button" onClick={() => isLoggedInCheckOut(items.id, quantity)}>Buy It Now</button>
                    </div>
                  </div>
                  <div className="mt-1 mb-0 ">
                      <p>Available: {items.quantity}</p>
                    </div>
                  <div className="d-flex align-items-center gap-30">
                    <div>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => isLoggedInWishlist(items.id)}><i className="bi bi-heart-fill me-2"></i>Add to Wishlist</button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>{items.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
