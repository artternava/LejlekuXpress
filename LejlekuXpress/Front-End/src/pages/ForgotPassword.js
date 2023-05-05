import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
        <>
        <Meta title={"Login"} />
        <BreadCrumb title="Login" />
        <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className="text-center mb-3">Reset Your Password</h3>
                    <p className="text-center mt-2 mb-3">
                        We will send you an email to reset your password
                    </p>
                    <form action="" className="d-flex flex-column gap-15"></form>
                    <div>
                        <input type="email" name="email" placeholder="Email" className="form-control" />
                    </div>
                    <div>
                        <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                            <button className="btn btn-primary me-2" type="submit">Submit</button>
                            <Link to="/login">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ForgotPassword