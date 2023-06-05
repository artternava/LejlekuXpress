import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalHeader, MDBModalBody, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

function Products() {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchListings();
    fetchUsers();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/Product/getallnotapproved');
      setListings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/User/getall');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to approve this listing?');
      if (confirmDelete) {
        await axios.put(`http://localhost:39450/api/Product/updateisapproved?id=${id}`);
        fetchListings();
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:39450/api/Product/delete?id=${id}`);
        fetchListings();
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handleView = (id) => {
    const listing = listings.find(listing => listing.id === id);
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const getUserName = (ownerId) => {
    const user = users.find(user => user.id === ownerId);
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getImageExtension = (imageData) => {
    if (!imageData) {
      return '';
    }

    if (imageData[0] === 0xFF && imageData[1] === 0xD8 && imageData[2] === 0xFF) {
      return 'jpeg';
    }
    if (
      imageData[0] === 0x89 &&
      imageData[1] === 0x50 &&
      imageData[2] === 0x4E &&
      imageData[3] === 0x47 &&
      imageData[4] === 0x0D &&
      imageData[5] === 0x0A &&
      imageData[6] === 0x1A &&
      imageData[7] === 0x0A
    ) {
      return 'png';
    }
    return 'jpeg';
  };
  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 text-start">
          <h1 style={{ fontSize: "35px" }}>Manage Listings</h1>
        </div>
      </div>

      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Seller</th>
            <th scope='col'>Details</th>
            <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {listings.map(listing => (
            <tr key={listing.id}>
              <td>{listing.name}</td>
              <td>${listing.price}</td>
              <td>{getUserName(listing.ownerId)}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleView(listing.id)}>View</button>
              </td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleApprove(listing.id)}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleReject(listing.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <MDBModal show={isModalOpen} onHide={closeModal}>
        <div className="custom-modal" style={{backgroundColor: "#fff", width: "50%", margin: "auto", padding: "20px", borderRadius: "20px", marginTop: "10%"}}>
        <div className="custom-modal-header" style={{ display: "flex", alignItems: "center" }}>
          <h5 className="modal-title mb-3" style={{ marginRight: "auto" }}>Listing Details</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
          <div className="custom-modal-body">
            {selectedListing && (
              <div className="row">
              <div className="col-md-6">
                <div>
                  <h4>{selectedListing.name}</h4>
                  <p><b>Price: </b>${selectedListing.price}</p>
                  <p><b>Shipping Price: </b>${selectedListing.shippingPrice}</p>
                  <p><b>Seller: </b>{getUserName(selectedListing.ownerId)}</p>
                  <p><b>Specifications: </b>{selectedListing.specifications}</p>
                  <p><b>Description: </b>{selectedListing.description}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <img src={`data:image/${getImageExtension(selectedListing.image)};base64,${selectedListing.image}`} alt="Product" style={{width: "300px"}}/>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </MDBModal>
    </div>
  );
}

export { Products };
