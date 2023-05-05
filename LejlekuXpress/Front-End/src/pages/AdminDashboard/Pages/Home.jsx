import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBCardHeader
} from 'mdb-react-ui-kit';


function Home() {
  

  return (
    <div>
      <MDBRow className="justify-content-center">
        <MDBCol md="3">
          <MDBCard background='primary' className='text-white mb-3'>
            <MDBCardHeader>Orders</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>230</MDBCardTitle>
              <MDBCardText>
                Total orders this month
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3">
          <MDBCard background='warning' className='mb-3'>
            <MDBCardHeader>Sales</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>$12,345</MDBCardTitle>
              <MDBCardText>
                Total sales this month
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3">
          <MDBCard background='success' className='text-white mb-3'>
            <MDBCardHeader>Transactions</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>1,234</MDBCardTitle>
              <MDBCardText>
                Total transactions this month
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3">
          <MDBCard background='danger' className='text-white mb-3'>
            <MDBCardHeader>Feedback</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>4.5/5</MDBCardTitle>
              <MDBCardText>
                Average customer feedback rating this month
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <div>
        
      </div>
    </div>
  );
  
}

export { Home };
