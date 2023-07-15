import React, { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsersOrders } from "../api/Api";

const options = [
  'Edit',
  'Delete',
  'raise query',
];

const ITEM_HEIGHT = 48;





const LongMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}




function Orders() {
  const [value, setValue] = React.useState(0);
  const [allOrders, setallOrders] = useState([])

  const getAllOrders = () => {
      getAllUsersOrders().then((res) => {
          console.log("All Orders", res.data.orders);
          setallOrders(res.data.orders);
      }).catch((err) => {
        console.log("Error - ", err);
      })
  }
  
  useEffect(() => {
      getAllOrders();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return(
    <Container>
      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 450 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="All Orders" {...a11yProps(0)} />
        <Tab label="New Orders" {...a11yProps(1)} />
        <Tab label="Packed" {...a11yProps(2)} />
        <Tab label="In Transit" {...a11yProps(3)} />
        <Tab label="Shipped" {...a11yProps(4)} />
        <Tab label="Delivery waiting" {...a11yProps(5)} />
        <Tab label="Delivered" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        
        {allOrders.length > 0 && allOrders.map((order, index) => {
          return(
            <div className="order-cont">
            <div className="order-card">
              <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
              <div style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
              <LongMenu />
              </div>
              <h4>order id: {order._id}</h4>
              <h5>order status: {order.paymentStatus}</h5>
              <h5>received date&time: {order.createdAt}</h5>
              <h5>pincode: {order.shipmentPincode}</h5>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                return(
                  <>
                            <h5>item item: {prod.product.productName}</h5>
                            <p>item qty: {prod.qty}</p>
                            <p>item price: {prod.product.productPrice}</p>
                            <p>item discount price: {prod.product.productDiscountPrice}</p>
                  </>
                )
              })
              }

            </div>
          </div>
         
          )
        })
          
        }
        
       
        
       
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <h4>order id: 5852144</h4>
            <h5>order status: packing</h5>
            <h5>received date&time: 11/2/23, 15:43</h5>
            <h5>pincode: 641060</h5>
            <h5>ordered item: (1)hair gel, (2)hair oil</h5>
            <p>order query: none</p>
          </div>
        </div>
      </TabPanel>
    </Box>
    </Container>
  )
}

export default Orders;