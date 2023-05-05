import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Transactions() {
  const generateTransactionId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "#";
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  const [listings, setListings] = useState([
      { id: 1, invoice: "#X9G5K6S", price: 249.99, seller: "David Lee", buyer: "John Smith", status: "Waiting" },
      { id: 2, invoice: "#J7A3M8Z", price: 899.99, seller: "Mark Johnson", buyer: "Emily Chen", status: "Completed" },
      { id: 3, invoice: "#R2F6N9P", price: 399.99, seller: "Emily Chen", buyer: "David Lee", status: "Waiting" },
      { id: 4, invoice: "#K4L9A7J", price: 149.99, seller: "John Smith", buyer: "Emily Chen", status: "Completed" },
      { id: 5, invoice: "#H3N8D6M", price: 799.99, seller: "David Lee", buyer: "Mark Johnson", status: "Waiting" },
      { id: 6, invoice: "#M6R9Z5X", price: 599.99, seller: "Emily Chen", buyer: "John Smith", status: "Completed" },
      { id: 7, invoice: "#G2L6K9N", price: 199.99, seller: "Mark Johnson", buyer: "David Lee", status: "Waiting" },
      { id: 8, invoice: "#C8R2N6J", price: 299.99, seller: "John Smith", buyer: "Emily Chen", status: "Waiting" },
      { id: 9, invoice: "#P7T9Z4L", price: 999.99, seller: "David Lee", buyer: "Mark Johnson", status: "Completed" },
      { id: 10, invoice: "#D5R8N2M", price: 499.99, seller: "Emily Chen", buyer: "John Smith", status: "Completed" }
  ]);
  

  const handleView = (id) => {
    const listing = listings.find(listing => listing.id === id);
    console.log(listing);
  };
  
  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 text-start">
          <h1 style={{fontSize: "35px"}}>Manage Transactions</h1>
        </div>
      </div>
  
      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Invoice</th>
            <th scope='col'>Price</th>
            <th scope='col'>Seller</th>
            <th scope='col'>Buyer</th>
            <th scope='col'>Status</th>
            <th scope='col'>Details</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {listings.map(listing => (
            <tr key={listing.id}>
              <td style={{fontWeight: "bold", color: "#0d6efd"}}>{listing.invoice}</td>
              <td>${listing.price}</td>
              <td>{listing.seller}</td>
              <td>{listing.buyer}</td>
              <td>
                {listing.status === "Waiting" && <span className="badge bg-warning text-dark">Waiting</span>}
                {listing.status === "Completed" && <span className="badge bg-success">Completed</span>}
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleView(listing.id)}>View</button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export { Transactions }