import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Products() {
    const [listings, setListings] = useState([
        { id: 1, name: "Samsung Galaxy A12", price: 249.99, seller: "David Lee", status: "pending" },
        { id: 2, name: "Sony Bravia 55 inch TV", price: 899.99, seller: "Mark Johnson", status: "approved" },
        { id: 3, name: "Apple Watch Series 6", price: 399.99, seller: "Emily Chen", status: "rejected" },
        { id: 4, name: "Canon EOS M50", price: 649.99, seller: "Robert Smith", status: "pending" },
        { id: 5, name: "Microsoft Surface Laptop 4", price: 1199.99, seller: "Sophia Lee", status: "approved" },
        { id: 6, name: "Bose QuietComfort Earbuds", price: 279.99, seller: "Michael Brown", status: "rejected" },
        { id: 7, name: "Lenovo IdeaPad Gaming 3", price: 849.99, seller: "Erica Davis", status: "pending" },
        { id: 8, name: "Xbox Series X", price: 499.99, seller: "Andrew Wilson", status: "approved" },
        { id: 9, name: "Samsung Galaxy Watch 4", price: 349.99, seller: "Jennifer Kim", status: "rejected" },
        { id: 10, name: "LG Gram 16", price: 1299.99, seller: "John Smith", status: "pending" },
        { id: 11, name: "Dyson V11 Absolute", price: 599.99, seller: "Rachel Johnson", status: "approved" },
        { id: 12, name: "Apple iPad Pro", price: 899.99, seller: "Kevin Lee", status: "rejected" },
        { id: 13, name: "Garmin Forerunner 945", price: 599.99, seller: "Amanda Chen", status: "pending" },
        { id: 14, name: "Dell XPS 13", price: 1199.99, seller: "Jack Wilson", status: "approved" },
        { id: 15, name: "Beats Studio Buds", price: 149.99, seller: "Amy Davis", status: "rejected" }
      ]);
      

  const handleApprove = (id) => {
    const updatedListings = listings.map(listing => {
      if (listing.id === id) {
        return { ...listing, status: "approved" };
      } else {
        return listing;
      }
    });
    setListings(updatedListings);
  };

  const handleReject = (id) => {
    const updatedListings = listings.map(listing => {
      if (listing.id === id) {
        return { ...listing, status: "rejected" };
      } else {
        return listing;
      }
    });
    setListings(updatedListings);
  };
  const handleView = (id) => {
    const listing = listings.find(listing => listing.id === id);
    console.log(listing);
  };
  
  
  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 text-start">
          <h1 style={{fontSize: "35px"}}>Manage Listings</h1>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-success me-2" onClick={() => {}}>Approve All</button>
          <button className="btn btn-danger" onClick={() => {}}>Reject All</button>
        </div>
      </div>
  
      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Seller</th>
            <th scope='col'>Status</th>
            <th scope='col'>Details</th>
            <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {listings.map(listing => (
            <tr key={listing.id}>
              <td>{listing.name}</td>
              <td>${listing.price}</td>
              <td>{listing.seller}</td>
              <td>
                {listing.status === "pending" && <span className="badge bg-warning text-dark">Pending</span>}
                {listing.status === "approved" && <span className="badge bg-success">Approved</span>}
                {listing.status === "rejected" && <span className="badge bg-danger">Rejected</span>}
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleView(listing.id)}>View</button>
              </td>
              <td>
                {listing.status === "pending" && (
                  <>
                    <button className="btn btn-success me-2" onClick={() => handleApprove(listing.id)}>Approve</button>
                    <button className="btn btn-danger" onClick={() => handleReject(listing.id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
  
  
}

export { Products }

