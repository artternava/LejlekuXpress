import React, { useState, useEffect } from "react";
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';

function Checkout() {
  const { userId } = useAuthToken();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [payments, setPayments] = useState([]);
  const [listings, setListings] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [order, setOrder] = useState(0);
  const [addItem, setAddItem] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchListings();
    fetchAddresses();
    fetchPayments();
    calculateTotalPrice();
    calculateTotalItems();
  }, [userId, items]);

  const handleAdd = async () => {
    try {
      const requests = items.map(item => axios.post('http://localhost:39450/api/Orders/add', item));
      await Promise.all(requests);
      window.alert('Add successful');
      fetchOrder();
    } catch (error) {
      console.error('Error adding items:', error);
    }
  };

  async function fetchOrder() {
    try {
      const response = await axios.get(`http://localhost:39450/api/Orders/getbyuserid?userID=${userId}`);
      if (response.status === 200) {
        const itemsResponse = response.data;
        setOrder(itemsResponse);
        }
      } catch (error) {
        console.error(error);
      }
    }

  const fetchListings = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/Product/getall`);
      setListings(response.data);
      console.log(items)
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/ShippingAddress/get?UserId=${userId}`);
      if (response.status === 200) {
        const addressData = response.data;
        setAddresses(addressData);        
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/Payment/get?UserId=${userId}`);
      if (response.status === 200) {
        const paymentData = response.data;
        setPayments(paymentData);        
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:39450/api/CheckOut/getbyuserid?UserId=${userId}`);
      if (response.status === 200) {
        const paymentData = response.data;
        setItems(paymentData);    
        console.log(items);    
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await axios.delete(`http://localhost:39450/api/CheckOut/deleteall`);
    } catch (error) {
      console.error('Error deleting all items:', error);
    }
  };

  const buyNow = async () => {
    try {
      handleAdd();
      deleteAll();
      window.location.href = '/';
    } catch (error) {
      console.error('Error buying:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    if (items) {
      items.forEach(item => {
        const price = getPrice(item.productId);
        console.log(price);
        const shippingPrice = getShippingPrice(item.productId);
        console.log(shippingPrice);
        totalPrice += price + shippingPrice;
        console.log(totalPrice);
      });
    }
    return totalPrice;
  };

  const calculateTotalItems = () => {
    const totalItems = items.reduce(
      (acc, item) => acc + Number(item.quantity),
      0
    );
    setTotalItems(totalItems);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const handlePaymentsChange = (event) => {
    setSelectedPayments(event.target.value);
  };


  //#region Get From Product
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
    return listing ? listing.price : '';
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
    return listing ? listing.shippingPrice : '';
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


//#endregion
  
return (
    <>
      <Meta title={'Checkout'}></Meta>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3>Shipping</h3>
          </div>
          <div className="col-12 col-md-6 mt-1">
            <select
              name="address"
              className="form-control form-select"
              id={userId}
              value={selectedAddress}
              onChange={handleAddressChange}
            >
              <option value="">Select Address</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                   ({address.address1}, {address.city}), {address.firstName} {address.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <div className="col-12 text-center">
            <h3>Payment</h3>
          </div>
          <div className="col-12 col-md-6 mt-1 mb-5">
          <select
              name="payments"
              className="form-control form-select"
              id={userId}
              value={selectedPayments}
              onChange={handlePaymentsChange}
            >
              <option value="">Select Payment</option>
              {payments.map((payments) => (
                <option key={payments.id} value={payments.id}>
                  **** **** **** {payments.cardNumber.slice(-4)}
                </option>
              ))}
            </select>
          </div>
        </div>
        {items.map((item) => (
          <section key={item.name}>
            <div className="container mt-3 border border-2 mb-4" style={{ backgroundColor: "#f0ecec" }}>
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img src={`data:image/${getImageExtension(getimage(item.productId))};base64,${getimage(item.productId)}`} className="w-80 justify-content-center" alt={item.name} />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <h5>Product Name:</h5>
                  <h7>{getProductName(item.productId)}</h7>
                </div>
                <div className="col-md-3">
                  <h5>Quantity:</h5>
                  <h7>{item.quantity}</h7>
                </div>
                <div className="col-md-3 mb-3">
                  <h5>Total Product Price:</h5>
                  <h7>${getPrice(item.productId)} + ${getShippingPrice(item.productId)}</h7>
                </div>
              </div>
            </div>
          </section>
        ))}
        <div className="container mb-5">
          <hr />
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <h4 className="" style={{ paddingLeft: "190px" }}>
                Total items: {totalItems}
              </h4>
            </div>
            <div className="col">
              <h4 className="" style={{ paddingLeft: "110px" }}>
                Total Price: $ {calculateTotalPrice(items)}
              </h4>
            </div>
          </div>
        </div>
        <div className="row mb-5 justify-content-end">
          <button className="btn btn-primary btn-block w-10" onClick={buyNow}>Buy</button>
        </div> 
      </div>
    </>
  );
}

export default Checkout;