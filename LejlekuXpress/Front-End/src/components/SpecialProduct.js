import React from "react";
import { Link } from "react-router-dom";

const items = [  {   
  name: "Iphone 14",
  quantity: 1,
  imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
  specification: ["Option 1", "Option 2", "Option 3"],
  description: "lorem ipsum",
  price: "1000", 
  category: "Laptop",},
  {   
    name: "Iphone 3g",
    quantity: 1,
    imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
    specification: ["Option 1", "Option 2", "Option 3"],
    description: "lorem ipsum",
    price: "100",   
    category: "Laptop",},
    {   
      name: "Nokia",
      quantity: 1,
      imageSrc: "https://www.att.com/idpassets/global/devices/phones/apple/apple-iphone-14/carousel/blue/blue-1.png",    
      specification: ["Option 1", "Option 2", "Option 3"],
      description: "lorem ipsum",
      price: "800",
      category: "Laptop", }];


      function SpecialProduct() {
        
        return (
          <>
            {items.map((items) => (     
              
               <div className="col-md-6 col-lg-4 mb-4 mb-md-0 ">
                <div className="mb-4">
               <div className="card">
                 <div className="d-flex justify-content-between p-3">
                   <p className="lead mb-0">Items of the day</p>     
                 </div>
                 <div className="text-center">
                 <img src={items.imageSrc} className="card-img-top align-items-center" alt="Gaming Laptop " style={{ width: '40%'}}/>
                 </div>
                 <div className="card-body">
                   <div className="d-flex justify-content-between">
                     <p className="small"><a href="#!" className="text-muted">{items.category}</a></p>
                   </div>
         
                   <div className="d-flex justify-content-between mb-3">
                     <h5 className="mb-0">{items.name}</h5>
                     <h5 className="text-dark mb-0">${items.price}</h5>
                   </div>
         
                   <div className="d-flex justify-content-between mb-2">
                     <p className="text-muted mb-0">Available: <span className="fw-bold">{items.quantity}</span></p> 
                     <div className="ms-auto text-warning">
                       
                     <button type="button" class="btn btn-danger btn-sm mb-2 me-4 " data-mdb-toggle="tooltip" title="Move to the wish list">
                        <i class="bi bi-heart-fill"></i>
                     </button>
                     
                     <button type="button" class="btn btn-warning btn-sm mb-2 " data-mdb-toggle="tooltip" title="Move to the wish list">
                     <i className="bi bi-cart4 "></i>
                     </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             </div>
            ))}
            </>
          );          
    }


export default SpecialProduct