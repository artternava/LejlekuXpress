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
              <div className="card" style={{height: "100px", backgroundColor:"#E4A11B"}}>
                <div className="card-body">
                  <h5 className="card-title">Payment Help</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
            <div className="col-3 col-md-2">
              <div className="card" style={{height: "100px", backgroundColor:"#AD1457"}}>
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
            <h3 className='text-center mb-4'>Quick Help</h3>
            <div class="accordion mb-5" id="accordionExample" style={{width: '50%'}}>
  <div class="accordion-item ">
  
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Can't reset password
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapsed" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Having trouble resetting your password?</strong>  If you're having trouble resetting your password, don't worry, we're here to assist you. To reset your password, simply click on the 'Can't Reset Password' button on the login page. This will direct you to the password reset page, where you'll be prompted to enter your registered email address. Once you've provided your email address, click on the 'Reset Password' button. You'll receive an email with further instructions on how to reset your password securely. Follow the instructions in the email, which may include clicking on a password reset link or entering a verification code. After successfully verifying your identity, you'll be able to create a new password for your account. Remember to choose a strong and unique password to ensure the security of your account. If you encounter any issues during the password reset process, please reach out to our support team for immediate assistance.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Forgot login information
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Forgot your login info?</strong>  If you have forgotten your login information, don't worry, we're here to help you regain access to your account. To retrieve your login information, click on the 'Forgot Login Information' link on the login page. You will be directed to a page where you can enter the email address associated with your account. After entering your email address, click on the 'Submit' button. We will then send an email to the provided address with instructions on how to recover your login information. Please check your email inbox, including the spam or junk folder, for this email. The instructions may include steps to reset your password, retrieve your username, or both, depending on the options available. If you encounter any difficulties or need further assistance, please don't hesitate to contact our support team, and we will be glad to assist you in accessing your account again.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Payment methods
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>About payment methods.</strong>  We offer a variety of convenient payment methods to ensure a seamless and secure transaction experience. When making a purchase, you can choose from multiple payment options to suit your preferences. We accept major credit cards such as Visa, Mastercard, and American Express, providing you with flexibility and ease of use. Additionally, we also support popular digital payment methods, including PayPal and Apple Pay, for a faster and more streamlined checkout process. These digital payment options offer enhanced security measures and enable you to make purchases without sharing your sensitive financial information. We are continuously exploring new payment methods to provide you with even more choices in the future. Rest assured, all payment transactions are encrypted and safeguarded to protect your data. If you have any questions or concerns regarding our payment methods, please don't hesitate to reach out to our customer support team, and we'll be happy to assist you.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Shipping address
      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>About shipping addresses.</strong>  To ensure a smooth and accurate delivery process, we require your shipping address when placing an order. During the checkout process, you will be prompted to enter your shipping address details. Please provide the complete and correct information to avoid any delays or issues with the delivery of your order. Make sure to include your full name, street address, city, state or province, postal code, and country. Double-check the accuracy of your address before finalizing your purchase. If you frequently ship items to different locations, you can save multiple shipping addresses in your account for added convenience. This allows you to easily select the desired address during the checkout process without having to re-enter the information each time. If you need to update or modify your saved shipping addresses, you can do so in your account settings. Ensuring the accuracy of your shipping address is essential to guaranteeing that your order reaches you in a timely manner. If you have any questions or encounter any difficulties related to shipping addresses, please don't hesitate to contact our customer support team for assistance.
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
