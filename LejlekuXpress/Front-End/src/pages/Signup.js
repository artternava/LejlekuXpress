import React from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
    <Meta title={"Signup"} />
    <BreadCrumb title="Signup" />
    <div className="login-wrapper py-5 home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Signup</h3>
            <form action="" className="d-flex flex-column gap-15"></form>
            <div className="row mb-3">
              <div className="col">
                <input type="text" name="firstname" placeholder="First Name" className="form-control" />
              </div>
              <div className="col">
                <input type="text" name="lastname" placeholder="Last Name" className="form-control" />
              </div>
            </div>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" name="password" placeholder="Password" className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" name="password" placeholder="Confirm Password" className="form-control" />
            </div>
            <div>
              <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">Signup</button>
                    <Link to="/login">Already have an account? Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
