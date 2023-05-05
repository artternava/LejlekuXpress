import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Mail() {
  const generateMessageId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  const [messages] = useState([
        { id: 1, messageId: generateMessageId(), dateSent: "2023-04-27", sentFrom: "John Smith <john.smith@example.com>" },
        { id: 2, messageId: generateMessageId(), dateSent: "2023-04-28", sentFrom: "Jane Smith <jane.smith@example.com>" },
        { id: 3, messageId: generateMessageId(), dateSent: "2023-04-29", sentFrom: "Bob Johnson <bob.johnson@example.com>" },
        { id: 4, messageId: generateMessageId(), dateSent: "2023-04-30", sentFrom: "Emily Johnson <emily.johnson@example.com>" },
        { id: 5, messageId: generateMessageId(), dateSent: "2023-05-01", sentFrom: "Michael Williams <michael.williams@example.com>" },
        { id: 6, messageId: generateMessageId(), dateSent: "2023-05-02", sentFrom: "Olivia Williams <olivia.williams@example.com>" },
        { id: 7, messageId: generateMessageId(), dateSent: "2023-05-03", sentFrom: "David Brown <david.brown@example.com>" },
        { id: 8, messageId: generateMessageId(), dateSent: "2023-05-04", sentFrom: "Avery Brown <avery.brown@example.com>" },
        { id: 9, messageId: generateMessageId(), dateSent: "2023-05-05", sentFrom: "Brian Garcia <brian.garcia@example.com>" },
        { id: 10, messageId: generateMessageId(), dateSent: "2023-05-06", sentFrom: "Emma Garcia <emma.garcia@example.com>" },
        { id: 11, messageId: generateMessageId(), dateSent: "2023-05-07", sentFrom: "William Davis <william.davis@example.com>" },
        { id: 12, messageId: generateMessageId(), dateSent: "2023-05-08", sentFrom: "Ella Davis <ella.davis@example.com>" },
        { id: 13, messageId: generateMessageId(), dateSent: "2023-05-09", sentFrom: "Andrew Wilson <andrew.wilson@example.com>" },
        { id: 14, messageId: generateMessageId(), dateSent: "2023-05-10", sentFrom: "Grace Wilson <grace.wilson@example.com>" },
        { id: 15, messageId: generateMessageId(), dateSent: "2023-05-11", sentFrom: "Jacob Martinez <jacob.martinez@example.com>" },
        { id: 16, messageId: generateMessageId(), dateSent: "2023-05-12", sentFrom: "Chloe Martinez <chloe.martinez@example.com>" },
        { id: 17, messageId: generateMessageId(), dateSent: "2023-05-13", sentFrom: "Daniel Hernandez <daniel.hernandez@example.com>" },
        { id: 18, messageId: generateMessageId(), dateSent: "2023-05-14", sentFrom: "Victoria Hernandez <victoria.hernandez@example.com>" },
        { id: 19, messageId: generateMessageId(), dateSent: "2023-05-15", sentFrom: "Matthew Taylor <matthew.taylor@example.com>" },
  ]);
  

  const handleView = (id) => {
    const message = messages.find(message => message.id === id);
    console.log(message);
  };
  
  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 text-start">
          <h1 style={{fontSize: "35px"}}>Mail</h1>
        </div>
      </div>
  
      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Message ID</th>
            <th scope='col'>Date Sent</th>
            <th scope='col'>Sent From</th>
            <th scope='col'>Actions</th>
            <th scope='col'>Details</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {messages.map(message => (
            <tr key={message.id}>
              <td style={{fontWeight: "bold", color: "#0d6efd"}}>{message.messageId}</td>
              <td>{message.dateSent}</td>
              <td>{message.sentFrom}</td>
              <td>
                <button className="btn btn-success">Respond</button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleView(message.id)}>View</button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export { Mail } 