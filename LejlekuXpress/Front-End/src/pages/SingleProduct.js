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

  return (
    <>
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <img src={`data:image/${getImageExtension(items.image)};base64,${items.image}`} alt="Product" style={{width: "60%", aspectRatio: "1/1"}} />
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
                      />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button className="btn btn-outline-success me-2" type="submit">
                        Add to Cart
                      </button>

                      <button className="btn btn-success me-2">Buy It Now</button>
                    </div>
                  </div>
                  <div className="mt-1 mb-0 ">
                      <p>Available: {items.quantity}</p>
                    </div>
                  <div className="d-flex align-items-center gap-30">
                    <div>
                      <button className="btn btn-outline-secondary" type="button" onClick={() => handleAdd(items.id)}><i className="bi bi-heart-fill me-2"></i>Add to Wishlist</button>
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
