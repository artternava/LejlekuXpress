import React, { useState, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import useAuthToken from '../../../components/useAuthToken';

function Users() {
  const { userId } = useAuthToken();
  const [userData, setUserData] = useState([]);
  const [rolesData, setRolesData] = useState([]);

  async function fetchUserDetails() {
    try {
      const [usersResponse, rolesResponse] = await Promise.all([
        axios.get('http://localhost:39450/api/User/getall'),
        axios.get('http://localhost:39450/api/Roles/getall')
      ]);

      if (usersResponse.status === 200 && rolesResponse.status === 200) {
        const users = usersResponse.data;
        const roles = rolesResponse.data;

        setUserData(users);
        console.log(userData);
        setRolesData(roles);
      } else {
        console.error('Failed to fetch user or role data');
      }
    } catch (error) {
      console.error('An error occurred while fetching user or role data', error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const getRoleNameById = (roleId) => {
    const role = rolesData.find((role) => role.id === roleId);
    return role ? role.type : '';
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
  const deleteUser = async (id) => {
      try {
        if (id.toString() === userId.toString()) {
          window.alert('You can\'t delete your own user');
          return;
        }
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
          await axios.delete(`http://localhost:39450/api/User/delete?id=${id}`);
          fetchUserDetails();
          window.location.href = '/userdashboard';
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const makeMod = async (id) => {
      try {
        const confirmDelete = window.confirm('Are you sure you want to make this user a moderator?');
        if (confirmDelete) {
          await axios.put(`http://localhost:39450/api/User/makemod?id=${id}`);
          fetchUserDetails();
          window.location.href = '/userdashboard';
        }
      } catch (error) {
        console.error('Error making this user a moderator:', error);
      }
    };

  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Account Type</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {userData.map(user => (
          <tr key={user.id}>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src={`data:image/${getImageExtension(user.profilePicture)};base64,${user.profilePicture}`}
                  alt=''
                  style={{ width: '45px', height: '45px', aspectRatio: "1/1", borderRadius: "50%", }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{user.firstName} {user.lastName}</p>
                  <p className='text-muted mb-0'>{user.email}</p>
                </div>
              </div>
            </td>
            <td>{getRoleNameById(user.roleId)}</td>
            <td>
              {user.id.toString() === userId && (
                <button className="btn btn-success me-2" type="button">Session</button>
              )}
              {user.id.toString() !== userId && (
                <button className="btn btn-danger me-2" type="button" onClick={() => deleteUser(user.id)}>Delete</button>
              )}
              {user.roleId !== 1 && user.roleId !== 2 && (
                <button className="btn btn-primary" type="button" onClick={() => makeMod(user.id)}>Make Mod</button>
              )}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}

export { Users };
