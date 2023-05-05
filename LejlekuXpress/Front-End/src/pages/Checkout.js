import React from 'react'
import Meta from '../components/Meta'
import{Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
const Checkout = () => {
  return (
    <>
    <Meta title={"Checkout"}></Meta>
    <div className='checkout-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
            <div className='row'>
            <div className='col-7'>
                <div className='checkout-left-data'>
                    <h3 className='website-name'>Dev corner</h3>
                    <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                     <ol className="breadcrumb">
                     <li className="breadcrumb-item"><Link className='text-dark' to="/cart">Cart</Link></li>
                     &nbsp; /
                     <li className="breadcrumb-item total-price active" aria-current="page">
                        Information
                    </li>
                    &nbsp; /
                     <li className="breadcrumb-item total-price active">Shipping</li>
                     &nbsp; /
                     <li className="breadcrumb-item total-price active" aria-current="page">Payment</li>
                    </ol>
                    </nav>
                    <h4 className='title total'>Contact Information</h4>
                    <p className='user-details total'>
                        Ardit Beqaj (ardit@gmail.com)
                    </p>
                    <h4 className='mb-3'>Shipping</h4>
                    <form action='' className='d-flex gap-15 flex-wrap justify-content-between'>
                        <div className='w-100'>
                            <select name='' className='form-control form-select' id=''>
                                <option value="" selected disabled>
                                    Select Country
                                </option>
                            </select>
                        </div>
                        <div className='flex-grow-1'>
                            <input type='text' placeholder='First Name' className='form-control'></input>
                        </div>
                        <div className='flex-grow-1'>
                            <input type='text' placeholder='Last Name' className='form-control'></input>
                        </div>
                        <div className='w-100'>
                            <input type='text' placeholder='Address' className='form-control'></input>
                        </div>
                        <div className='w-100'>
                            <input type='text' placeholder='Apartment' className='form-control'></input>
                        </div>
                        <div className='flex-grow-1'>
                            <input type='text' placeholder='City' className='form-control'></input>
                        </div>
                        <div className='flex-grow-1'>
                            <select name='' className='form-control form-select' id=''>
                            <option value="" selected disabled>
                                    Select State
                                </option>
                            </select>
                        </div>
                        <div className='flex-grow-1'>
                            <input type='text' placeholder='ZipCode' className='form-control'></input>
                        </div>
                        <div className='w-100'>
                        <div className='d-flex justify-content-between align-item-center'>
                            <Link to='/cart' className='text-dark'>
                                <BiArrowBack className='me-2'/>
                                Return to Cart
                                </Link>
                            <Link to='/#'className='button'>Continue Shipping</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>            
            <div className='col-5'>
                <div className='border-bottom py-4'>
                   <div className='d-flex gap-10 mb-3 align-items-center'>
                   <div className='w-75 d-flex gap-10 border-bottom py-4'>
                        <div className='w-25 position-relative'>
                            <span style={{top:"-10px",right:"2px"}} className='badge be-secondary text-black rounded-circles p-3 position-absolute'>1</span>
                            <img className='img-fluid' src='images/laptop.jpg' alt='product'></img>
                        </div>
                        <div>
                            <h5 className='total-price1'> Laptop</h5>
                            <p className='total-price1'>s/ sadsda</p>
                        </div>
                    </div>
                    <div className='flex-grow'>
                        <h5 className='total'>$ 100</h5>
                    </div>
                   </div>
                   <div className='d-flex gap-10 mb-2 align-items-center'>
                   <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                            <span style={{top:"-10px",right:"2px"}} className='badge be-secondary text-black rounded-circles p-3 position-absolute'>1</span>
                            <img className='img-fluid' src='images/laptop.jpg' alt='product'></img>
                        </div>
                        <div>
                            <h5 className='total-price1'> Laptop</h5>
                            <p className='total-price1'>s/ sadsda</p>
                        </div>
                    </div>
                    <div className='flex-grow'>
                        <h5 className='total'>$ 100</h5>
                    </div>
                   </div>
                </div>
                <div className='border-bottom py-4'>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='total'>Subtotal</p>
                    <p className='total-price'>$ 10000</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-0'>Shipping</p>
                    <p className='mb-0'>$ 10000</p>
                </div>
                </div>
                <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                    <h4 className='total'>Total</h4>
                    <h5 className='total-price'>$ 10000</h5>
                </div>
            </div>
            </div>
        </div>
    </div>

 </>
  )
}

export default Checkout