import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <footer className='py-4'>
    <div className="container-xl " >
          <div className="row">
            <div className="col-12">
    <section className="home-wrapper-2 py-3 text-white" style={{ backgroundColor: 'var(--color-131921)'}}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between" >
                <div className="d-flex align-items-center gap-15">
                <i class="bi bi-truck fs-1"></i>
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all order aboves 100€</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                <i class="bi bi-gift fs-1"></i>
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                <i class="bi bi-headset fs-1"></i>
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                <i class="bi bi-gear fs-1"></i>
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">get Factory Default Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                <i class="bi bi-credit-card-2-back fs-1"></i>
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

      <hr className='text-white'></hr>
        
              <p className='text-center mb-0 text-white'>
                &copy; {new Date().getFullYear()}: LejlekuXPress. All rights reserved.
              </p>
              <div className="text-center">
                <Link to="contact">Help</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
