/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react';
import useAuthToken from '../components/useAuthToken';
import axios from 'axios';

const Contact = () => {
  const { userId } = useAuthToken();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/User/getall');
      setUsers(response.data);
      console.log(users)
      console.log(userId)
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id.toString() === userId.toString());
    return user ? `${user.firstName} ${user.lastName}` : '';
  };


  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1>Hello, {getUserName(userId)}</h1>
            <div>
            <h3>How can we help you?</h3>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
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