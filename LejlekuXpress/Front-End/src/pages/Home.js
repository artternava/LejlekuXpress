import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* pjesa e pare e HomePage */}
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner positon-relative">
                <img
                  src="images/main-banner-1.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h5>SUPERCHARGED FOR PROS.</h5>
                  <h6>IPad s13+ Pro.</h6>
                  <p>From 999€ or 41.62€/mo. <br /> for 24 mo.</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner positon-relative ">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="banner1"
                  />
                  <div className="small-banner-content top-banner-pictures">
                    <h5>BEST SALE</h5>
                    <h6>Laptops Max.</h6>
                    <p>From 999€ or <br /> 41.62€/mo.</p>
                  </div>
                </div>
                <div className="small-banner positon-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="banner2"
                  />
                  <div className="small-banner-content top-banner-pictures">
                    <h5>NEW ARRIVAL</h5>
                    <h6>Buy IPad Air</h6>
                    <p>From 599€ or <br /> 41.62€/mo. for 12 mo.</p>
                  </div>
                </div>

                <div className="small-banner positon-relative ">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="banner3"
                  />
                  <div className="small-banner-content bottom-banner-pictures">
                    <h5>15% OFF</h5>
                    <h6>Smartwatch 7</h6>
                    <p>Shop the latest band <br /> styles and colors</p>
                  </div>
                </div>
                <div className="small-banner positon-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="banner4"
                  />
                  <div className="small-banner-content bottom-banner-pictures">
                    <h5>FREE ENGRAVING</h5>
                    <h6>AirPods Max</h6>
                    <p>High-fidelity playback & <br /> ultra-low distortion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* pjesa e dyte e HomePage */}
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all order aboves 100€</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">get Factory Default Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Music</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="speaker" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>HeadPhones</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="headphone" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Music</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="speaker" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div >
                    <h6>HeadPhones</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="headphone" />
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </>
  );
};

export default Home;
