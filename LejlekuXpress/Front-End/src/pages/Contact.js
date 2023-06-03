/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
const Contact = () => {
  return (
    <>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h1>How can we help you?</h1>
          </div>
          <div class="col-12 col-md-6 mt-3">
            <input type="text" class="form-control" placeholder="Search"></input>
          </div>
          <div className="row mt-3 justify-content-center">
            <div className="col-3 col-md-2 mb-5">
              <div className="card" style={{height: "100px", backgroundColor:"#C44226"}}>
                <div className="card-body">
                  <h5 className="card-title">Payment Help</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
            <div className="col-3 col-md-2">
              <div className="card" style={{height: "100px", backgroundColor:"#3BB930"}}>
                <div className="card-body">
                  <h5 className="card-title">Safety & Privacy</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
              <div className="col-3 col-md-2">
                <div className="card" style={{height: "100px", backgroundColor:"#4989E5"}}>
                  <div className="card-body">
                    <h5 className="card-title">Account Help</h5>
                    <p className="card-text"></p>
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