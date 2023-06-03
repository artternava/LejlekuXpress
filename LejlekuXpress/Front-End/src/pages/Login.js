import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';






const Login = () => {
  const [userLogin, setUserLogin] = useState({
    Email: '',
    Password: ''
  });

  const [showPassword, setShowPassword] = useState(false);


  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const [formErrors, setFormErrors] = useState({
    Email: false,
    Password: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserLogin((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { Email, Password } = userLogin;
    const errors = {
      Email: Email.length === 0,
      Password: Password.length === 0
    };
    setFormErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      return;
    }

    axios.post('http://localhost:39450/api/Auth/login', userLogin)
      .then((response) => {
        console.log('Login successful', response.data);
        window.alert('Login successful');
        const token = response.data.token;
        document.cookie = `access_token=${token}; path=/;`;
  
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Login failed', error);
        window.alert('Login failed');
      });
  };


  return (
    <>
    
      <div className="login-wrapper py-5 home-wrapper-2" style={{ height: '80vh' }}>
        <div className="auth-card border border-3">
          <h3 className="text-center mb-3" style={{ color: '#3d3d3d' }}>Login</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="Email">Email address</label>
              <input type="email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} id="Email" name="Email" value={userLogin.Email} onChange={handleInputChange} />
              {formErrors.Email && <div className="invalid-feedback">Email is required</div>}
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type={showPassword ? "text" : "password"} className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`} id="Password" name="Password" value={userLogin.Password} onChange={handleInputChange} />
              {formErrors.Password && <div className="invalid-feedback">Password is required</div>}
            </div>
            <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        checked={showPassword}
                        onChange={handleShowPasswordChange}
                      />
                      <label className="form-check-label" htmlFor="showPassword"> Show Password </label>
                    </div>
                  </div>
                </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
          <div className="text-center mt-3">
            <span className="text-secondary" style={{ fontSize: '15px' }}>Don't have an account? </span>
            <Link to="/signup" className="text-primary">Sign up</Link>
          </div>
        </div>
      </div>
      
    </>
  );
  
};

export default Login;
