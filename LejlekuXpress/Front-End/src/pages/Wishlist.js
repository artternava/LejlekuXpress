import React from 'react'


const items = [  {   
  name: "Iphone 14",
  quantity: 1,
  imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
  specification: ["Option 1", "Option 2", "Option 3"],
  description: "lorem ipsum",
  price: "1000", },  
  {   
    name: "Iphone 3g",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "100", },  
    {   
      name: "Nokia",
      quantity: 1,
      imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
      specification: ["Option 1", "Option 2", "Option 3"],
      description: "lorem ipsum",
      price: "800", }];

      function Wishlist() {
        
        return (
          <>
            {items.map((items) => (     
              <section style={{backgroundColor:"#fff" }}>
              <div class="container py-3">
                <div class="row justify-content-center ">
                  <div class="col-md-12 col-xl-10">
                    <div class="card shadow-0 border rounded-3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div class="bg-image hover-zoom ripple rounded ripple-surface">
                              <img src={items.imageSrc} class="w-50" />
                              <a href="#!">
                                <div class="hover-overlay">
                                  <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div class="col-md-6 col-lg-6 col-xl-6">
                            <h5>{items.name}</h5>
                            <div class="d-flex flex-row">
                              <div class="text-danger mb-1 me-2">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </div>
                              <span>310</span>
                            </div>
                            <div class="mt-1 mb-0 text-muted small">
                              <span>100% cotton</span>
                              <span class="text-primary"> • </span>
                              <span>Light weight</span>
                              <span class="text-primary"> • </span>
                              <span>Best finish<br /></span>
                            </div>
                            <div class="mb-2 text-muted small">
                              <span>Unique design</span>
                              <span class="text-primary"> • </span>
                              <span>For men</span>
                              <span class="text-primary"> • </span>
                              <span>Casual<br /></span>
                            </div>
                            <p class="text-truncate mb-4 mb-md-0">
                              There are many variations of passages of Lorem Ipsum available, but the
                              majority have suffered alteration in some form, by injected humour, or
                              randomised words which don't look even slightly believable.
                            </p>
                          </div>
                          <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div class="d-flex flex-row align-items-center mb-1">
                              <h4 class="mb-1 me-1">${items.price}</h4>
                              
                            </div>
                            <h6 class="text-success">Free shipping</h6>
                            <div class="d-flex flex-column mt-4">
                              <button class="btn btn-primary btn-sm" type="button">Add to Cart</button>
                              <button class="btn btn-outline-danger btn-sm mt-2" type="button">
                               Delete
                              </button>
                            </div>
                          </div>
                        </div>
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


export default Wishlist