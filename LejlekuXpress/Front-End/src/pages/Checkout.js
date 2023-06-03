import React, { useState, useEffect } from "react";
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';

const items = [
  {
    name: "Iphone 14",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "1000",
  },
  {
    name: "Iphone 3g",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "100",
  },
  {
    name: "Nokia",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "800",
  },
];

function Checkout() {
  const { userId } = useAuthToken();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAddresses();
    calculateTotalPrice();
    calculateTotalItems();
  }, [userId]);


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

  const calculateTotalPrice = () => {
    const totalPrice = items.reduce(
      (acc, item) => acc + Number(item.price),
      0
    );
    setTotalPrice(totalPrice);
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
                  {address.address1}, {address.city}
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
            <select name="" className="form-control form-select" id="">
              <option value="" selected disabled>
                Select Payment
              </option>
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
                      <img src={item.imageSrc} className="w-80 justify-content-center" alt={item.name} />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <h5>Product Name:</h5>
                  <h7>{item.name}</h7>
                </div>
                <div className="col-md-3">
                  <h5>Quantity:</h5>
                  <h7>{item.quantity}</h7>
                </div>
                <div className="col-md-3">
                  <h5>Product Price:</h5>
                  <h7>${item.price}</h7>
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
                Total Price: ${totalPrice}
              </h4>
            </div>
          </div>
        </div>
        <div className="row mb-5 justify-content-end">
        <Link to="/checkout" className="btn btn-primary btn-block w-10 ">
            Buy
        </Link>
        </div> 
      </div>
    </>
  );
}

export default Checkout;
