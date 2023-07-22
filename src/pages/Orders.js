import React, { useEffect, useState } from "react";
import { Box, Button, Container, Input, Tab, Tabs, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { changeOrderStatus, getAllUsersOrders, getChangeOrderStatus } from "../api/Api";
import { useNavigate } from "react-router-dom";

const options = [
  'Open'
];

const ITEM_HEIGHT = 48;






const LongMenu = ({navigate, id}) => {
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
          <MenuItem  key={option} selected={option === 'Pyxis'} onClick={handleClose}>
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


  const [orderStatusChecker, setorderStatusChecker] = useState(false)

  const [orderGetStatus, setOrderGetStatus] = useState("NEW");

  const orderStatus = (e, status) => {
    e.preventDefault();
    getChangeOrderStatus({status}).then((res) => {
      console.log("Order Status - ", res);
      // if(res.data.order[0].orderUpdateWAPhone){
      //   // Regex expression to remove all characters which are NOT alphanumeric 
      // let number = res.data.order[0].orderUpdateWAPhone.replace(/[^\w\s]/gi, "").replace(/ /g, "");

      // // Appending the phone number to the URL
      //   let url = `https://web.whatsapp.com/send?phone=${number}`;
  
      // // Appending the message to the URL by encoding it
      //   let message = `Your Order Status ${res.data.order[0].orderUpdateWAPhone.orderId}`
      //   url += `&text=${encodeURI(message)}&app_absent=0`;
  
      // // Open our newly created URL in a new tab to send the message
      //   window.open(url); 
      // }
    }).catch((err) => {
      console.log("Error - ", err);
    });

  }


  const orderStatusChange = (e, status, id) => {
    e.preventDefault();
    changeOrderStatus({status, id}).then((res) => {
      console.log(res);
      if(res.data.order){
        setorderStatusChecker(!orderStatusChecker);
      }
    }).catch((err) => {
      console.log("Error - ", err);
    })
  }


  useEffect(() => {
    getAllOrders();
}, [orderStatusChecker]);


  return(
    <Container>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="NEW" {...a11yProps(1)} />
          <Tab label="ACCEPTED" {...a11yProps(2)} />
          <Tab label="DISPATCHED" {...a11yProps(3)} />
          <Tab label="SHIPPED" {...a11yProps(4)}/>
          <Tab label="OUT FOR DELIVERY" {...a11yProps(5)}/>
          <Tab label="DELIVERED" {...a11yProps(6)}/>
        </Tabs>
      </Box>
      <Container>
            <Input style={{borderRadius:"1rem", marginTop: "20px"}} type="text" placeholder="Search Orders" onChange={event => {setSearchTerm(event.target.value)}} />
          </Container>
      <CustomTabPanel value={value} index={0}>
    
          <div className="order-cont">
          
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "" && order.orderStatus === "NEW") {
                  return allOrders
                } else if (order._id.includes(searchTerm) && order.orderStatus === "NEW") {
                  return order
                }
              }).map((order, index) => {
  
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
                  style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
                  >
                  {order.paymentResponse.code === undefined ? (
                    <p style={{fontWeight: "bolder"}}>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
                    <p style={{color: "#ffffff"}}>
                      Payment Statuss - {order.paymentResponse.code}
                     </p> 
                    <p>
                      Payment Data - {order.paymentResponse.data.amount / 100}
                     </p> 
                    <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p>
                     </div> 
                   </div> 
                ) : (<p style={{
                  color:"red",
                  fontWeight: "bolder",
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button color="success"  onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
          
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="order-cont">
          
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "ACCEPTED")
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
              style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
              >
                  {order.paymentResponse.code === undefined ? (
                    <p>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
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
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="order-cont">
          
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "DISPATCHED")
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
              style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
              >
                  {order.paymentResponse.code === undefined ? (
                    <p>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
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
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <div className="order-cont">
          
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "SHIPPED")
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
              style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
              >
                  {order.paymentResponse.code === undefined ? (
                    <p>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
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
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
         
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <div className="order-cont">
          
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "OUTFORDELIVERY")
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
              style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
              >
                  {order.paymentResponse.code === undefined ? (
                    <p>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
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
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
      <div className="order-cont">
          
      {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
                console.log("5")
            if(order.orderStatus === "DELIVERED")
            return(
              <div className="order-card"  
              >
                <div onClick={() => navigate(`/order/${order._id}`)} style={{display: "grid", justifyContent: "center", gap: "65%", gridTemplateColumns: "1fr 1fr", alignItems: "center", width: "100%"}}>
                <div  style={{backgroundColor:"#548456", height: "7px", width: "80px", borderRadius: "20px"}} />
                <LongMenu onClick={() => navigate(`/order/${order._id}`)} navigate={navigate} id={order._id}/>
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
                  <div 
              style={order.paymentResponse.code === "PAYMENT_SUCCESS" ? {backgroundColor:"green" }:{backgroundColor: "red" }}
              >
                  {order.paymentResponse.code === undefined ? (
                    <p>
                      Payment is not processed
                    </p>
                  ) : (
                      null
                    )
  
                  }
                  <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
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
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
                <div>
                  User WhatsApp Order Automation - {order.orderUpdateWAPhone}
                </div>
                <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
              </div>
              </div>
           
            )
          })
            
          }
          
         </div>
          
      </CustomTabPanel>
     
    </Container>
  )
}

export default Orders;