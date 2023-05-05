/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
const Contact = () => {
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />      
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.04299700287!2d21.189918938574174!3d42.70007893455434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9365bfdf385eb95a!2sPristina!5e0!3m2!1sen!2sde!4v1683134747326!5m2!1sen!2sde"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              </div>
              <div className="col-12 mt-5">
<div className="contact-inner-wrapper d-flex justify-content-between ">
  <div>
    <h3 className="contact-title mb-4">Contact us:</h3>
    <form action="" className="d-flex flex-column gap-15 mb-4">
      
    
  
      <div>
        <input type="text" className="form-control mb-4" placeholder="Name" />
      </div>
      <div>
        <input type="email" className="form-control mb-4" placeholder="Email" />
      </div>
      <div>
        <input type="tel" className="form-control mb-4" placeholder="Mobile Number" />
      </div>
      <div>
        <textarea 
        name="" 
        id="" 
        className="w-100 form-control mb-4"
        cols="30" 
        rows="4"
        placeholder="Comments"
        ></textarea>
      </div>
      <div>
        <button className="btn btn-primary me-2">Submit</button>
      </div>
      </form>
  </div>
  <div>
    <h3 className="contact title mb-4">Get in touch with us</h3>
    <div>
      <ul className="ps-0">
        <li className="mb-3 d-flex gap-15 align-items-center"> <AiOutlineHome className="fs-5" />
        <address>Nr.420 , Pejton st. , Prishtina , Kosovo</address> 
        </li>
        <li className="mb-3 d-flex gap-15 align-items-center">
           <BiPhoneCall className="fs-5"/>
           <a href="tel:+383 45 428160">tel:+383 45 428160</a>
            </li>
        <li className="mb-3 d-flex gap-15 align-items-center">
          <AiOutlineMail className="fs-5" />
          <a href="mailto:andi.fr33@gmail.com" >andi.fr33@gmail.com
          </a>
        </li>
        <li className="mb-3 d-flex gap-15 align-items-center" >
          <BiInfoCircle className="fs-5" />
          <p className="mb-0">Always open!</p>
        </li>
      </ul>
    </div>
  </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;