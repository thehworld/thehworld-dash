import React, { useEffect, useState } from "react";
import { Box, Container, Input, Tab, Tabs, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsersOrders } from "../api/Api";
import { useNavigate } from "react-router-dom";

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


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function Orders() {
  const [value, setValue] = React.useState(0);
  const [allOrders, setallOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const navigate= useNavigate();
  const [isLoading, setisLoading] = useState(false);


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
  const isLoadingSection = () => {
    if(isLoading){
      return(
        <div className="loading">
          <div></div>
          <div></div>
        </div> 
      )
    }
  }
  return(
    <Container>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className="order-cont">
          <Container>
            <Input style={{borderRadius:"1rem"}} type="text" placeholder="Search Orders" onChange={event => {setSearchTerm(event.target.value)}} />
          </Container>
        {isLoadingSection()}
            {allOrders && allOrders.filter((order) => {
              if (searchTerm == "") {
                return allOrders
              } else if (order._id.includes(searchTerm)) {
                return order
              }
            }).map((order, index) => {
              console.log(order)

          return(
            <div className="order-card" onClick={() => navigate(`/order/${order._id}`)}>
              <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
              <div style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
              <LongMenu />
              </div>
              <p>order id: {order._id}</p>
              <p>order status: {order.paymentStatus}</p>
              <p>received date&time: {order.createdAt}</p>
              <p>pincode: {order.shipmentPincode}</p>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                return(
                  <>
                            <p>item item: {prod.product.productName}</p>
                            <p>item qty: {prod.qty}</p>
                            <p>item price: {prod.product.productPrice}</p>
                            <p>item discount price: {prod.product.productDiscountPrice}</p>
                  </>
                )
              })
              }
            <div>
              Order Payment - 
              <div>
              <p>Order Total - <b>{order.orderTotal}</b></p> 
              </div>
              {order.paymentResponse ? (
                <div>
                  <p>
                    Payment Status - {order.paymentResponse.code}
                   </p> 
                  <p>
                    Payment Data - {order.paymentResponse.data.amount / 100}
                   </p> 
                  <p>
                    Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                   </p> 
                 </div> 
              ) : (null)

              }
              <div>
                User WhatsApp Order Automation - {order.orderUpdateWAPhone}
              </div>
              <button>
                To Packing
              </button>
            </div>
            </div>
         
          )
        })
          
        }
        
       </div>
        
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="order-cont">
          <div className="order-card">
            <div style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
            <div style={{backgroundColor:"#548456", height: "7px", width: "30px", borderRadius: "20px"}} />
            <LongMenu />
            </div>
            <p>order id: 5852144</p>
            <p>order status: packing</p>
            <p>received date&time: 11/2/23, 15:43</p>
            <p>pincode: 641060</p>
            <p>ordered item: (1)hair gel, (2)hair oil</p>
            <p>order query: none</p>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
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
      </CustomTabPanel>
    </Container>
  )
}

export default Orders;