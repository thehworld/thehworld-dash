import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, CardMedia, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAUser, getAllUsers } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import "./Users.css"


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
  

  const navigate = useNavigate();

  return (
    <div>
        <Container>
        <h3 style={{padding: "10px", textAlign: "center", marginTop: "20px"}} className="poppinsBold">USERS</h3>
        <div class="user-list">
        <div class="grid-container">
        {allUsers && allUsers.map((user, index) => {
        return(
          <div>
         <Card sx={{ display: 'flex' }} onClick={() => navigate(`/user/${user.userId}`)}>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
           <CardContent style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
            <img src={user.userProfilePic} style={{borderRadius: "100px"}}/>
             <Typography component="div" variant="h5">
             Name: {user.userName}
             </Typography>
             <Typography variant="subtitle1" color="text.secondary" component="div">
             Phone: {user.contactNumber}
             </Typography>
           </CardContent>
           </Box>
         
       </Card>
       </div>
       
        )
       })
       }

</div>
 
</div>
</Container>

        </div>
  );
}