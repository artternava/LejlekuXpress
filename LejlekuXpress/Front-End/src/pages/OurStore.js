import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'

const OurStore = () => {
  return (
    <>
    <Meta title="Our Store"></Meta>
    <BreadCrumb title = "Our Store"></BreadCrumb>
    <div className='store-wrapper home-wrapper-2 py5'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-3'>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Shop By Categories</h3>
                <div>
                  <ul className='ps-0'>
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Filter By</h3>
                <div>
                  <h5 className='sub-title'>Availability</h5>
              <div>
              <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id=''></input>
                      <label className='form-check-label' htmlfor=''>
                        In stock
                        </label>
                    
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id=''></input>
                      <label className='form-check-label' htmlfor=''>
                        Out of stock
                        </label>
                    
                  </div>
              </div>
              <h5 className='sub-title'>Price</h5>
              <div className='d-flex align-items-center gap-10'>
              <div className="form-floating">
                  <input type="email" className="form-control py-1" id="floatingInput" placeholder="From"/>
                  <label htmlfor="floatingInput">
                    From
                  </label>
              </div>
              <div className="form-floating">
                  <input type="email" className="form-control py-1" id="floatingInput" placeholder="To"/>
                  <label htmlfor="floatingInput">
                    To
                  </label>
              </div>
              </div>
              <h5 className='sub-title'>Color</h5>
              <div className='d-flex flex-wrap'>
                <ul className='colors ps-0' >
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
                </div>
                <h5 className='sub-title'>Size</h5>
                <div>
                <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-1'></input>
                      <label className='form-check-label' htmlfor='color'>
                        S (2)
                        </label>
                    
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-2'></input>
                      <label className='form-check-label' htmlfor='color-2'>
                        M (2)
                        </label>
                    
                  </div>
                  <div className='form-check'>
                    <input className='form-check-input' type='checkbox' value='' id='color-3'></input>
                      <label className='form-check-label' htmlfor='color-3'>
                        XXL (2)
                        </label>
                    
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Product Tags</h3>
                <div>
                  <div className='product-tag d-flex flex-wrap align-items-center gap-10'>
                        <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          Headphones
                        </span>
                        <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          Laptop
                        </span>
                        <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          Mobile
                        </span>
                        <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                          Wire
                        </span>
                        
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className='filter-title'>Random Product</h3>
                <div>
                  <div className='random.products d-flex'>
                    <div className='w-50'>
                        <img src='images/watch.jpg' className='img-fluid' alt='watch'></img>
                    </div>
                    <div className='w-50'>
                    <h5> Kids headphones bulk 10 pack multi colored</h5>
                    <p></p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className='col-9'></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OurStore