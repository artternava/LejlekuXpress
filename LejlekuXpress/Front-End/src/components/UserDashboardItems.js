import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
  MDBCardTitle
  } from "mdb-react-ui-kit";

function PersonalInfo() {
    return (
    <div className="container-userdashboard-tabs">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" src="https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="user profile" width="150px"/>
              <span className="font-weight-bold">First name</span>
              <span className="text-black-50">firstname@provider.com</span>
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
                    <label htmlFor="firstName" className="labels">First Name</label>
                    <input type="text" id="firstName" className="form-control" placeholder="first name" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastName" className="labels">Last Name</label>
                    <input type="text" id="lastName" className="form-control"  placeholder="last name" />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="labels">Phone Number</label>
                    <div className="input-group">
                      <select className="form-control" id="countryCode">
                        <option value="">Select Country</option>
                        <option value="1">USA (+1)</option>
                        <option value="44">UK (+44)</option>
                        <option value="33">France (+33)</option>
                      </select>
                      <input type="text" className="form-control" id="phoneNumber" placeholder="Phone Number" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="email" className="labels">Email</label>
                    <input type="text" id="email" className="form-control" placeholder="Email"  />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="button border-0" type="button">Save Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};      

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
                                    <button className="button border-0" type="button" onClick={toggleAddressForm}>Save Address</button>
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
                                    <button className="button border-0" type="button" onClick={toggleAddressForm}>Save Payment</button>
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

export { PersonalInfo, ShippingInfo, PaymentDetails, MyOrders, MyListings };

