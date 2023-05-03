import React from "react";
import { useState } from "react";
import ReactStars from "react-stars";

const SingleProduct = () => {
  const [orderedProduct, setorderProduct] = useState(true);
  return (
    <>
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                 
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>

      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ipsam dolore a ab dolorum reiciendis maiores, aliquam aliquid
                  adipisci accusantium ut at unde vitae distinctio, minus
                  voluptatum suscipit animi esse totam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-wrapper home-wrapper-2 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="">Reviews</h3>
              <div className="review-inner-wrapper mb-5">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write a review
                      </a>
                    </div>
                  )}
                </div>

                {/* Pjesa e formes te reviews */}

                {/* <div className="review-form">
                        <form action=""></form>
                    </div> */}
                <div className="reviews mt-4 ">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center ">
                      <h6 className="mb-0">Arti</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>

                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iure sunt perspiciatis sapiente harum, similique pariatur
                      quam impedit! Repellat quo porro, deleniti nulla
                      voluptatum rem nesciunt dolores error beatae! Architecto,
                      commodi?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
