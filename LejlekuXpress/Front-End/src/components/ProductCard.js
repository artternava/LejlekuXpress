import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const ProductCard = () => {
  return (
    <div className='col-3'>
    <Link to=":id" className='product-card position-relative'>
        <div className='wishlist-icon position-absolute'>
            <Link>
            <img src='images/wish.svg' alt='wishlist'></img>
            </Link>
        </div>
        <div className='product-image'>
            <img src='images/tab.jpg' className='img-fluid' alt='product img'></img>
            <img src='images/tab1.jpg'className='img-fluid'  alt='product img'></img>
        </div>
        <div className='product-details'>
            <h6 className='brand'>Havels</h6>
            <h5 className='product-title'>
                Samsung tablet 
            </h5>
            <ReactStars count={5} size={24} value="3" edit={false} activeColor="#ffd700"/>
            <p className='price'>$100.00</p>
        </div>
        <div className='action-bar position-absolute'>
            <div className='d-flex flex-column gap-10'>
                <Link>
                    <img src='images/view.svg' alt='view'></img>
                </Link>
                <Link>
                    <img src='images/add-cart.svg' alt='addcart'></img>
                </Link>
                
            </div>
        </div>
    </Link>
    </div> 
  )
}

export default ProductCard