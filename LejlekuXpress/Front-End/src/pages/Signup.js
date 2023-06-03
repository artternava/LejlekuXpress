import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [showRoleCard, setShowRoleCard] = useState(true);
  const [firstDivChecked, setFirstDivChecked] = useState(false);
  const [secondDivChecked, setSecondDivChecked] = useState(false);
  const [userRegistration, setUserRegistration] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);


  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const [formErrors, setFormErrors] = useState({
    FirstName: false,
    LastName: false,
    Email: false,
    Password: false,
    ConfirmPassword: false,
    Terms: false
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserRegistration((prevState) => ({
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
    const { FirstName, LastName, Email, Password, ConfirmPassword } = userRegistration;
    const errors = {
      FirstName: FirstName.length === 0,
      LastName: LastName.length === 0,
      Email: Email.length === 0,
      Password: Password.length === 0,
      ConfirmPassword: ConfirmPassword.length === 0,
      Terms: !event.target.terms.checked
    };
    setFormErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      return;
    }
    
    axios.post('http://localhost:39450/api/Auth/register', userRegistration)
  .then((response) => {
    console.log('Registration successful', response.data);
    window.alert('Registration successful');
    window.location.href = '/login';
  })
  .catch((error) => {
    console.error('Registration failed', error);
    window.alert('Registration failed');
  });
  };


  const handlePick = () => {
    setShowRoleCard(false);
  };

  const handleFirstDivClick = () => {
    setFirstDivChecked(true);
    setSecondDivChecked(false);
    setUserRegistration(prevState => ({...prevState, Role: 3}));
  };

  const handleSecondDivClick = () => {
    setSecondDivChecked(true);
    setFirstDivChecked(false);
    setUserRegistration(prevState => ({...prevState, Role: 4}));
  };

  const buttonDisabled = !firstDivChecked && !secondDivChecked;

  return (
    <>
      <div className="login-wrapper py-5 home-wrapper-2" style={{ height: '80vh' }}>
        {showRoleCard ? (
      <div className="role-card border border-4">
      <div className="roles-card d-flex flex-column">
        <div>
          <h3 className="text-center mb-4" style={{ fontSize: '26px', color: '#3d3d3d' }}>Sign Up as a Seller or a Client</h3>
        </div>
        <div className="row justify-content-between">
        <div className={`border border-4 col-sm-5 p-3 ${firstDivChecked ? 'custom-bg-color' : 'custom-bg-color-default'}`} style={{borderRadius: '10px', cursor: 'pointer',}} onClick={handleFirstDivClick} >
            <div className="form-check">
              <input type="checkbox" className="form-check-input rounded-circle" style={{ width: '24px', height: '24px'}} checked={firstDivChecked} onChange={() => {}}/>
            </div>
            <p style={{ marginTop: '24px' }}>I Want to be a Seller</p>
          </div>
          <div className={`border border-4 col-sm-5 p-3 ${secondDivChecked ? 'custom-bg-color' : 'custom-bg-color-default'}`} style={{ borderRadius: '10px', cursor: 'pointer', }} onClick={handleSecondDivClick}>
            <div className="form-check">
            <input type="checkbox" className="form-check-input rounded-circle" style={{ width: '24px', height: '24px' }} checked={secondDivChecked} onChange={() => {}}/>
            </div>
            <p style={{ marginTop: '24px' }}>I Want to be a Client</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary btn-lg mt-4" type="button" onClick={handlePick} disabled={buttonDisabled}
            style={{ width: '500px', outline: 'none', border: '2px solid', borderColor: buttonDisabled ? '#A9A9A9' : '#007bff', color: buttonDisabled ? '#A9A9A9' : '#fff', backgroundColor: buttonDisabled ? '#D3D3D3' : '#007bff', cursor: buttonDisabled ? 'not-allowed' : 'pointer', transition: 'background-color 0.5s ease',}}>
            {firstDivChecked ? 'Continue as Seller' : secondDivChecked ? 'Continue as Client' : 'Sign Up'}
          </button>
        </div>
        <div className="text-center">
          <span className="text-secondary" style={{ fontSize: '15px' }}>Already have an account? </span>
          <Link to="/login" className="text-primary">Login</Link>
        </div>
      </div>
      </div>
        ) : (
          <div className="auth-card border border-2 mt-6">
          <h3 className="text-center mb-3" style={{ color: '#3d3d3d' }}>Sign Up</h3>
          <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-15">
            <div className="row mb-3">
              <div className="col">
                <input type="text" name="FirstName" placeholder="First Name" className={`form-control ${formErrors.FirstName ? 'is-invalid' : ''}`} value={userRegistration.FirstName} onChange={handleInputChange} />
                {formErrors.FirstName && <div className="invalid-feedback">First Name is required</div>}
              </div>
              <div className="col">
                <input type="text" name="LastName" placeholder="Last Name" className={`form-control ${formErrors.LastName ? 'is-invalid' : ''}`} value={userRegistration.LastName} onChange={handleInputChange} />
                {formErrors.LastName && <div className="invalid-feedback">Last Name is required</div>}
              </div>
            </div>
            <div className="mb-3">
              <input type="email" name="Email" placeholder="Email" className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`} value={userRegistration.Email} onChange={handleInputChange} />
              {formErrors.Email && <div className="invalid-feedback">Email is required</div>}            </div>
            <div className="mb-3">
              <input type={showPassword ? "text" : "password"} name="Password" placeholder="Password" className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`} value={userRegistration.Password} onChange={handleInputChange} />
              {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
              {formErrors.Password && <div className="invalid-feedback">Password is required</div>}
            </div>
            <div>
              <input type={showPassword ? "text" : "password"} name="ConfirmPassword" placeholder="Confirm Password" className={`form-control ${formErrors.ConfirmPassword ? 'is-invalid' : ''}`} value={userRegistration.ConfirmPassword} onChange={handleInputChange} />
              {formErrors.ConfirmPassword && <div className="invalid-feedback">Confirm Password is required</div>}
            </div>
            <div className="row">
                  <div className="col-md-12">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        checked={showPassword}
                        onChange={handleShowPasswordChange}
                      />
                      <label className="form-check-label" htmlFor="showPassword">  <span className="text-secondary" style={{ fontSize: '14px' }}>Show Password</span></label>
                    </div>
                  </div>
                </div>
            <div>
              <div className="form-check">
              <input type="checkbox" name="terms" className={`form-check-input ${formErrors.Terms ? 'is-invalid' : (userRegistration.terms ? 'is-valid' : '')}`} onChange={handleInputChange}onClick={() => setFormErrors({...formErrors, Terms: ''})} />
                <label className="form-check-label">
                  <span className="text-secondary" style={{ fontSize: '14px' }}>I agree to the</span> <Link to="/TermsAndConditions" className="text-primary" target="_blank" rel="noopener noreferrer">terms and conditions</Link>.
                </label>
                {formErrors.Terms && <div className="invalid-feedback">You must agree to the Terms And Conditions!</div>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-2" style={{ width: '100%', outline: 'none' }}>Sign Up</button>
          </form>
          <div className="text-center mt-4">
            <span className="text-secondary" style={{ fontSize: '15px' }}>Already have an account? </span>
            <Link to="/login" className="text-primary">Login</Link>
          </div>
        </div>
        )}
      </div>
    </>
  )
}
export default Signup;


