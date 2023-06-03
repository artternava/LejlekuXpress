import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
const items = [  {   
    name: "Iphone 14",
    
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
    specification: ["Option 1", "Option 2", "Option 3"],
    color:"Blue",
    description: "lorem ipsum",
    price: "1000", },  
    {   
      name: "Iphone 3g",
      quantity: 1,
      imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
      specification: ["Option 1", "Option 2", "Option 3"],
      color:"Red",
      description: "lorem ipsum",
      price: "100", },  
      {   
        name: "Nokia",
        quantity: 1,
        imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
        specification: ["Option 1", "Option 2", "Option 3"],
        color:"Green",
        description: "lorem ipsum",
        price: "800", }];



       
  
        function Cart() {
          const [totalPrice, setTotalPrice] = useState(0);

          useEffect(() => {  
            calculateTotalPrice(); 
          });



          const calculateTotalPrice = () => {
            const totalPrice = items.reduce(
              (acc, item) => acc + Number(item.price),
              0
            );
            setTotalPrice(totalPrice);
          };

          const handleQuantityChange = (index, value) => {
            const updatedItems = [...items];
            updatedItems[index].quantity += value;
            calculateTotalPrice();
          
          };


            return (
              <>
                <div class="d-flex mt-5">
                  <div class="container py-2">
                    <div class="row justify-content-between">
                      <div class="col-md-9">
                        {items.map((item) => (
                          <div class="card mb-4">
                            <div class="card-header py-3">
                              <h5 class="mb-0">{item.name}</h5>
                            </div>
                            <div class="card-body">
                              {/* <!-- Single item --> */}
                              <div class="row">
                                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                  {/* <!-- Image --> */}
                                  <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                    <img src={item.imageSrc} class="w-100" alt="Blue Jeans Jacket" />
                                    <a href="#!">
                                      <div class="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                    </a>
                                  </div>
                                  {/* <!-- Image --> */}
                                </div>
          
                                <div class="col-lg-5 col-md-6 mb-lg-0 mt-5">
                                  {/* <!-- Data --> */}
                                  <p><strong>{item.name}</strong></p>
                                  <p>Color: {item.color}</p>
                                  <p>Description: {item.description}</p>
                                  <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
                                    <i class="bi bi-trash-fill"></i>
                                  </button>
                                  <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list">
                                    <i class="bi bi-heart-fill"></i>
                                  </button>
                                  {/* <!-- Data --> */}
                                </div>
          
                                <div class="col-lg-4 col-md-6 mb-lg-0 d-flex align-items-center justify-content-center vh-10">
                                  {/* <!-- Quantity --> */}
                                  <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                  <div className="mt-5" style={{ maxWidth: "150px" }}>
                                    <button
                                      className="btn btn-primary px-3 me-2"
                                      onClick={() => handleQuantityChange(-1)}
                                    >
                                      <i className="bi bi-dash"></i>
                                    </button>
                                  </div>
                                  <div className="form-outline text-md-center">
                                    <input
                                      id="form1"
                                      min="0"
                                      name="quantity"
                                      value={item.quantity}
                                      type="number"
                                      className="form-control text-center mt-5"
                                      onChange={(e) => handleQuantityChange(e.target.value)}
                                    />
                                    <label htmlFor="form1" className="">
                                      Quantity
                                    </label>
                                    <p className="mt-3">
                                      <strong>${item.price}</strong>
                                    </p>
                                  </div>
                                  <div className="mt-5" style={{ maxWidth: "150px" }}>
                                    <button
                                      className="btn btn-primary px-3 ms-2"
                                      onClick={() => handleQuantityChange(1)}
                                    >
                                      <i className="bi bi-plus"></i>
                                    </button>
                                  </div>
                                </div>
                                  {/* <!-- Quantity --> */}
                                </div>
                              </div>
                              {/* <!-- Single item --> */}
                            </div>
                          </div>
                        ))}
                      </div>
        <div class="col-md-3 t">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0 t">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>${totalPrice}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p class="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span><strong>${totalPrice}</strong></span>
              </li>
            </ul>

            <Link to="/checkout" className="btn btn-primary btn-block">
      Go to checkout
    </Link>
          </div>
        </div>
      </div>
           
      </div>
      
      <div class="card col-lg-9 col-md-6 mb-lg-4 ">
          <div class="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p class="mb-0">12.10.2020 - 14.10.2020</p>
          </div>
        </div>
        <div class=" card col-lg-9 col-md-6 mb-lg-4">
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
  

              </>
            );
          }
          
  
  export default Cart