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

const columns = [
  { field: 'userId', headerName: 'ID', width: 70 },
  { field: 'userGoogleName', headerName: 'First name', width: 130 },
  { field: 'userName', headerName: 'Last name', width: 130 },
  {
    field: 'userEmail',
    headerName: 'Email',
    width: 90,
  },
  {
    field: 'userProfilePic',
    headerName: 'Profile Picture',
    width: 160,
    
  },
  {
    field: 'profileStatus',
    headerName: 'Profile status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'userVerificationCodeStatus',
    headerName: 'USer Verify',
    width: 160,
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'contactWAForAuto',
    headerName: 'Order Update Number',
    type: 'number',
    width: 150,
  },
  {
    field: 'userAuthCode',
    headerName: 'User Auth Code',
    sortable: false,
    width: 130,
  },
  {
    feild: 'more details',
    headerName: 'more details',
    width: 130
  }
];




const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const More = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769", more: `${More}`},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, profileStatus: "logged in", noOfProducts: 5, loggedInDate: "25/03/2023", email: "dummyemail@gmail.com", contactNumber: "8072002769"},
];

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
        <DataGrid
            rows={allUsers}
            columns={columns}
        />
        </div>
    </div>
  );
}