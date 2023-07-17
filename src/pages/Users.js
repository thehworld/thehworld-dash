import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllUsers } from '../api/Api';



export default function Users() {

  const [allUsers, setallUsers] = useState([]);

  const getAllUsersFetch = () => {
    getAllUsers().then((res) => {
        console.log("Users - ", res);
        setallUsers(res.data.allUsers);
    }).catch((err) => {
        console.log("Error - ", err);
    })
  }

  useEffect(() => {
    getAllUsersFetch()
  }, [])
  

  return (
    <div>
        <div style={{ height: "80vh", width: '100%' }}>
        <h3 style={{padding: "10px", textAlign: "center", marginTop: "20px"}} className="poppinsBold">USERS</h3>
        <div class="user-list">
        {allUsers && allUsers.map((user, index) => {
        return(
          <div class="user">
          <img src={user.userProfilePic} alt="User 1"/>
          <h3>Name: {user.userName}</h3>
          <p>Phone: {user.contactNumber}</p>
        </div>
       
        )
       })
       }
 
</div>
 
        </div>
    </div>
  );
}