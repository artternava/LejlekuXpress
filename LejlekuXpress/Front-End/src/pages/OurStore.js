import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard"
import Header from "../components/Header"
import useAuthToken from '../components/useAuthToken';


const OurStore = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const [items, setItems] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const { userId } = useAuthToken();

  useEffect(() => {
    
    console.log('Search Query in ourStore:', searchQuery);
  }, [searchQuery]);

  

  

  

  

  return (
    <>
    <Meta title="Our Store"></Meta>
    <div className='store-wrapper home-wrapper-2 py5'>
    {items && items.map((item) => (
        <section style={{ backgroundColor: "#fff" }}>
          <div className="container py-3">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xl-10">
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                          <img src={`data:image/${item.image};base64,${item.image}`} alt="Product" style={{ width: "60%", aspectRatio: "1/1" }} />
                          <a href="#!">
                            <div className="hover-overlay">
                              <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>{item.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <p><b>Quantity</b></p>
                          </div>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="mt-1 mb-0 text-muted small">
                          <p>{item.specifications}</p>
                        </div>
                        <p className="text-truncate mb-4 mb-md-0">
                          {item.description}
                        </p>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1">${item.price}</h4>
                        </div>
                        <h6 className="text-success">${item.shippingPrice}</h6>
                        <div className="d-flex flex-column mt-4">
                          <button className="btn btn-primary btn-sm" type="button">Add to Cart</button>
                          <button className="btn btn-danger btn-sm mt-2" type="button" onClick={() => handleAdd(item.id)}>
                            <i className="bi bi-heart-fill me-2"></i>Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
    </>
  )
}

export default OurStore