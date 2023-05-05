import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Users() {
  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          {/* <th scope='col'>Title</th> */}
          <th scope='col'>Status</th>
          <th scope='col'>Account Type</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>John Doe</p>
                <p className='text-muted mb-0'>john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          {/* <td>
            <p className='fw-normal mb-1'>Software engineer</p>
            <p className='text-muted mb-0'>IT department</p>
          </td> */}
          <td>
            <MDBBadge color='success' pill>
              Online
            </MDBBadge>
          </td>
          <td>Buyer</td>
          <td>
            <button className="btn btn-primary">Edit</button>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Alex Ray</p>
                <p className='text-muted mb-0'>alex.ray@gmail.com</p>
              </div>
            </div>
          </td>
          {/* <td>
            <p className='fw-normal mb-1'>Consultant</p>
            <p className='text-muted mb-0'>Finance</p>
          </td> */}
          <td>
            <MDBBadge color='danger' pill>
              Offline
            </MDBBadge>
          </td>
          <td>Buyer</td>
          <td>
          <button className="btn btn-primary">Edit</button>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Kate Hunington</p>
                <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
              </div>
            </div>
          </td>
          {/* <td>
            <p className='fw-normal mb-1'>Designer</p>
            <p className='text-muted mb-0'>UI/UX</p>
          </td> */}
          <td>
            <MDBBadge color='danger' pill>
              Offline
            </MDBBadge>
          </td>
          <td>Seller</td>
          <td>
          <button className="btn btn-primary">Edit</button>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export { Users }; 