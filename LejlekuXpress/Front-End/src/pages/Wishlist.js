import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'



const Wishlist = () => {
  return (
    <>
     <Meta title={"Wishlist"}></Meta>
    <BreadCrumb title = "Wishlist"></BreadCrumb>
    <div className='wishlist-wrapper home-wrapper-2 py5'></div>
    <div className='container-xxl'>
        <div className='row'>
          <div className='col-3'>
              <div className='wishlist-card position-relative' >
                <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'></img>
              </div>


              <div className='wishlist-card-image' >
                  <img src='images/watch.jpg'
                  className='img-fluid w-100' alt='watch'></img>
              </div>
            

            <div className='py-3'>
              <h5 className='title'> Apple Watch Series 7 (41mm, Aluminum, Blue)</h5>
              <h6 className='price'>$ 100</h6>
            </div>
          </div>
          <div className='col-3'>
              <div className='wishlist-card position-relative' >
                <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'></img>
              </div>


              <div className='wishlist-card-image' >
                  <img src='images/watch.jpg'
                  className='img-fluid w-100' alt='watch'></img>
              </div>
            

            <div className='py-3'>
              <h5 className='title'> Apple Watch Series 7 (41mm, Aluminum, Blue)</h5>
              <h6 className='price'>$ 100</h6>
            </div>
          </div>
          <div className='col-3'>
              <div className='wishlist-card position-relative' >
                <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'></img>
              </div>


              <div className='wishlist-card-image' >
                  <img src='images/watch.jpg'
                  className='img-fluid w-100' alt='watch'></img>
              </div>
            

            <div className='py-3'>
              <h5 className='title'> Apple Watch Series 7 (41mm, Aluminum, Blue)</h5>
              <h6 className='price'>$ 100</h6>
            </div>
          </div>
          <div className='col-3'>
              <div className='wishlist-card position-relative' >
                <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'></img>
              </div>


              <div className='wishlist-card-image' >
                  <img src='images/watch.jpg'
                  className='img-fluid w-100' alt='watch'></img>
              </div>
            

            <div className='py-3'>
              <h5 className='title'> Apple Watch Series 7 (41mm, Aluminum, Blue)</h5>
              <h6 className='price'>$ 100</h6>
            </div>
          </div>
          <div className='col-3'>
              <div className='wishlist-card position-relative' >
                <img src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid'></img>
              </div>


              <div className='wishlist-card-image' >
                  <img src='images/watch.jpg'
                  className='img-fluid w-100' alt='watch'></img>
              </div>
            

            <div className='py-3'>
              <h5 className='title'> Apple Watch Series 7 (41mm, Aluminum, Blue)</h5>
              <h6 className='price'>$ 100</h6>
            </div>
          </div>
          <div className='col-9'></div>
        </div>
      </div>

    </>

   
  )
}

export default Wishlist