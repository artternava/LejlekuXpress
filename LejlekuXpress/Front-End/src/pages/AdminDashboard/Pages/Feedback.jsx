import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Feedback() {
  const generateFeedbackId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  const [feedbacks] = useState([
    { id: 1, feedbackId: generateFeedbackId(), dateSent: "2023-04-27", sentFrom: "John Smith <john.smith@example.com>", rating: 4 },
    { id: 2, feedbackId: generateFeedbackId(), dateSent: "2023-04-28", sentFrom: "Jane Smith <jane.smith@example.com>", rating: 5 },
    { id: 3, feedbackId: generateFeedbackId(), dateSent: "2023-04-29", sentFrom: "Mike Johnson <mike.johnson@example.com>", rating: 3 },
    { id: 4, feedbackId: generateFeedbackId(), dateSent: "2023-04-30", sentFrom: "Sarah Lee <sarah.lee@example.com>", rating: 5 },
    { id: 5, feedbackId: generateFeedbackId(), dateSent: "2023-05-01", sentFrom: "David Brown <david.brown@example.com>", rating: 4 },
    { id: 6, feedbackId: generateFeedbackId(), dateSent: "2023-05-02", sentFrom: "Emily Davis <emily.davis@example.com>", rating: 2 },
    { id: 7, feedbackId: generateFeedbackId(), dateSent: "2023-05-03", sentFrom: "Jason Chen <jason.chen@example.com>", rating: 5 },
    { id: 8, feedbackId: generateFeedbackId(), dateSent: "2023-05-04", sentFrom: "Lisa Wang <lisa.wang@example.com>", rating: 3 },
    { id: 9, feedbackId: generateFeedbackId(), dateSent: "2023-05-05", sentFrom: "Adam Lee <adam.lee@example.com>", rating: 4 },
    { id: 10, feedbackId: generateFeedbackId(), dateSent: "2023-05-06", sentFrom: "Lucas Smith <lucas.smith@example.com>", rating: 5 },
    { id: 11, feedbackId: generateFeedbackId(), dateSent: "2023-05-07", sentFrom: "Ava Chen <ava.chen@example.com>", rating: 2 },
    { id: 12, feedbackId: generateFeedbackId(), dateSent: "2023-05-08", sentFrom: "Oliver Kim <oliver.kim@example.com>", rating: 5 },
    { id: 13, feedbackId: generateFeedbackId(), dateSent: "2023-05-09", sentFrom: "Emma Davis <emma.davis@example.com>", rating: 3 },
    { id: 14, feedbackId: generateFeedbackId(), dateSent: "2023-05-10", sentFrom: "Ryan Lee <ryan.lee@example.com>", rating: 4 },
    { id: 15, feedbackId: generateFeedbackId(), dateSent: "2023-05-11", sentFrom: "Sophia Chen <sophia.chen@example.com>", rating: 5 },
    { id: 16, feedbackId: generateFeedbackId(), dateSent: "2023-05-12", sentFrom: "Daniel Kim <daniel.kim@example.com>", rating: 2 },
    { id: 17, feedbackId: generateFeedbackId(), dateSent: "2023-05-13", sentFrom: "Grace Davis <grace.davis@example.com>", rating: 5 },
  ]);
  
  const getRatingStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i className="bi bi-star-fill text-warning"></i>);
      } else {
        stars.push(<i className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  }

  const handleView = (id) => {
    const feedback = feedbacks.find(feedback => feedback.id === id);
    console.log(feedback);
  };
  
  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 text-start">
          <h1 style={{fontSize: "35px"}}>Feedback</h1>
        </div>
      </div>
  
      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Feedback ID</th>
            <th scope='col'>Date Sent</th>
            <th scope='col'>Sent From</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Details</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {feedbacks.map(feedback => (
            <tr key={feedback.id}>
              <td style={{fontWeight: "bold", color: "#0d6efd"}}>{feedback.feedbackId}</td>
              <td>{feedback.dateSent}</td>
              <td>{feedback.sentFrom}</td>
              <td>{getRatingStars(feedback.rating)}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleView(feedback.id)}>View</button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export { Feedback }
