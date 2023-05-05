import React from 'react'
import Meta from '../components/Meta'
import {AiFillDelete} from 'react-icons/ai'
import{Link} from 'react-router-dom'
const Cart = () => {
  return (
    <>
    <Meta title={"Cart"}></Meta>
    <section className='cart-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12'>
                    <div className='cart-header py-3 d-flex justify-content-between align-content-center'>
                        <h4 className='cart-col-1'>Product</h4>
                        <h4 className='cart-col-2'>Price</h4>
                        <h4 className='cart-col-3'>Quantity</h4>
                        <h4 className='cart-col-4'>Total</h4>
                    </div>
                    <div className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                            <div className='w-25'>
                                <img src='images/tab1.jpg' className='img-fluid' alt=''></img>
                            </div>
                            <div className='w-75'>
                                <p>GDffdhg</p>
                                <p>Size: hgf</p>
                                <p>Color: gfd</p>
                            </div>
                        </div>
                        <div className='cart-col-2'>
                            <h5 className='price'>$ 100</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                            <input className='form-control' type='number' name='' min={1} max={10} id=''></input>                              
                            </div>
                            <div>
                                <AiFillDelete className='text-danger'/>
                            </div>
                        </div>
                        <div className='cart-col-4'>
                        <h5 className='price'>$ 100</h5>
                        </div>
                    </div>
                    <div className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                            <div className='w-25'>
                                <img src='images/tab1.jpg' className='img-fluid' alt=''></img>
                            </div>
                            <div className='w-75'>
                                <p>GDffdhg</p>
                                <p>Size: hgf</p>
                                <p>Color: gfd</p>
                            </div>
                        </div>
                        <div className='cart-col-2'>
                            <h5 className='price'>$ 100</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                            <input className='form-control' type='number' name='' min={1} max={10} id=''></input>                              
                            </div>
                            <div>
                                <AiFillDelete className='text-danger'/>
                            </div>
                        </div>
                        <div className='cart-col-4'>
                        <h5 className='price'>$ 100</h5>
                        </div>
                    </div>
                </div>
                <div className='col-12 py-12 mt-4'>
                   <div className='d-flex justify-content-between align-items-baseline'>
                   <Link to="/Product" className='btn btn-primary me-2'>
                        Continue Shopping
                    </Link>
                    <div className='d-flex flex-column align-items-end'>
                        <h4>SubTotal: $ 100</h4>
                        <p>Taxes and shipping calculated at checkout</p>
                        <Link to="/checkout" className='btn btn-success me-2'>Checkout</Link>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    </section>
    
    
    
    
    
    
    
    
    </>
  )
}

export default Cart