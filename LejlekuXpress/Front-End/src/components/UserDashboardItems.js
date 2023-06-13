import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
  MDBCardImage,
  MDBCardTitle,
  MDBModal
  } from "mdb-react-ui-kit";
  import axios from 'axios';
  import useAuthToken from './useAuthToken.js';
  import { Link } from "react-router-dom";
  import { useLocation } from "react-router-dom";


  //#region PersonalInfo
  function PersonalInfo() {
    const { userId } = useAuthToken();
    const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: '',
      phoneNumber: '',
      countryCode: '',
    });
    const [countryData, setCountryData] = useState([]);
    const [formErrors, setFormErrors] = useState({
      firstName: false,
      lastName: false,
      email: false,
      profilePicture: false,
      phoneNumber: false,
      countryCode: false,
    });
  
    useEffect(() => {
      if (userId) {
        fetchUserDetails();
      }
    }, [userId]);
  
    
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:39450/api/User/get?id=${userId}`);
        if (response.status === 200) {
          const userData = response.data;
          let phoneNumber = '';
          let countryCode = '';
          if (userData.phoneNumber) {
            const phoneNumberParts = userData.phoneNumber.split('-');
            countryCode = phoneNumberParts[0].substring(1);
            phoneNumber = phoneNumberParts[1];
          }
    
          setUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            profilePicture: userData.profilePicture,
          });
    
          console.log(user);
        } else {
          console.error('Failed to fetch user details');
        }
    
        const countryResponse = await axios.get('http://localhost:39450/api/Country/getall');
        if (countryResponse.status === 200) {
          const countryData = countryResponse.data;
          setCountryData(countryData);
        } else {
          console.error('Failed to fetch country data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user details or country data', error);
      }
    }
  
    async function updateUserDetails() {
      try {
        const { firstName, lastName, email, phoneNumber, countryCode, profilePicture} = user;
  
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
          setFormErrors({
            firstName: firstName ==='',
            lastName: lastName === '',
            email: email === '',
          });
          console.error('Please fill in all required fields');
          return; 
        }
        if (phoneNumber.trim() !== '' && countryCode.trim() === ''){
          setFormErrors({
            countryCode: countryCode === '',
          })
          return;
        };

        if (countryCode.trim() !== '' && phoneNumber.trim() === ''){
          setFormErrors({
            phoneNumber: phoneNumber === '',
          })
          return;
        };

        const formattedPhoneNumber = countryCode && phoneNumber ? `+${countryCode}-${phoneNumber}` : '';
  
        const response = await axios.put(`http://localhost:39450/api/User/update?id=${userId}`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: formattedPhoneNumber,
          profilePicture: profilePicture,
        });
        if (response.status === 200) {
          window.alert('Profile saved successfully');
          console.log('User details updated successfully');
        } else {
          console.error('Failed to update user details');
        }
      } catch (error) {
        console.error('An error occurred while updating user details', error);
      }
    }
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        setUser((prevState) => ({
          ...prevState,
          profilePicture: base64Data,
        }));
      };
      reader.readAsDataURL(file);
    };
    const getImageExtension = (imageData) => {
      if (!imageData || imageData.length === 0) {
        return 'jpeg';
      }
      if (
        (imageData[0] === 0xFF && imageData[1] === 0xD8 && imageData[2] === 0xFF) ||
        (imageData[0] === 0xFF && imageData[1] === 0xD9)
      ) {
        return 'jpeg';
      }
      if (
        imageData[0] === 0x89 &&
        imageData[1] === 0x50 &&
        imageData[2] === 0x4E &&
        imageData[3] === 0x47 &&
        imageData[4] === 0x0D &&
        imageData[5] === 0x0A &&
        imageData[6] === 0x1A &&
        imageData[7] === 0x0A
      ) {
        return 'png';
      }
      return 'jpeg';
    };


    return (
      <div className="container-userdashboard-tabs">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5 mb-3"
                  src={`data:image/${getImageExtension(user.profilePicture)};base64,${user.profilePicture}`}
                  alt="user profile"
                  width="30%"
                  style={{width: "30%", aspectRatio: "1/1", borderRadius: "50%",}}
                />
                <input
                  type="file"
                  id="profilePicture"
                  className="form-control"
                  multiple
                  onChange={handleImageUpload}
                />
                <span className="font-weight-bold">{user.firstName}</span>
                <span className="text-black-50">{user.email}</span>
              </div>
            </div>
            <div className="col-md-8 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="labels">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                        placeholder="first name"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.firstName && <div className="invalid-feedback">First name is required.</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="labels">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                        placeholder="last name"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.lastName && <div className="invalid-feedback">Last name is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="labels">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <select
                          className={`form-control ${formErrors.countryCode ? 'is-invalid' : ''}`}
                          id="countryCode"
                          name="countryCode"
                          value={user.countryCode}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Country</option>
                          {countryData.map((country) => (
                            <option key={country.code} value={country.phoneCode}>
                              {country.niceName} (+{country.phoneCode})
                            </option>
                          ))}
                        </select>
                        
                        <input
                          type="text"
                          className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                          id="phoneNumber"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={user.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.countryCode && <div className="invalid-feedback">Country code is required.</div>}
                      {formErrors.phoneNumber && <div className="invalid-feedback">Phone number is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email" className="labels">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && <div className="invalid-feedback">Email is required.</div>}
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary me-2" type="button" onClick={updateUserDetails}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );    
  }
//#endregion
  //#region ShippingInfo
function ShippingInfo() {
  const { userId } = useAuthToken();
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    FirstName: '',
    LastName: '',
    CountryId: '',
    State: '',
    City: '',
    ZipCode: '',
    Address1: '',
    Address2: '',
    UserId: '',
  });
  const [formErrors, setFormErrors] = useState({
    FirstName: false,
    LastName: false,
    CountryId: false,
    State: false,
    City: false,
    ZipCode: false,
    Address1: false,
    Address2: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const handleSelectedInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };


  const toggleAddressForm = () => {
    setIsAddAddressVisible(!isAddAddressVisible);
  }
  useEffect(() => {
    fetchCountries();
    fetchAddresses();
  }, [userId]);

  const getCountryName = (countryId) => {
    const country = countries.find((country) => country.id === countryId);
    return country ? country.niceName : '';
  };
  
  const fetchCountries = async () => {
    try {
      const countryResponse = await axios.get('http://localhost:39450/api/Country/getall');
        if (countryResponse.status === 200) {
          const countryData = countryResponse.data;
          setCountries(countryData);
        } else {
          console.error('Failed to fetch country data');
        }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  
  
  const fetchAddresses = async () => {
    try {
      const countryResponse = await axios.get(`http://localhost:39450/api/ShippingAddress/get?UserId=${userId}`);
      if (countryResponse.status === 200) {
        const addressData = countryResponse.data;
        setAddresses(addressData);
        console.log(addressData);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { FirstName, LastName, CountryId, State, City, ZipCode, Address1, Address2, } = newAddress;
    const errors = {
      FirstName: FirstName.length === 0,
      LastName: LastName.length === 0,
      CountryId: CountryId.length === 0,
      City: City.length === 0,
      ZipCode: ZipCode.length === 0,
      Address1: Address1.length === 0,
    };
    setFormErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      return;
    }

    const addressWithUserId = {
      ...newAddress,
      UserId: userId, 
    };

    axios
      .post('http://localhost:39450/api/ShippingAddress/add', addressWithUserId)
      .then((response) => {
        console.log('Registration successful', response.data);
        window.alert('Registration successful');
        window.location.href = '/userdashboard';
      })
      .catch((error) => {
        console.error('Registration failed', error);
        window.alert('Registration failed');
      });
  };

  const deleteAddress = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this address?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:39450/api/ShippingAddress/delete?id=${id}`);
        fetchAddresses();
        window.location.href = '/userdashboard';
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const updateAddress = async (id) => {
    try {
      const { Name, LastName, CountryId, City, ZipCode, Address1} = selectedAddress;
      const errors = {
        Name: Name && Name.length === 0,
        LastName: LastName && LastName.length === 0,
          CountryId: CountryId && CountryId.length === 0,
      	  City: City && City.length === 0,
          ZipCode: ZipCode && ZipCode.length === 0,
          Address1: Address1 && Address1.length === 0
      };
    
    setFormErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      return;
    }      
    console.log(selectedAddress)

      const confirmUpdate = window.confirm('Are you sure you want to update this Address?');
      if (confirmUpdate) {
        await axios.put(`http://localhost:39450/api/ShippingAddress/update?id=${id}`, selectedAddress);
        fetchAddresses();
        closeModal();
        window.location.href = '/userdashboard';
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const openModal = (address) => {
    setSelectedAddress(address);
    console.log(selectedAddress)
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="shippingInfo">
      <div id="addressList" style={{ display: isAddAddressVisible ? 'none' : 'block' }}>
        <div className="container-userdashboard-tabs">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              padding: '10px',
              width: '95%',
              backgroundColor: '#fff',
              margin: 'auto',
              borderRadius: '10px',
            }}
          >
            <h1 style={{ fontSize: '35px', fontWeight: '400', padding: '5px' }}>Addresses</h1>
            <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm}>
              Add Address
            </button>
          </div>
          <div className="container rounded bg-white mt-5 mb-5 ">
            <div className="row" style={{ backgroundColor: '#bdbdbd' }}>
              <div className="col-md-12">
                <div className="grid-container">
                  {addresses.map((address) => (
                    <div className="grid-item p-3 py-1" id="edit-address">
                      <div className="d-flex justify-content-between align-items-center mb-3 my-3 flex-wrap">
                        <div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-fill me-2"></i>
                          <h6 className="text-right w-100">{address.firstName} {address.lastName}</h6>
                        </div>
                        <div className="d-flex align-items-start mt-2">
                        <i class="bi bi-house-door me-2"></i>
                          <div>
                            <p>{address.address1}</p>                           
                          </div>
                        </div>
                        <div className="d-flex align-items-start">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                            <p>{address.city}, {address.state}, {getCountryName(address.countryId)}</p>      
                        </div>
                        <div className="d-flex align-items-start ">
                          
                           <p className="ml-10">{address.zipCode}</p>
                        </div>
                        </div>
                        <div className="w-100">
                          <div className="row mt-2 text-center">
                            <div className="col-md-12">     
                              <button className="btn btn-danger me-2" type="button" onClick={() => deleteAddress(address.id)}>
                                Delete
                              </button>
                              <button className="btn btn-primary me-2 ml-3" type="button" onClick={() => openModal(address)}>Update Address</button>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <MDBModal show={isModalOpen} onHide={closeModal}>
          <div className="custom-modal" style={{ backgroundColor: "#fff", width: "50%", margin: "auto", padding: "20px", borderRadius: "20px", marginTop: "5%" }}>
            <div className="custom-modal-header" style={{ display: "flex", alignItems: "center" }}>
              <h5 className="modal-title mb-3" style={{ marginRight: "auto" }}>Address Details</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="custom-modal-body">
              {selectedAddress && (
                
                <div className="p-3">
                  
                  <div className="container rounded bg-white mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 py-5">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="labels">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        name="FirstName"
                        value={selectedAddress.firstName}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.FirstName && <p className="text-danger">First Name is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="labels">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        name="LastName"
                        value={selectedAddress.lastName}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.LastName && <p className="text-danger">Last Name is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="country" className="labels">Country</label>
                      <select
                          className={`form-control ${formErrors.countryCode ? 'is-invalid' : ''}`}
                          id="countryId"
                          name="countryId"
                          value={selectedAddress.countryId}
                          onChange={handleSelectedInputChange}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.niceName}
                            </option>
                          ))}
                        </select>
                      {formErrors.countryId && <p className="text-danger">Country is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state" className="labels">State</label>
                      <input
                        type="text"
                        id="state"
                        className="form-control"
                        placeholder="State"
                        name="state"
                        value={selectedAddress.state}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.state && <p className="text-danger">State is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city" className="labels">City</label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        placeholder="City"
                        name="city"
                        value={selectedAddress.city}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.city && <p className="text-danger">City is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="zipCode" className="labels">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        className="form-control"
                        placeholder="Zip Code"
                        name="zipCode"
                        value={selectedAddress.zipCode}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.zipCode && <p className="text-danger">Zip Code is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address1" className="labels">Address 1</label>
                      <input
                        type="text"
                        id="address1"
                        className="form-control"
                        placeholder="Address 1"
                        name="address1"
                        value={selectedAddress.address1}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.address1 && <p className="text-danger">Address 1 is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address2" className="labels">Address 2</label>
                      <input
                        type="text"
                        id="address2"
                        className="form-control"
                        placeholder="Address 2"
                        name="address2"
                        value={selectedAddress.address2}
                        onChange={handleSelectedInputChange}
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-primary me-2" type="submit" onClick={() => updateAddress(selectedAddress.id)}>Save Address</button>
            <button className="btn btn-danger" type="button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
              
              )}
            </div>
          </div>
        </MDBModal>


        <div
        id="add-edit-address"
        style={{ display: isAddAddressVisible ? 'block' : 'none' }}
        className="container-userdashboard-tabs"
      >






        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Address</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="labels">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        name="FirstName"
                        value={addresses.FirstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.FirstName && <p className="text-danger">First Name is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="labels">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        name="LastName"
                        value={addresses.LastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.LastName && <p className="text-danger">Last Name is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="country" className="labels">Country</label>
                      <select
                          className={`form-control ${formErrors.countryCode ? 'is-invalid' : ''}`}
                          id="CountryId"
                          name="CountryId"
                          value={newAddress.CountryId}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.niceName}
                            </option>
                          ))}
                        </select>
                      {formErrors.CountryId && <p className="text-danger">Country is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state" className="labels">State</label>
                      <input
                        type="text"
                        id="state"
                        className="form-control"
                        placeholder="State"
                        name="State"
                        value={addresses.State}
                        onChange={handleInputChange}
                      />
                      {formErrors.State && <p className="text-danger">State is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city" className="labels">City</label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        placeholder="City"
                        name="City"
                        value={addresses.City}
                        onChange={handleInputChange}
                      />
                      {formErrors.City && <p className="text-danger">City is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="zipcode" className="labels">Zip Code</label>
                      <input
                        type="text"
                        id="zipcode"
                        className="form-control"
                        placeholder="Zip Code"
                        name="ZipCode"
                        value={addresses.ZipCode}
                        onChange={handleInputChange}
                      />
                      {formErrors.ZipCode && <p className="text-danger">Zip Code is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address1" className="labels">Address 1</label>
                      <input
                        type="text"
                        id="address1"
                        className="form-control"
                        placeholder="Address 1"
                        name="Address1"
                        value={addresses.Address1}
                        onChange={handleInputChange}
                      />
                      {formErrors.Address1 && <p className="text-danger">Address 1 is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address2" className="labels">Address 2</label>
                      <input
                        type="text"
                        id="address2"
                        className="form-control"
                        placeholder="Address 2"
                        name="Address2"
                        value={addresses.Address2}
                        onChange={handleInputChange}
                      />
                      {formErrors.Address2 && <p className="text-danger">Address 2 is required</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button me-2" type="submit" onClick={handleFormSubmit}>
                    Save Address
                  </button>
                  <button className="btn btn-danger profile-button" onClick={toggleAddressForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//#endregion
  //#region PaymentDetails
    function PaymentDetails() {
      const { userId } = useAuthToken();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedPayment, setSelectedPayment] = useState(null);
        const [isPaymentVisible, setIsPaymentVisible] = useState(false);
        const [payment, setPayment] = useState([]);       
        const [newPayment, setNewPayment] = useState({
          UserId: '',
          FirstName: '',
          LastName: '',
          CardNumber: '',
          ExpirationDate: '',
          CVV: '',
        });
        const [formErrors, setFormErrors] = useState({
          FirstName: false,
          LastName: false,
          CardNumber: false,
          ExpirationDate: false,
          CVV: false,
        });

        const handleInputChange = (event) => {
          const { name, value } = event.target;
          setNewPayment((prevState) => ({
            ...prevState,
            [name]: value,
          }));
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        };

        const handleSelectedInputChange = (event) => {
          const { name, value } = event.target;
          setSelectedPayment((prevState) => ({
            ...prevState,
            [name]: value,
          }));
          setFormErrors((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        };
        const toggleAddressForm = () => {
          setIsPaymentVisible(!isPaymentVisible);
        };
        
        useEffect(() => {
          fetchPayment();
        }, [userId]);


        const fetchPayment = async () => {
          try {
            const countryResponse = await axios.get(`http://localhost:39450/api/Payment/get?UserId=${userId}`);
            if (countryResponse.status === 200) {
              const addressData = countryResponse.data;
              setPayment(addressData);
              console.log(addressData);
            }
          } catch (error) {
            console.error('Error fetching addresses:', error);
          }
        };
        const getLastFourDigits = (cardNumber) => {
          if (cardNumber && cardNumber.length >= 4) {
            return cardNumber.slice(-4);
          }
          return cardNumber;
        };
        const handleFormSubmit = (event) => {
          event.preventDefault();
          const { FirstName, LastName, CardNumber, ExpirationDate, CVV, } = newPayment;
          const errors = {
            FirstName: FirstName.length === 0,
            LastName: LastName.length === 0,
            CardNumber: CardNumber.length !== 16,
            ExpirationDate: ExpirationDate.length !== 5,
            CVV: CVV.length !== 3,
          };
          setFormErrors(errors);
          if (Object.values(errors).some((value) => value)) {
            return;
          }
      
          const addressWithUserId = {
            ...newPayment,
            UserId: userId, 
          };
      
          axios
            .post('http://localhost:39450/api/Payment/add', addressWithUserId)
            .then((response) => {
              console.log('Registration successful', response.data);
              window.alert('Registration successful');
              window.location.href = '/userdashboard';
            })
            .catch((error) => {
              console.error('Registration failed', error);
              window.alert('Registration failed');
            });
        };

        const deletePayment = async (id) => {
          try {
            const confirmDelete = window.confirm('Are you sure you want to delete this payment method?');
            if (confirmDelete) {
              await axios.delete(`http://localhost:39450/api/Payment/delete?id=${id}`);
              fetchPayment();
              window.location.href = '/userdashboard';
            }
          } catch (error) {
            console.error('Error deleting address:', error);
          }
        };
        const updatePayment = async (id) => {
          try {
            const { FirstName, LastName, CardNumber, ExpirationDate, CVV} = selectedPayment;
            const errors = {
              FirstName: FirstName && FirstName.length === 0,
              LastName: LastName && LastName.length === 0,
              CardNumber: CardNumber && CardNumber.length !== 16,
              ExpirationDate: ExpirationDate && ExpirationDate.length !== 5,
              CVV: CVV && CVV.length !== 3,
            };
          
          setFormErrors(errors);
          if (Object.values(errors).some((value) => value)) {
            return;
          }      
          console.log(selectedPayment)
      
            const confirmUpdate = window.confirm('Are you sure you want to update this Payment?');
            if (confirmUpdate) {
              await axios.put(`http://localhost:39450/api/Payment/update?id=${id}`, selectedPayment);
              fetchPayment();
              closeModal();
              window.location.href = '/userdashboard';
            }
          } catch (error) {
            console.error('Error updating payment:', error);
          }
        };

          const openModal = (payment) => {
          setSelectedPayment(payment);
          console.log(selectedPayment)
          setIsModalOpen(true);
        };
        
        const closeModal = () => {
          setIsModalOpen(false);
        };
        return (
            <div id="shippingInfo">
            <div id="addressList" style={{ display: isPaymentVisible ? 'none' : 'block' }}>
            <div className="container-userdashboard-tabs">
            <div className="d-flex justify-content-between align-items-center" 
            style={{padding: "10px", width: "95%", backgroundColor: "#fff", margin: "auto", borderRadius: "10px", }}>
                <h1 style={{fontSize: "35px", fontWeight: "400", padding: "5px"}}>Payment Methods</h1>
              <button className="btn btn-primary me-2" type="button" onClick={toggleAddressForm} >Add Payment</button>
              </div>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row" style={{backgroundColor: '#bdbdbd'}}>
                <div className="col-md-12">
                    <div className="grid-container">
                    {payment.map((payment, index) => (
            <div className="grid-item p-3 py-5" id="edit-address">
            <div className=" text-center">
              <h4 className="text-right">Card: **** **** **** {getLastFourDigits(payment.cardNumber)}</h4>
              <p className="text-right">CardHolder name: <b>{payment.firstName} {payment.lastName}</b></p>

            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">          
              <button className="btn btn-danger me-2" type="button" onClick={() => deletePayment(payment.id)}>Delete</button>
              <button className="btn btn-primary me-2 ml-3" type="button" onClick={() => openModal(payment)}>Update Payment</button>             
                </div>
            </div>
          </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>

            <MDBModal show={isModalOpen} onHide={closeModal}>
          <div className="custom-modal" style={{ backgroundColor: "#fff", width: "50%", margin: "auto", padding: "20px", borderRadius: "20px", marginTop: "5%" }}>
            <div className="custom-modal-header" style={{ display: "flex", alignItems: "center" }}>
              <h5 className="modal-title mb-3" style={{ marginRight: "auto" }}>Payment Details</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="custom-modal-body">
              {selectedPayment && (
                
                <div className="p-3">
                  
                  <div className="container rounded bg-white mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 py-5">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="labels">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={selectedPayment.firstName}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.FirstName && <p className="text-danger">First Name is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="labels">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={selectedPayment.lastName}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.LastName && <p className="text-danger">Last Name is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="CardNumber" className="labels">Card Number</label>
                    <input 
                      type="text" 
                      id="CardNumber" 
                      className="form-control w-100" 
                      placeholder="Card Number"
                      name="cardNumber"
                      value={selectedPayment.cardNumber}
                      onChange={handleSelectedInputChange} 
                      maxLength={16}
                      pattern="\d{16}"
                      required
                      />
                    {formErrors.CardNumber && <p className="text-danger">Card Number is required</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Expiration Date" className="labels">Expiration Date</label>
                      <input
                       type="text" 
                       id="expDate" 
                       className="form-control" 
                       placeholder="MM/YY" 
                       name="expirationDate"
                       value={selectedPayment.expirationDate}
                       onChange={handleSelectedInputChange}
                       maxLength={5}
                       pattern="\d\d/\d\d"
                       required
                        
                      />
                      {formErrors.ExpirationDate && <p className="text-danger">Expiration Date is required</p>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="CVV" className="labels">CVV</label>
                      <input
                        type="text" 
                        id="cvv" 
                        className="form-control" 
                        placeholder="CVV"
                        name="cvv"
                        value={selectedPayment.cvv}
                        onChange={handleSelectedInputChange}
                        maxLength={3}
                        pattern="\d{3}"
                        required
                      />
                       {formErrors.CVV && <p className="text-danger">CVV is required</p>}
                    </div>
                  </div>
    
                </div>
               
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button className="btn btn-primary me-2" type="submit" onClick={() => updatePayment(selectedPayment.id)}>Save Payment Method</button>
                    <button className="btn btn-danger" type="button" onClick={closeModal}>Cancel</button>
                  </div>
                </div>
              
              )}
            </div>
          </div>
        </MDBModal>


            <div
                id="add-edit-address"
                style={{ display: isPaymentVisible ? 'block' : 'none' }}
                className="container-userdashboard-tabs">
            <div className="container-userdashboard-tabs">
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Payment</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="firstName" className="labels">Card Holder First Name</label>
                                            <input 
                                              type="text" 
                                              id="firstName" 
                                              className="form-control" 
                                              placeholder="First Name"
                                              name="FirstName"
                                              value={payment.FirstName}
                                              onChange={handleInputChange}  
                                              />
                                              {formErrors.FirstName && <p className="text-danger">First Name is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="labels">Card Holder Last Name</label>
                                            <input 
                                              type="text" 
                                              id="lastName" 
                                              className="form-control"
                                              placeholder="Last Name" 
                                              name="LastName"
                                              value={payment.LastName}
                                              onChange={handleInputChange} 
                                             />
                                            {formErrors.LastName && <p className="text-danger">Last Name is required</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label htmlFor="CardNumber" className="labels">Card Number</label>
                                    <input 
                                      type="text" 
                                      id="CardNumber" 
                                      className="form-control w-100" 
                                      placeholder="Card Number"
                                      name="CardNumber"
                                      value={payment.CardNumber}
                                      onChange={handleInputChange} 
                                      maxLength={16}
                                      pattern="\d{16}"
                                      required
                                     />
                                    {formErrors.CardNumber && <p className="text-danger">Card Number is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="expDate" className="labels">Expiration Date</label>
                                        <input 
                                        type="text" 
                                        id="expDate" 
                                        className="form-control" 
                                        placeholder="MM/YY" 
                                        name="ExpirationDate"
                                        value={payment.ExpirationDate}
                                        onChange={handleInputChange} 
                                        maxLength={5}
                                        pattern="\d\d/\d\d"
                                        required
                                      />
                                      {formErrors.ExpirationDate && <p className="text-danger">Expiration Date is required</p>}
                                    </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    
                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="CVV" className="labels">CVV</label>
                                        <input 
                                        type="text" 
                                        id="CVV" 
                                        className="form-control" 
                                        placeholder="CVV"
                                        name="CVV"
                                        value={payment.CVV}
                                        onChange={handleInputChange} 
                                        maxLength={3}
                                        pattern="\d{3}"
                                        required
                                      />
                                      {formErrors.CVV && <p className="text-danger">CVV is required</p>}
                                    
                                    </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary me-2" type="submit" onClick={handleFormSubmit}>Save Payment</button>
                                    <button className="btn btn-danger" type="button" onClick={toggleAddressForm}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }

//#endregion
  //#region Orders
 
  function MyOrders() {
    const { userId } = useAuthToken();
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [listings, setListings] = useState(null);

    useEffect(() => {   
      fetchListings();
      fetchOrders();
    }, [userId,items]);

    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:39450/api/Product/getall');
        setListings(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      async function fetchOrders() {
        try {
          const response = await axios.get(`http://localhost:39450/api/Orders/getbyuserid?userID=${userId}`);
          if (response.status === 200) {
            const itemsResponse = response.data;
            setItems(itemsResponse);
            console.log(items)
            }
          } catch (error) {
            console.error(error);
          }
        }

        const getProductName = (productId) => {
          const listing = listings && listings.find(listing => listing.id === productId);
          return listing ? `${listing.name}` : '';
          };

        const getimage = (productId) => {
          const listing = listings && listings.find(listing => listing.id === productId);
          return listing ? `${listing.image}` : '';
          };

        const getPrice = (productId) => {
          const listing = listings && listings.find(listing => listing.id === productId);
          return listing ? parseFloat(listing.price) : 0;
          };
          
        const getQuantity = (productId) => {
          const listing = listings && listings.find(listing => listing.id === productId);
          return listing ? `${listing.quantity}` : '';
          };

        const getShippingPrice = (productId) => {
          const listing = listings && listings.find(listing => listing.id === productId);
          return listing ? listing.shippingPrice : '';
        };

          const getImageExtension = (imageData) => {
            if (!imageData) {
              return '';
            }
          
            if (imageData[0] === 0xFF && imageData[1] === 0xD8 && imageData[2] === 0xFF) {
              return 'jpeg';
            }
            if (
              imageData[0] === 0x89 &&
              imageData[1] === 0x50 &&
              imageData[2] === 0x4E &&
              imageData[3] === 0x47 &&
              imageData[4] === 0x0D &&
              imageData[5] === 0x0A &&
              imageData[6] === 0x1A &&
              imageData[7] === 0x0A
            ) {
              return 'png';
            }
            return 'jpeg';
            };

        
            return (
              <>
               {items && items.map((item) => (
                <section className="vh-100 gradient-custom-2" >
                  <div className="container py-4 h-50 justify-content-center">
                    <div className="row d-flex align-items-center h-80 ">
                      <div className="col-md-7 col-lg-9" >
                        <div className="card card-stepper justify-content-center" style={{ borderRadius: '16px', width: '100%', marginLeft: '190px' }}>
                          <div className="card-header p-4 " >
                            <div className="d-flex justify-content-between align-items-center" >
                              <div>
                                <p className="text-muted mb-2">
                                  Order ID <span className="fw-bold text-body">{item.id}</span>
                                </p>
                                <p className="text-muted mb-0">
                                  Place On <span className="fw-bold text-body">{item.enteredOn}</span>
                                </p>
                              </div>
                              <div>
                              </div>
                            </div>
                          </div>
                          <div className="card-body p-4 " style={{ borderRadius: '16px' }}>
                            <div className="d-flex flex-row mb-4 pb-2 align-items-center">
                              <div className="flex-fill ">
                                <h3 className="bold mb-3">{getProductName(item.productId)}</h3>
                               
                                <h5 className="mb-3">
                               <span className="light">Product price:</span>  $ {getPrice(item.productId)}
                                </h5>
                                <h6 className="mb-3">
                                Shipping price: $ {getShippingPrice(item.productId)}
                                </h6>
                                <p className="text-muted">
                                  Tracking Status on: <span className="text-body">Shipped</span>
                                </p>
                              </div>
                              <div className="col-lg-8 justify-content-center">
                              <Link to={`/product/${item.productId}`} className="input-group-text p-3 justify-content-center mt-3" id="basic-addon2">
                          <img className="" src={`data:image/${getImageExtension(getimage(item.productId))};base64,${getimage(item.productId)}`} alt="Product" style={{ width: "40%", height: "auto", objectFit: "contain", marginLeft:'190px' }} />
                        </Link> 
                              </div>
                            </div>
                            <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                              <li className="step0 active" id="step1">
                                <span style={{ marginLeft: '22px', marginTop: '12px' }}>PLACED</span>
                              </li>
                              <li className="step0 active text-center" id="step2">
                                <span>SHIPPED</span>
                              </li>
                              <li className="step0 text-muted text-end" id="step3">
                                <span style={{ marginRight: '22px' }}>DELIVERED</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
             ))}
             </>
           );          
     }
//#endregion
  //#region MyListings    
  function MyListings() {
    const { userId } = useAuthToken();
    const [isAddListingVisible, setIsListingVisible] = useState(false);
    const [listings, setListings] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListing, setNewListing] = useState({
      OwnerId: '',
      Name: '',
      Quantity: '',
      Image: '',
      Specifications: '',
      Description: '',
      Price: '',
      ShippingPrice: '',
      CategoryId: '',
    });
    const [formErrors, setFormErrors] = useState({
      OwnerId: false,
      Name: false,
      Image: false,
      Specifications: false,
      Description: false,
      Price: false,
      ShippingPrice: false,
      CategoryId: false,
    });
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewListing((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    };

    const handleSelectedInputChange = (event) => {
      const { name, value } = event.target;
      setSelectedListing((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        setNewListing((prevState) => ({
          ...prevState,
          Image: base64Data,
        }));
      };
      reader.readAsDataURL(file);
    };
    
    const handleSelectedImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        setSelectedListing((prevState) => ({
          ...prevState,
          Image: base64Data,
        }));
      };
      reader.readAsDataURL(file);
    };
    const toggleListingForm = () => {
      setIsListingVisible(!isAddListingVisible);
    };
  
    useEffect(() => {
      fetchListingsFromDatabase();
      fetchCategories();
    }, [userId]);
  
    const fetchListingsFromDatabase = async () => {
      try {
        const response = await axios.get(`http://localhost:39450/api/Product/getByOwnerId?OwnerId=${userId}`);
        const products = response.data;
        console.log(products);
        setListings(products);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:39450/api/Category/getall');
          if (categoryResponse.status === 200) {
            const categoryData = categoryResponse.data;
            setCategory(categoryData);
          } else {
            console.error('Failed to fetch category data');
          }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const { Name, Quantity, Image, Specifications, Description, Price, CategoryId, ShippingPrice,} = newListing;
      const errors = {
        Name: Name.length === 0,
        Quantity: Quantity.length === 0,
        Image: Image.length === 0,
        Specifications: Specifications.length === 0,
        Price: Price.length === 0,
        ShippingPrice: ShippingPrice.length === 0,
        Description: Description.length === 0,
        CategoryId: CategoryId.length === 0,
      };
      const listingWithUserId = {
        ...newListing,
        OwnerId: userId, 
      };
      console.log(listingWithUserId);

      setFormErrors(errors);
      if (Object.values(errors).some((value) => value)) {
        return;
      }      

      axios
        .post('http://localhost:39450/api/Product/add', listingWithUserId)
        .then((response) => {
          console.log('Registration successful', response.data);
          window.alert('Registration successful');
          window.location.href = '/userdashboard';
        })
        .catch((error) => {
          console.error('Registration failed', error);
          window.alert('Registration failed');
        });
        toggleListingForm();
    };
    
    const deleteListing = async (id) => {
      try {
        const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
        if (confirmDelete) {
          await axios.delete(`http://localhost:39450/api/Product/delete?id=${id}`);
          fetchListingsFromDatabase();
          window.location.href = '/userdashboard';
        }
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    };

    const updateListing = async (id) => {
      try {
        const { Name, Quantity, Image, Specifications, Description, Price, CategoryId, ShippingPrice,} = selectedListing;
        const errors = {
          Name: Name && Name.length === 0,
          Quantity: Quantity && Quantity.length === 0,
          Image: Image && Image.length === 0,
          Specifications: Specifications && Specifications.length === 0,
          Price: Price && Price.length === 0,
          ShippingPrice: ShippingPrice && ShippingPrice.length === 0,
          Description: Description && Description.length === 0,
          CategoryId: CategoryId && CategoryId.length === 0,
        };
      
      setFormErrors(errors);
      if (Object.values(errors).some((value) => value)) {
        return;
      }      
      console.log(selectedListing)

        const confirmUpdate = window.confirm('Are you sure you want to update this listing?');
        if (confirmUpdate) {
          await axios.put(`http://localhost:39450/api/Product/update?id=${id}`, selectedListing);
          fetchListingsFromDatabase();
          closeModal();
          window.location.href = '/userdashboard';
        }
      } catch (error) {
        console.error('Error updating listing:', error);
      }
    };

    const openModal = (listing) => {
      setSelectedListing(listing);
      console.log(selectedListing)
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setIsModalOpen(false);
    };

    //#region Convert Image Extension
    const getImageExtension = (imageData) => {
      if (imageData[0] === 0xFF && imageData[1] === 0xD8 && imageData[2] === 0xFF) {
        return 'jpeg';
      }
      if (
        imageData[0] === 0x89 &&
        imageData[1] === 0x50 &&
        imageData[2] === 0x4E &&
        imageData[3] === 0x47 &&
        imageData[4] === 0x0D &&
        imageData[5] === 0x0A &&
        imageData[6] === 0x1A &&
        imageData[7] === 0x0A
      ) {
        return 'png';
      }
      return 'jpeg';
    };
    //#endregion
    
    return (
      <div id="shippingInfo">
        <div id="addressList" style={{ display: isAddListingVisible ? 'none' : 'block' }}>
          <div className="">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: '10px',
                width: '80%',
                backgroundColor: 'white',
                margin: 'auto',
                //marginTop:'10px',
                borderRadius: '10px',
              }}
            >
              <h1 style={{ fontSize: '35px', fontWeight: '400', padding: '5px' }}>My Listings</h1>
              <button className="btn btn-primary me-2" type="button" onClick={toggleListingForm}>
                Add Listing
              </button>
            </div>
            <div className="container rounded bg-white mt-5 mb-5">
              <div className="row" style={{ backgroundColor: '#bdbdbd' }}>
                <div className="col-md-12">
                    {listings && listings.map((listing) => (
                      <div class="container py-3">
                        <div class="row justify-content-center ">
                          <div class="col-md-12 col-xl-10">
                            <div class="border rounded-3" style={{padding: "20px", backgroundColor: "#fff"}}>
                                <div class="row">
                                  <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                    <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                      <img 
                                        src={`data:image/${getImageExtension(listing.image)};base64,${listing.image}`} 
                                        className="w-50"
                                        style={{ aspectRatio: "1/1"}} 
                                      />
                                      <a href="#!">
                                        <div class="hover-overlay">
                                          <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                  <div class="col-md-6 col-lg-6 col-xl-6">
                                    <h5>{listing.name}</h5>
                                    <div class="mt-1 mb-0 text-muted small">
                                      <p>{listing.specifications}</p>
                                    </div>
                                    <p class="text-truncate mb-4 mb-md-0">{listing.description}</p>
                                  </div>
                                  <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                    <div class="d-flex flex-row align-items-center mb-1">
                                      <h4 class="mb-1 me-1">${listing.price}</h4>
                                    </div>
                                    <h6 class="text-success">${listing.shippingPrice}</h6>
                                    <div class="d-flex flex-column mt-4">
                                      <button className="btn btn-primary btn-sm mt-2" type="button" onClick={() => openModal(listing)}>Update Listing</button>
                                      <button class="btn btn-outline-danger btn-sm mt-2" type="button" onClick={() => deleteListing(listing.id)}>Delete</button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                </div>
              </div>
            </div>
          </div>
        </div>
        <MDBModal show={isModalOpen} onHide={closeModal}>
          <div className="custom-modal" style={{ backgroundColor: "#fff", width: "50%", margin: "auto", padding: "20px", borderRadius: "20px", marginTop: "5%" }}>
            <div className="custom-modal-header" style={{ display: "flex", alignItems: "center" }}>
              <h5 className="modal-title mb-3" style={{ marginRight: "auto" }}>Listing Details</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="custom-modal-body">
              {selectedListing && (
                <div className="col-md-12">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Listing Details</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productName" className="labels">
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Product Name"
                          name="name"
                          value={selectedListing.name}
                          onChange={handleSelectedInputChange}
                      />
                      {formErrors.Name && <p className="text-danger">Product Name is required</p>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productQuantity" className="labels">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          className="form-control"
                          placeholder="Quantity"
                          name="quantity"
                          value={selectedListing.quantity}
                          onChange={handleSelectedInputChange}
                      />
                      {formErrors.Quantity && <p className="text-danger">Quantity is required</p>}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label htmlFor="productDescription" className="labels">
                      Specifications
                      </label>
                      <textarea 
                        style={{ height: "100px" }} 
                        id="specifications" 
                        className="form-control" 
                        placeholder="Specifications" 
                        name="specifications"
                        value={selectedListing.specifications}
                        onChange={handleSelectedInputChange}
                      />
                      {formErrors.Specifications && <p className="text-danger">Specifications is required</p>}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="productImages" className="labels">
                          Images
                        </label>
                        <input
                          type="file"
                          id="productImages"
                          className="form-control"
                          multiple
                          onChange={handleSelectedImageUpload}
                        />
                        {formErrors.Image && <p className="text-danger">Image is required</p>}
                        {/*  */}
                        <label htmlFor="category" className="labels">Category</label>
                        <select
                        className="form-control"
                        id="categoryId"
                        name="categoryId"
                        value={selectedListing.categoryId}
                        onChange={handleSelectedInputChange}
                        >
                        <option value="">Select Category</option>
                        {category.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                      {formErrors.CategoryId && <p className="text-danger">Category is required</p>}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="productDescription" className="labels">
                          Description
                        </label>
                        <textarea
                          id="description" 
                          className="form-control" 
                          placeholder="Product Description" 
                          name="description"
                          value={selectedListing.description}
                          onChange={handleSelectedInputChange}
                        />
                        {formErrors.Description && <p className="text-danger">Description is required</p>}
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Price" className="labels">
                                Price
                              </label>
                              <input
                                type="number"
                                id="price"
                                className="form-control"
                                placeholder="Price"
                                name="price"
                                value={selectedListing.price}
                                onChange={handleSelectedInputChange}
                              />
                              {formErrors.Price && <p className="text-danger">Price is required</p>}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="shippingPrice" className="labels">
                                Shipping Price
                              </label>
                              <input
                                type="number"
                                id="shippingPrice"
                                className="form-control"
                                placeholder="Shipping Price"
                                name="shippingPrice"
                                value={selectedListing.shippingPrice}
                                onChange={handleSelectedInputChange}
                              />
                              {formErrors.ShippingPrice && (
                                <p className="text-danger">Shipping Price is required</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button className="btn btn-primary me-2" type="submit" onClick={() => updateListing(selectedListing.id)}>Save Listing</button>
                    <button className="btn btn-danger" type="button" onClick={closeModal}>Cancel</button>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </MDBModal>


        <div
          id="add-edit-address"
          style={{ display: isAddListingVisible ? 'block' : 'none' }}
          className="container-userdashboard-tabs"
        >
          <div className="container-userdashboard-tabs">
            <div className="container rounded bg-white mt-5 mb-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Listing Details</h4>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productName" className="labels">
                            Product Name
                          </label>
                          <input
                            type="text"
                            id="Name"
                            className="form-control"
                            placeholder="Product Name"
                            name="Name"
                            value={newListing.Name}
                            onChange={handleInputChange}
                        />
                        {formErrors.Name && <p className="text-danger">Product Name is required</p>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productQuantity" className="labels">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="Quantity"
                            className="form-control"
                            placeholder="Quantity"
                            name="Quantity"
                            value={newListing.Quantity}
                            onChange={handleInputChange}
                        />
                        {formErrors.Quantity && <p className="text-danger">Quantity is required</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label htmlFor="productDescription" className="labels">
                        Specifications
                        </label>
                        <textarea 
                          style={{ height: "100px" }} 
                          id="Specifications" 
                          className="form-control" 
                          placeholder="Specifications" 
                          name="Specifications"
                          value={listings.Specifications}
                          onChange={handleInputChange}
                        />
                        {formErrors.Name && <p className="text-danger">Specifications is required</p>}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="productImages" className="labels">
                            Images
                          </label>
                          <input
                            type="file"
                            id="productImages"
                            className="form-control"
                            multiple
                            onChange={handleImageUpload}
                          />
                          {formErrors.Image && <p className="text-danger">Image is required</p>}
                          {/*  */}
                          <label htmlFor="category" className="labels">Category</label>
                          <select
                          className="form-control"
                          id="CategoryId"
                          name="CategoryId"
                          value={newListing.CategoryId}
                          onChange={handleInputChange}
                          >
                          <option value="">Select Category</option>
                          {category.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                        {formErrors.CategoryId && <p className="text-danger">Category is required</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="productDescription" className="labels">
                            Description
                          </label>
                          <textarea
                            id="Description" 
                            className="form-control" 
                            placeholder="Product Description" 
                            name="Description"
                            value={newListing.Description}
                            onChange={handleInputChange}
                          />
                          {formErrors.Description && <p className="text-danger">Description is required</p>}
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="Price" className="labels">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  id="Price"
                                  className="form-control"
                                  placeholder="Price"
                                  name="Price"
                                  value={newListing.Price}
                                  onChange={handleInputChange}
                                />
                                {formErrors.Price && <p className="text-danger">Price is required</p>}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="ShippingPrice" className="labels">
                                  Shipping Price
                                </label>
                                <input
                                  type="number"
                                  id="ShippingPrice"
                                  className="form-control"
                                  placeholder="Shipping Price"
                                  name="ShippingPrice"
                                  value={newListing.ShippingPrice}
                                  onChange={handleInputChange}
                                />
                                {formErrors.ShippingPrice && (
                                  <p className="text-danger">Shipping Price is required</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button className="btn btn-primary me-2" type="submit" onClick={handleFormSubmit}>Save Listing</button>
                      <button className="btn btn-danger" type="button" onClick={toggleListingForm}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //#endregion
  // #region ChangePassword
  function ChangePassword() {
    const { userId } = useAuthToken();
    const [showPassword, setShowPassword] = useState(false);
    const [changePassword, setChangePassword] = useState({
      OldPassword: '',
      NewPassword: '',
      ConfirmPassword: '',
    });
  
    const [formErrors, setFormErrors] = useState({
      OldPassword: false,
      NewPassword: false,
      ConfirmPassword: false,
    });
  
    const handleShowPasswordChange = () => {
      setShowPassword(!showPassword);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setChangePassword((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    };
  
    
const handleChangePassword = (event) => {
  event.preventDefault();
  const { OldPassword, NewPassword, ConfirmPassword } = changePassword;

  if (OldPassword === '' || NewPassword === '' || ConfirmPassword === '') {
    setFormErrors({
      OldPassword: OldPassword === '',
      NewPassword: NewPassword === '',
      ConfirmPassword: ConfirmPassword === '',
    });
    return;
  }

  if (NewPassword !== ConfirmPassword) {
    setFormErrors((prevState) => ({
      ...prevState,
      ConfirmPassword: true,
    }));
    return;
  }

  const requestBody = {
    oldPassword: OldPassword,
    newPassword: NewPassword,
  };

  axios
    .post(`http://localhost:39450/api/Auth/changepassword?id=${userId}`, requestBody)
    .then((response) => {
      console.log('Password changed successfully', response.data);
      window.location.href = '/userdashboard';
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setFormErrors((prevState) => ({
          ...prevState,
          OldPassword: true,
        }));
        console.error('Old password is incorrect');
      } else {
        console.error('Password change failed', error);
      }
    });
};
  
    return (
      <div className="container-userdashboard-tabs">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-12 border-right">
              <div className="p-3 py-5">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="oldPassword" className="labels"> Old Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="OldPassword"
                        placeholder="Old Password"
                        className={`form-control ${formErrors.OldPassword ? 'is-invalid' : ''}`}
                        value={changePassword.OldPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.OldPassword && changePassword.OldPassword === '' && (<div className="invalid-feedback">Old password is required</div>)}
                      {formErrors.OldPassword && changePassword.OldPassword !== '' && (<div className="invalid-feedback">Old password is incorrect</div>)}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="newPassword" className="labels"> New Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="NewPassword"
                        placeholder="New Password"
                        className={`form-control ${formErrors.NewPassword ? 'is-invalid' : ''}`}
                        value={changePassword.NewPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.NewPassword && <div className="invalid-feedback">New Password is required</div>}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="labels"> Confirm New Password </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="ConfirmPassword"
                        placeholder="Confirm New Password"
                        className={`form-control ${formErrors.ConfirmPassword ? 'is-invalid' : ''}`}
                        value={changePassword.ConfirmPassword}
                        onChange={handleInputChange}
                      />
                      {formErrors.ConfirmPassword && changePassword.ConfirmPassword === '' && (<div className="invalid-feedback">Please Confirm your New Password</div>)}
                      {formErrors.ConfirmPassword && changePassword.ConfirmPassword !== '' && (<div className="invalid-feedback">Passwords do NOT match</div>)}
                    </div>
                  </div>
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
                <div className="mt-5 text-center">
                  <button className="btn btn-primary me-2" type="button" onClick={handleChangePassword}> Change Password </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

//#endregion




export { PersonalInfo, ShippingInfo, PaymentDetails, MyOrders, MyListings, ChangePassword };

