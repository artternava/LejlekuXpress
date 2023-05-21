import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
  MDBCardImage,
  MDBCardTitle
  } from "mdb-react-ui-kit";
  import axios from 'axios';
  import useAuthToken from './useAuthToken.js';

  //#region PersonalInfo
  function PersonalInfo() {
    const { userId } = useAuthToken();
    const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      countryCode: '',
    });
    const [countryData, setCountryData] = useState([]);
    const [formErrors, setFormErrors] = useState({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
      countryCode: false,
    });
  
    useEffect(() => {
      if (userId) {
        fetchUserDetails();
      }
    }, [userId]);
  
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:39450/api/User/get?id=${userId}`);
        if (response.status === 200) {
          const userData = response.data;
          const phoneNumberParts = userData.phoneNumber.split('-');
          const countryCode = phoneNumberParts[0].substring(1);
          const phoneNumber = phoneNumberParts[1];
  
          setUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: phoneNumber,
            countryCode: countryCode,
          });
        } else {
          console.error('Failed to fetch user details');
        }
  
        const countryResponse = await axios.get('http://localhost:39450/api/Country/getall');
        if (countryResponse.status === 200) {
          const countryData = countryResponse.data;
          setCountryData(countryData);
        } else {
          console.error('Failed to fetch country data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user details or country data', error);
      }
    }
  
    async function updateUserDetails() {
      try {
        const { firstName, lastName, email, phoneNumber, countryCode } = user;
  
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
          setFormErrors({
            firstName: firstName ==='',
            lastName: lastName === '',
            email: email === '',
          });
          console.error('Please fill in all required fields');
          return; 
        }
        if (phoneNumber.trim() !== '' && countryCode.trim() === ''){
          setFormErrors({
            countryCode: countryCode === '',
          })
          return;
        };

        if (countryCode.trim() !== '' && phoneNumber.trim() === ''){
          setFormErrors({
            phoneNumber: phoneNumber === '',
          })
          return;
        };

        const formattedPhoneNumber = countryCode && phoneNumber ? `+${countryCode}-${phoneNumber}` : '';
  
        const response = await axios.put(`http://localhost:39450/api/User/update?id=${userId}`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: formattedPhoneNumber,
          profilePicture: null,
        });
        if (response.status === 200) {
          window.alert('Profile saved successfully');
          console.log('User details updated successfully');
        } else {
          console.error('Failed to update user details');
        }
      } catch (error) {
        console.error('An error occurred while updating user details', error);
      }
    }
  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
      setFormErrors({ ...formErrors, [name]: false });
    }
  
    return (
      <div className="container-userdashboard-tabs">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  src="https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                  alt="user profile"
                  width="150px"
                />
                <span className="font-weight-bold">{user.firstName}</span>
                <span className="text-black-50">{user.email}</span>
              </div>
            </div>
            <div className="col-md-8 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="labels">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                        placeholder="first name"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.firstName && <div className="invalid-feedback">First name is required.</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="labels">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                        placeholder="last name"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.lastName && <div className="invalid-feedback">Last name is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="labels">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <select
                          className={`form-control ${formErrors.countryCode ? 'is-invalid' : ''}`}
                          id="countryCode"
                          name="countryCode"
                          value={user.countryCode}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Country</option>
                          {countryData.map((country) => (
                            <option key={country.code} value={country.phoneCode}>
                              {country.niceName} (+{country.phoneCode})
                            </option>
                          ))}
                        </select>
                        
                        <input
                          type="text"
                          className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                          id="phoneNumber"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={user.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.countryCode && <div className="invalid-feedback">Country code is required.</div>}
                      {formErrors.phoneNumber && <div className="invalid-feedback">Phone number is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email" className="labels">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && <div className="invalid-feedback">Email is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary me-2" type="button" onClick={updateUserDetails}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );    
  }
//#endregion


function ShippingInfo() {

        const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);

        const toggleAddressForm = () => {
        setIsAddAddressVisible(!isAddAddressVisible);    
        };
        const addresses = [  {
          firstName: "John",    
          lastName: "Doe",  
          phoneNum: "+1-212-418-1234",  
          address: "Central Park",    
          city: "New York City",    
          state: "New York",    
          country: "USA",    
          zipCode: "10019"
        },
        {
          firstName: "Filan",    
          lastName: "Fisteku",  
          phoneNum: "+383-44-182-508",  
          address: "Rruga Vllezerit Gervalla",    
          city: "Prishtine",    
          state: "",    
          country: "Kosovo",    
          zipCode: "10000"
        }];
        return (
            <div id="shippingInfo">
            <div id="addressList" style={{ display: isAddAddressVisible ? 'none' : 'block' }}>              
            <div className="container-userdashboard-tabs">
            <div className="d-flex justify-content-between align-items-center" 
            style={{padding: "10px", width: "90%", backgroundColor: "#fff", margin: "auto", borderRadius: "10px", }}>
                <h1 style={{fontSize: "35px", fontWeight: "400", padding: "5px"}}>Addresses</h1>
              <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm} >Add Address</button>
              </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row" style={{backgroundColor: '#bdbdbd'}}>
                <div className="col-md-12">
                    <div className="grid-container">
                    {addresses.map((address, index) => (
            <div className="grid-item p-3 py-5" id="edit-address">
            <div className="d-flex justify-content-between align-items-center mb-3 my-3 flex-wrap">
                <div className="d-flex align-items-center">
                <i class="bi bi-person-fill me-2"></i>
                <h6 className="text-right w-100">{address.firstName} {address.lastName} - {address.phoneNum}</h6>
                </div>
                <div className="d-flex align-items-start">
                <i class="bi bi-geo-alt-fill me-2"></i>
                <div>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state}, {address.country}</p>
                    <p>{address.zipCode}</p>
                </div>
                </div>
                <div className="w-100">
                <div className="row mt-2">
                    <div className="col-md-12">
                    <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm}>Edit</button>
                    <button className="btn btn-danger me-2" type="button">Delete</button>
                    <button className="btn btn-success" type="button">Make Default</button>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div
                id="add-edit-address"
                style={{ display: isAddAddressVisible ? 'block' : 'none' }}
                className="container-userdashboard-tabs"
            >
            <div className="container-userdashboard-tabs">
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Address</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="firstName" className="labels">First Name</label>
                                            <input type="text" id="firstName" className="form-control" placeholder="First Name"  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="labels">Last Name</label>
                                            <input type="text" id="lastName" className="form-control"  placeholder="Last Name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="country" className="labels">Country</label>
                                            <select className="form-control" id="country">
                                                <option value="">Select Country</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                                <option value="France">France</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="state" className="labels">State</label>
                                            <input type="text" id="state" className="form-control"  placeholder="State" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="city" className="labels">City</label>
                                        <input type="text" id="city" className="form-control" placeholder="City"  />
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="zipcode" className="labels">Zip Code</label>
                                        <input type="text" id="zipcode" className="form-control"  placeholder="Zip Code" />
                                    </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="address1" className="labels">Address 1</label>
                                            <input type="text" id="address1" className="form-control" placeholder="Address 1"  />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="address2" className="labels">Address 2</label>
                                            <input type="text" id="address2" className="form-control" placeholder="Address 2"  />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary" type="button" onClick={toggleAddressForm}>Save Address</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }

    function PaymentDetails() {
        const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);

        const toggleAddressForm = () => {
        setIsAddAddressVisible(!isAddAddressVisible);
        };

        const payments = [  {
          last4: "8080",    
        }];
        return (
            <div id="shippingInfo">
            <div id="addressList" style={{ display: isAddAddressVisible ? 'none' : 'block' }}>
            <div className="container-userdashboard-tabs">
            <div className="d-flex justify-content-between align-items-center" 
            style={{padding: "10px", width: "90%", backgroundColor: "#fff", margin: "auto", borderRadius: "10px", }}>
                <h1 style={{fontSize: "35px", fontWeight: "400", padding: "5px"}}>Payment Methods</h1>
              <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm} >Add Payment</button>
              </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row" style={{backgroundColor: '#bdbdbd'}}>
                <div className="col-md-12">
                    <div className="grid-container">
                    {payments.map((payment, index) => (
            <div className="grid-item p-3 py-5" id="edit-address">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">{payment.last4}*</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
              <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm}>Edit</button>
                    <button className="btn btn-danger me-2" type="button">Delete</button>
                    <button className="btn btn-success" type="button">Make Default</button>
                </div>
            </div>
          </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div
                id="add-edit-address"
                style={{ display: isAddAddressVisible ? 'block' : 'none' }}
                className="container-userdashboard-tabs">
            <div className="container-userdashboard-tabs">
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Payment</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="firstName" className="labels">Card Holder First Name</label>
                                            <input type="text" id="firstName" className="form-control" placeholder="First Name"  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="labels">Card Holder Last Name</label>
                                            <input type="text" id="lastName" className="form-control" placeholder="Last Name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label htmlFor="CardNumber" className="labels">Card Number</label>
                                    <input type="text" id="CardNumber" className="form-control w-100" value="" placeholder="Card Number" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="expDate" className="labels">Expiration Date</label>
                                        <input type="text" id="expDate" className="form-control" placeholder="MM/YY" />
                                    </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="CVV" className="labels">CVV</label>
                                        <input type="text" id="CVV" className="form-control" placeholder="CVV" />
                                    </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary" type="button" onClick={toggleAddressForm}>Save Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }
    const orders = [  {
          invoiceNumber: "#Y34XDHR",    
          expectedArrival: "01/12/19",    
          trackingNumber: "234094567242423422898",    
          imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
          productName: "Iphone 14",    
          capacity: "64gb",    
          color: "Blue",    
          price: "$1000"  },  
          {    
            invoiceNumber: "#Z56VBFE",    
            expectedArrival: "05/06/19",    
            trackingNumber: "234094567242423422899",    
            imageSrc: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",    
            productName: "Airpods pro 2",    
            capacity: "-",    
            color: "White",    
            price: "$200"  },  
            {    
              invoiceNumber: "#A12RTGS",    
              expectedArrival: "07/08/19",    
              trackingNumber: "234094567242423422900",    
              imageSrc: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481",    
              productName: "MacBook Pro",    
              capacity: "1tb",    
              color: "Space Gray",    
              price: "$3750"  }];

      function MyOrders() {
        
        return (
          <>
            {orders.map((order) => (
              <section className="" style={{ backgroundColor: "#bdbdbd" }}>
                <MDBContainer className="py-5 h-100">
                  <MDBRow className="justify-content-center align-items-start h-100">
                    <MDBCol size="12">
                      <MDBCard
                        className="card-stepper text-black"
                        style={{ borderRadius: "16px" }}
                      >
                        <MDBCardBody className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                              <MDBTypography tag="h5" className="mb-0">
                                INVOICE{" "}
                                <span className="text-primary font-weight-bold">
                                  {order.invoiceNumber}
                                </span>
                              </MDBTypography>
                              <div className="ml-3 d-flex justify-content-between w-100" style={{ marginTop: "10%"}}>
                                <React.Fragment key={order.invoiceNumber}>
                                  <img src={order.imageSrc} alt="product-image" style={{ maxWidth: "50px", marginRight: "5%" }}/>
                                  <p style={{ marginRight: "30%" }}>{order.productName}</p>
                                  <p style={{ marginRight: "30%" }}>{order.capacity ? `Capacity: ${order.capacity}` : ""}</p>
                                  <p style={{ marginRight: "80%" }}>{order.color ? `Color: ${order.color}` : ""}</p>
                                  <h5>{order.price}</h5>
                                </React.Fragment>
                            </div>
                            </div>
                            <div className="text-end">
                              <p className="mb-0">
                                Expected Arrival <span>{order.expectedArrival}</span>
                              </p>
                              <p className="mb-0">
                                USPS{" "}
                                <span className="font-weight-bold">
                                  {order.trackingNumber}
                                </span>
                              </p>
                            </div>
                          </div>
                          <ul
                            id="progressbar-2"
                            className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                          >
                            <li className="step0 active text-center" id="step1"></li>
                            <li className="step0 active text-center" id="step2"></li>
                            <li className="step0 active text-center" id="step3"></li>
                            <li className="step0 text-muted text-end" id="step4"></li>
                          </ul>
      
                          <div className="d-flex justify-content-between">
                            <div className="d-lg-flex align-items-center">
                              <i class="bi bi-file-text fs-1 icon-spacing"></i>
                              <div>
                                <p className="fw-bold mb-1">Order</p>
                                <p className="fw-bold mb-0">Processed</p>
                              </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                              <i class="bi bi-box-seam-fill fs-1 icon-spacing"></i>
                              <div>
                                <p className="fw-bold mb-1">Order</p>
                                <p className="fw-bold mb-0">Shipped</p>
                              </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                              <i class="bi bi-truck fs-1 icon-spacing"></i>
                              <div>
                                <p className="fw-bold mb-1">Order</p>
                                <p className="fw-bold mb-0">En Route</p>
                              </div>
                            </div>
                            <div class="d-lg-flex align-items-center">
                              <i class="bi bi-house-fill fs-1 icon-spacing"></i>
                              <div>
                                <p className="fw-bold mb-1">Order</p>
                                <p className="fw-bold mb-0">Arrived</p>
                              </div>
                            </div>
                          </div>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </section>
              ))}
            </>
          );          
    }

    function MyListings() {
      const [isAddListingVisible, setIsListingVisible] = useState(false);

        const toggleListingForm = () => {
          setIsListingVisible(!isAddListingVisible);    
        };
        const listings = [  {
          id: "12",    
          dateCreated: "02/05/2023   13:41",  
          image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp",  
          title: "Apple IMac",    
          description: "M2, 27-Inch Retina Display, 32GB Memory, 1TB Storage",    
          orders: "79",    
          qty: "21",    
          price: "7,197.00",
          status: "Approved"
        },
        {
          id: "34",    
          dateCreated: "04/05/2023   19:30",  
          image: "https://media.istockphoto.com/id/496730484/photo/apple-watch-sport-42mm-silver-aluminum-case-with-white-band.jpg?s=612x612&w=0&k=20&c=RY2MGp4S-OVqAZm1ZCUDhM6KSmfAJ02RU51l4mJa2EA=",  
          title: "Apple Watch",    
          description: "M2, 27-Inch Retina Display, 32GB Memory, 1TB Storage",    
          orders: "58",    
          qty: "42",    
          price: "427.00",
          status: "Pending"
        }];

        return (
            <div id="shippingInfo">
            <div id="addressList" style={{ display: isAddListingVisible ? 'none' : 'block' }}>              
            <div className="container-userdashboard-tabs">
            <div className="d-flex justify-content-between align-items-center" 
            style={{padding: "10px", width: "90%", backgroundColor: "#fff", margin: "auto", borderRadius: "10px", }}>
                <h1 style={{fontSize: "35px", fontWeight: "400", padding: "5px"}}>Listings</h1>
              <button className="btn btn-primary me-2" type="button" onClick={toggleListingForm} >Add Listing</button>
              </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row" style={{backgroundColor: '#bdbdbd'}}>
                <div className="col-md-12">
                    <div className="grid-container">
                    {listings.map((listing, index) => (
                          <MDBCard className="text-black">
                          <div className="d-flex justify-content-between" style={{ width: "100%", padding: "15px"}}>
                              <p>#{listing.id}</p>
                              <p style={{ color: "#9A9A9A"}}>{listing.dateCreated}</p>
                          </div>
                          <div className="d-flex justify-content-between" style={{paddingLeft: "15px"}}>
                            <p>Status: {listing.status}</p>
                          </div>
                            <MDBCardImage
                              src={listing.image}
                              position="top"
                              alt="Apple Computer"
                              style={{maxHeight: "250px", objectFit: "cover"}}
                            />
                            <MDBCardBody>
                              <div className="text-center">
                                <MDBCardTitle>{listing.title}</MDBCardTitle>
                                <p style={{ color: "#9A9A9A"}}>{listing.description}</p>
                              </div>
                              <div>
                                <div className="d-flex justify-content-between">
                                  <span>Orders</span>
                                  <span>{listing.orders}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>QTY</span>
                                  <span>{listing.qty}</span>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                <span>Total</span>
                                <span>${listing.price}</span>
                              </div>
                              <div className="d-flex justify-content-center">
                              <button className="btn btn-primary me-2" type="button" onClick={toggleListingForm}>Edit</button>
                              <button className="btn btn-success me-2" type="button" onClick={toggleListingForm}>Details</button>
                              <button className="btn btn-danger me-2" type="button">Delete</button>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div
                id="add-edit-address"
                style={{ display: isAddListingVisible ? 'block' : 'none' }}
                className="container-userdashboard-tabs"
            >
            <div className="container-userdashboard-tabs">
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="p-3 py-5">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Listing Details</h4>
                          </div>
                          
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="productName" className="labels">Product Name</label>
                                <input type="text" id="productName" className="form-control" placeholder="Product Name" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="productQuantity" className="labels">Quantity</label>
                                <input type="number" id="productQuantity" className="form-control"  placeholder="Quantity" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="productOptions" className="labels">Options</label>
                                <div className="row">
                                  <div className="col-6">
                                    <input type="text" id="optionName" className="form-control" placeholder="Option Name" />
                                  </div>
                                  <div className="col-6">
                                    <input type="file" id="optionImage" className="form-control" />
                                  </div>
                                </div>
                                <button className="btn btn-secondary mt-3">Add Option</button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="productImages" className="labels">Images</label>
                                <input type="file" id="productImages" className="form-control" multiple />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="productDescription" className="labels">Description</label>
                                <textarea id="productDescription" className="form-control" placeholder="Product Description" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 text-center">
                            <button className="btn btn-success" type="button" onClick={toggleListingForm}>Save Listing</button>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );    
  }
 // #region ChangePassword
  function ChangePassword() {
    const { userId } = useAuthToken();
    const [showPassword, setShowPassword] = useState(false);
    const [changePassword, setChangePassword] = useState({
      OldPassword: '',
      NewPassword: '',
      ConfirmPassword: '',
    });
  
    const [formErrors, setFormErrors] = useState({
      OldPassword: false,
      NewPassword: false,
      ConfirmPassword: false,
    });
  
    const handleShowPasswordChange = () => {
      setShowPassword(!showPassword);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setChangePassword((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    };
  
    
const handleChangePassword = (event) => {
  event.preventDefault();
  const { OldPassword, NewPassword, ConfirmPassword } = changePassword;

  if (OldPassword === '' || NewPassword === '' || ConfirmPassword === '') {
    setFormErrors({
      OldPassword: OldPassword === '',
      NewPassword: NewPassword === '',
      ConfirmPassword: ConfirmPassword === '',
    });
    return;
  }

  if (NewPassword !== ConfirmPassword) {
    setFormErrors((prevState) => ({
      ...prevState,
      ConfirmPassword: true,
    }));
    return;
  }

  const requestBody = {
    oldPassword: OldPassword,
    newPassword: NewPassword,
  };

  axios
    .post(`http://localhost:39450/api/Auth/changepassword?id=${userId}`, requestBody)
    .then((response) => {
      console.log('Password changed successfully', response.data);
      window.location.href = '/userdashboard';
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setFormErrors((prevState) => ({
          ...prevState,
          OldPassword: true,
        }));
        console.error('Old password is incorrect');
      } else {
        console.error('Password change failed', error);
      }
    });
};
  
    return (
      <div className="container-userdashboard-tabs">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-12 border-right">
              <div className="p-3 py-5">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="oldPassword" className="labels"> Old Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="OldPassword"
                        placeholder="Old Password"
                        className={`form-control ${formErrors.OldPassword ? 'is-invalid' : ''}`}
                        value={changePassword.OldPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.OldPassword && changePassword.OldPassword === '' && (<div className="invalid-feedback">Old password is required</div>)}
                      {formErrors.OldPassword && changePassword.OldPassword !== '' && (<div className="invalid-feedback">Old password is incorrect</div>)}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="newPassword" className="labels"> New Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="NewPassword"
                        placeholder="New Password"
                        className={`form-control ${formErrors.NewPassword ? 'is-invalid' : ''}`}
                        value={changePassword.NewPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.NewPassword && <div className="invalid-feedback">New Password is required</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="labels"> Confirm New Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="ConfirmPassword"
                        placeholder="Confirm New Password"
                        className={`form-control ${formErrors.ConfirmPassword ? 'is-invalid' : ''}`}
                        value={changePassword.ConfirmPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.ConfirmPassword && changePassword.ConfirmPassword === '' && (<div className="invalid-feedback">Please Confirm your New Password</div>)}
                      {formErrors.ConfirmPassword && changePassword.ConfirmPassword !== '' && (<div className="invalid-feedback">Passwords do NOT match</div>)}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        checked={showPassword}
                        onChange={handleShowPasswordChange}
                      />
                      <label className="form-check-label" htmlFor="showPassword"> Show Password </label>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary me-2" type="button" onClick={handleChangePassword}> Change Password </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

//#endregion

//#region BillingInformation

function BillingInformation() {
  const { userId } = useAuthToken();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [billingInfo, setBillingInfo] = useState({
    cardHolderFirstName: '',
    cardHolderLastName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address1: '',
    address2: '',
  })
  const [formErrors, setFormErrors] = useState({
    cardHolderFirstName: false,
    cardHolderLastName: false,
    cardNumber: false,
    expirationDate: false,
    cvv: false,
    firstName: false,
    lastName: false,
    country: false,
    state: false,
    city: false,
    zipCode: false,
    address1: false,
    address2: false,
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/Country/getall');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSave = () => {
    const {
      cardHolderFirstName,
      cardHolderLastName,
      cardNumber,
      expirationDate,
      cvv,
      firstName,
      lastName,
      country,
      state,
      city,
      zipCode,
      address1,
    } = billingInfo;
  
    if (
      cardHolderFirstName.trim() === '' ||
      cardHolderLastName.trim() === '' ||
      cardNumber.trim() === '' ||
      expirationDate.trim() === '' ||
      cvv.trim() === '' ||
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      country.trim() === '' ||
      city.trim() === '' ||
      zipCode.trim() === '' ||
      address1.trim() === ''
    ) {
      setFormErrors({
        cardHolderFirstName: cardHolderFirstName.trim() === '',
        cardHolderLastName: cardHolderLastName.trim() === '',
        cardNumber: cardNumber.trim() === '',
        expirationDate: expirationDate.trim() === '',
        cvv: cvv.trim() === '',
        firstName: firstName.trim() === '',
        lastName: lastName.trim() === '',
        country: country.trim() === '',
        city: city.trim() === '',
        zipCode: zipCode.trim() === '',
        address1: address1.trim() === '',
      });
      return;
    }
  };

  return (
    <div className="container-userdashboard-tabs">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="p-4">
            <div id="paymentDetails">
            <h4>Billing Information</h4>
              <p>Your billing information is essential for processing payments and ensuring accurate transactions. Please provide your billing details to facilitate seamless transactions and avoid any delays or complications.</p> 
              <h4>Payment Details</h4>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="cardHolderFirstName">Card Holder First Name</label>
                  <input 
                    type="text" 
                    id="cardHolderFirstName" 
                    className={`form-control ${formErrors.cardHolderFirstName ? 'is-invalid' : ''}`} 
                    placeholder="First Name" 
                    onChange={handleInputChange}/>
                  {formErrors.cardHolderFirstName && <div className="invalid-feedback">Card Holder First Name is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="cardHolderLastName">Card Holder Last Name</label>
                  <input 
                    type="text" 
                    id="cardHolderLastName" 
                    className={`form-control ${formErrors.cardHolderLastName ? 'is-invalid' : ''}`} 
                    placeholder="Last Name" 
                    onChange={handleInputChange}/>
                  {formErrors.cardHolderLastName && <div className="invalid-feedback">Card Holder Last Name is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
              <div className="col">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`}
                    placeholder="Card Number" 
                    onChange={handleInputChange}/>
                  {formErrors.cardNumber && <div className="invalid-feedback">Card Number is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
                
                <div className="col">
                  <label htmlFor="expirationDate">Expiration Date</label>
                  <input 
                    type="text" 
                    id="expirationDate" 
                    className={`form-control ${formErrors.expirationDate ? 'is-invalid' : ''}`}
                    placeholder="MM/YY" 
                    onChange={handleInputChange}/>
                  {formErrors.expirationDate && <div className="invalid-feedback">Expiration Date is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="cvv">CVV</label>
                  <input 
                    type="text" 
                    id="cvv" 
                    className={`form-control ${formErrors.cvv ? 'is-invalid' : ''}`}
                    placeholder="CVV" 
                    onChange={handleInputChange}/>
                  {formErrors.cvv && <div className="invalid-feedback">CVV is required.</div>}
                </div>
              </div>
            </div>
            <div id="billingAddress">
              <h4>Billing Address</h4>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="billingFirstName">First Name</label>
                  <input 
                    type="text" 
                    id="billingFirstName" 
                    className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                    placeholder="First Name" 
                    onChange={handleInputChange}/>
                  {formErrors.firstName && <div className="invalid-feedback">First name is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="billingLastName">Last Name</label>
                  <input 
                    type="text" 
                    id="billingLastName" 
                    className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Last Name" 
                    onChange={handleInputChange}/>
                  {formErrors.lastName && <div className="invalid-feedback">Last name is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="billingCountry">Country</label>
                  <select 
                    className={`form-control ${formErrors.country ? 'is-invalid' : ''}`} 
                    id="billingCountry" 
                    value={selectedCountry} 
                    onChange={handleCountryChange} >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.Id} value={country.Id}>{country.niceName}</option>
                    ))}
                  </select>
                  {formErrors.country && <div className="invalid-feedback">Country is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="billingState">State</label>
                  <input 
                    type="text" 
                    id="billingState" 
                    className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                    placeholder="State" 
                    onChange={handleInputChange}/>
                </div>
                <div className="col">
                  <label htmlFor="billingCity">City</label>
                  <input 
                    type="text" 
                    id="billingCity" 
                    className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                    placeholder="City" 
                    onChange={handleInputChange}/>
                  {formErrors.city && <div className="invalid-feedback">City is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="billingZipCode">Zip Code</label>
                  <input 
                    type="text" 
                    id="billingZipCode" 
                    className={`form-control ${formErrors.zipCode ? 'is-invalid' : ''}`}
                    placeholder="Zip Code" 
                    onChange={handleInputChange}/>
                  {formErrors.zipCode && <div className="invalid-feedback">Zip Code is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="billingAddress1">Address 1</label>
                  <input 
                    type="text" 
                    id="billingAddress1" 
                    className={`form-control ${formErrors.address1 ? 'is-invalid' : ''}`} 
                    placeholder="Address 1" 
                    onChange={handleInputChange}/>
                  {formErrors.address1 && <div className="invalid-feedback">An Address is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="billingAddress2">Address 2</label>
                  <input 
                    type="text" 
                    id="billingAddress2" 
                    className={`form-control ${formErrors.address2 ? 'is-invalid' : ''}`}
                    placeholder="Address 2" 
                    onChange={handleInputChange}/>
                </div>
              </div>
              <div className="d-flex justify-content-center ">
                <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//#endregion

//#region TaxInformation


function TaxInformation() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [taxInfo, setTaxInfo] = useState({
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address1: '',
    address2: '',
    socialSecurityNumber: '',
  });
  const [formErrors, setFormErrors] = useState({
    country: false,
    state: false,
    city: false,
    zipCode: false,
    address1: false,
    socialSecurityNumber: false,
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/Country/getall');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaxInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSave = () => {
    const { country, state, city, zipCode, address1, socialSecurityNumber } = taxInfo;

    if (
      country.trim() === '' ||
      state.trim() === '' ||
      city.trim() === '' ||
      zipCode.trim() === '' ||
      address1.trim() === '' ||
      socialSecurityNumber.trim() === ''
    ) {
      setFormErrors({
        country: country.trim() === '',
        state: state.trim() === '',
        city: city.trim() === '',
        zipCode: zipCode.trim() === '',
        address1: address1.trim() === '',
        socialSecurityNumber: socialSecurityNumber.trim() === '',
      });
      return;
    }

    // Save the tax information
    // Add your logic here to handle the save operation
  };

  return (
    <div className="container-userdashboard-tabs">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="p-4">
            <div id="taxInformation">
              <h4>Tax Information</h4>
              <p>This information is required in order to confirm if you are a U.S. or non-U.S. taxpayer and whether or not LejlekuXPress is required to withhold taxes from your earnings. Add your tax information now to avoid delays in getting paid.</p>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="taxCountry">Country</label>
                  <select
                    className={`form-control ${formErrors.country ? 'is-invalid' : ''}`}
                    id="taxCountry"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.Id} value={country.Id}>{country.niceName}</option>
                    ))}
                  </select>
                  {formErrors.country && <div className="invalid-feedback">Country is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="taxState">State</label>
                  <input
                    type="text"
                    id="taxState"
                    className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                    placeholder="State"
                    onChange={handleInputChange}
                  />
                  {formErrors.state && <div className="invalid-feedback">State is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="taxCity">City</label>
                  <input
                    type="text"
                    id="taxCity"
                    className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                    placeholder="City"
                    onChange={handleInputChange}
                  />
                  {formErrors.city && <div className="invalid-feedback">City is required.</div>}
                </div>
              </div>
              <div className="form-group row mb-3">
                <div className="col">
                  <label htmlFor="taxZipCode">Zip Code</label>
                  <input
                    type="text"
                    id="taxZipCode"
                    className={`form-control ${formErrors.zipCode ? 'is-invalid' : ''}`}
                    placeholder="Zip Code"
                    onChange={handleInputChange}
                  />
                  {formErrors.zipCode && <div className="invalid-feedback">Zip Code is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="taxAddress1">Address 1</label>
                  <input
                    type="text"
                    id="taxAddress1"
                    className={`form-control ${formErrors.address1 ? 'is-invalid' : ''}`}
                    placeholder="Address 1"
                    onChange={handleInputChange}
                  />
                  {formErrors.address1 && <div className="invalid-feedback">Address 1 is required.</div>}
                </div>
                <div className="col">
                  <label htmlFor="taxAddress2">Address 2</label>
                  <input
                    type="text"
                    id="taxAddress2"
                    className="form-control"
                    placeholder="Address 2"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="taxSSN">Social Security Number (Tax Payer Number)</label>
                <input
                  type="text"
                  id="taxSSN"
                  className={`form-control ${formErrors.socialSecurityNumber ? 'is-invalid' : ''}`}
                  placeholder="Social Security Number"
                  onChange={handleInputChange}
                />
                {formErrors.socialSecurityNumber && <div className="invalid-feedback">Social Security Number is required.</div>}
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//#endregion

export { PersonalInfo, ShippingInfo, PaymentDetails, MyOrders, MyListings, ChangePassword, BillingInformation, TaxInformation };

