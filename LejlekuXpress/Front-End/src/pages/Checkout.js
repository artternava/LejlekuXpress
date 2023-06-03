import React, { useState, useEffect } from "react";
import Meta from '../components/Meta'
import{Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';



const items = [  {   
    name: "Iphone 14",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "1000", },  
    {   
      name: "Iphone 3g",
      quantity: 3,
      imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
      specification: ["Option 1", "Option 2", "Option 3"],
      description: "lorem ipsum",
      price: "100", },  
      {   
        name: "Nokia",
        quantity: 4,
        imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
        specification: ["Option 1", "Option 2", "Option 3"],
        description: "lorem ipsum",
        price: "800", }];


function Checkout() {
    const { userId } = useAuthToken();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetchAddresses();
    }, [userId])


    const fetchAddresses = async () => {
        try {
          const countryResponse = await axios.get(`http://localhost:39450/api/ShippingAddress/get?UserId=${userId}`);
          if (countryResponse.status === 200) {
            const addressData = countryResponse.data;
            setAddresses(addressData);
            console.log(addressData);
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };


            return (
              <>

                <Meta title={"Checkout"}></Meta>

                        <div class="container mt-5">
                             <div class="row justify-content-center">
                                <div class="col-12 text-center">
                                  <h3>Shipping</h3>
                                 </div>
                                 <div class="col-12 col-md-6 mt-1">
                                 <select name='' className='form-control form-select' id=''>
                                 <option value="" selected disabled> Select Address</option>
                                    </select>
                                    </div>
                                    </div>
                                    <div class="row justify-content-center mt-2">
                                    <div class="col-12 text-center">
                                        <h3>Payment</h3>
                                    </div>
                                    <div class="col-12 col-md-6 mt-1 mb-5">
                                    <select name='' className='form-control form-select' id=''>
                                        <option value="" selected disabled> Select Payment</option>
                                    </select>
                                    </div>
                                    </div>
                                    </div>


                {items.map((items) => (     
                  <section>
                     
                
                     <div class="container mt-3 border border-2 mb-4" style={{backgroundColor:"rgb(245, 240, 240)" }}>
                    <div class="row mt-3">
                        <div class="col-md-3">
                             <div class=" col-lg-3 mb-4 mb-lg-0 ">                                
                                <div class="bg-image hover-zoom ripple rounded ripple-surface ">
                                  <img src={items.imageSrc} class="w-80 justify-content-center" />
                                </div>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <h5>Product Name</h5>
                            <h7>{items.name}</h7>
                        </div>
                        <div class="col-md-3">
                        <h5>Quantity:</h5>
                        <h7>{items.quantity}</h7>
                        </div>
                        <div class="col-md-3">
                        <h5>Product Price:</h5>
                        <h7>${items.price}</h7>
                        </div>
                        </div>
                        
                    </div>
              
                    </section>
                    
                ))}
                </>
              );          
        }
    

export default Checkout