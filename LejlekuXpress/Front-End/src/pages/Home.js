import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Helmet } from "react-helmet";
import SpecialProduct from "../components/SpecialProduct";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
        <div className="row mb-5">
            <div className="carousel-wrapper">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
              >
                <div className="slide">
                <img src="/images/Offer1.png" style={{ width: '100%' }} alt="Offer 1" />
                </div>
                <div className="slide">
                <img src="/images/Offer2.png" style={{ width: '100%' }} alt="Offer 2" />
                </div>
                <div className="slide">
                <img src="/images/Offer3.png" style={{ width: '100%' }} alt="Offer 3" />
                </div>
                <div className="slide">
                <img src="/images/Offer4.png" style={{ width: '100%' }} alt="Offer 4" />
                </div>
              </Carousel>
            </div>
          </div>
          </div>
          </section>
  
          <section className="special-wrapper py-5 home-wrapper-2 ">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-12 ">
              <h3 className="section-heading ">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct />
          </div>
        </div>
      </section>


    </>
  );
};

export default Home;
