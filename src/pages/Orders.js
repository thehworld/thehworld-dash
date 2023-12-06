import React, { useEffect, useState } from "react";
import { Box, Input, Select, Tab, Tabs, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { changeOrderStatus, getAllUsersOrders, getChangeOrderStatus, getOrdersbyfilter } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import moment from "moment/moment";
import Modal from '@mui/material/Modal';
import PreviewIcon from '@mui/icons-material/Preview';
import UpdateIcon from '@mui/icons-material/Update';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreIcon from '@mui/icons-material/More';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import More from "@mui/icons-material/More";


const options = [
  'Open'
];

const modelsstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#f0f0f0',
  border: '2px solid #3498db',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  color: '#333',
  fontFamily: 'Arial, sans-serif',
};


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
  const [isopen,setIsopen]= useState(false);
  const [modaldata,setModaldata]= useState(false);
  const [setorderstatus,setSetOrderStatus] = useState('');
  const [statusCount,setStatusCount] = useState('');
  const [orderStatusChecker, setorderStatusChecker] = useState(false);
  const [orderfilters,setOrderFilters] = useState({
         orderStatus:"NEW",
         Time:""
  });

  const handleOpen = () => setIsopen(true);
  const handleClose = () => setIsopen(false);


  const getAllOrders = () => {
      // getAllUsersOrders().then((res) => {
      //     console.log("All Orders", res.data);
      //     // setallOrders(res.data.orders);
      // }).catch((err) => {
      //   console.log("Error - ", err);
      // })

      getOrdersbyfilter(orderfilters).then((res) => {
        // console.log("All Orders", res.data);
        setallOrders(res.data.orders);
        setStatusCount(res.data.statusCounts)
    }).catch((err) => {
      console.log("Error - ", err);
    })
  }
  

  useEffect(() => {
    getAllOrders()
  }, [orderfilters , orderStatusChecker])
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
     if (newValue === 0) {
      orderfilters.orderStatus =  "NEW" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 1) {
      orderfilters.orderStatus =  "ACCEPTED" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 2) {
      orderfilters.orderStatus =  "DISPATCHED" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 3) {
      orderfilters.orderStatus = "SHIPPED"  ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 4) {
      orderfilters.orderStatus =  "OUTFORDELIVERY" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 5) {
      orderfilters.orderStatus =  "DELIVERED" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 6) {
      orderfilters.orderStatus =  "" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 7) {
      orderfilters.orderStatus =  "RETURN INIT" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 8) {
      orderfilters.orderStatus =  "RETURN DONE" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 9) {
      orderfilters.orderStatus =  "REFUND INIT" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 10) {
      orderfilters.orderStatus =  "REFUNDED" ;
      setOrderFilters({...orderfilters});      
     }
     if (newValue === 11) {
      orderfilters.orderStatus =  "CANCELLED" ;
      setOrderFilters({...orderfilters});      
     }
     

     orderfilters.Time = "";
     setOrderFilters({...orderfilters});
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



  const [orderGetStatus, setOrderGetStatus] = useState("NEW");

  const orderStatus = (e, status) => {
    e.preventDefault();
    getChangeOrderStatus({status}).then((res) => {
      console.log("Order Status - ", res);
      if(res.data.order[0].orderUpdateWAPhone){
        // Regex expression to remove all characters which are NOT alphanumeric 
      let number = res.data.order[0].orderUpdateWAPhone.replace(/[^\w\s]/gi, "").replace(/ /g, "");

      // Appending the phone number to the URL
  
      // Appending the message to the URL by encoding it
        let message = `Your Order Status ${res.data.order[0].orderUpdateWAPhone.orderId}`
        let url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURI(message)}`;
        window.open(url); 
      }
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
        sendUserWhatAppOrderStatusAuto(res.data.order);
      }
    }).catch((err) => {
      console.log("Error - ", err);
    })
  }


  useEffect(() => {
    // getAllOrders();
}, [orderStatusChecker]);



  const sendUserWhatAppOrderStatusAuto = (orderDetails) => {
      // console.log("Order Status - ", orderDetails);
      let message = `\t\t\t\t THE H WORLD 🌿 \n\n Your Order Status ${orderDetails.orderId} has been updated 😊`;
      let productString = [];
      orderDetails.orderProduct.map((ord, index) => {
          productString += `\n\n *SNo:* ${index + 1}\n *Product No:* ${ord.product.productId}\n *Product Name:* ${ord.product.productName} \n *Product Qty:* ${ord.qty}`
      })
      message+=productString;
      let orderStatus = `\n\n\n - *Order Status - ${orderDetails.orderStatus}*`
      message+=orderStatus;
      let url = `https://web.whatsapp.com/send?phone=+91${orderDetails.orderUpdateWAPhone}&text=${encodeURI(message)}`;
      window.open(url); 
  }


  const sendUserWhatAppOrderStatus = (e, status, orderDetails) => {
      e.preventDefault();
      console.log("Order Status - ", orderDetails);
      let message = `\t\t\t\t THE H WORLD 🌿 \n\n Your Order Status ${orderDetails.orderId} has been updated 😊`;
      let productString = [];
      orderDetails.orderProduct.map((ord, index) => {
          productString += `\n\n *SNo:* ${index + 1}\n *Product No:* ${ord.product.productId}\n *Product Name:* ${ord.product.productName} \n *Product Qty:* ${ord.qty}`
      })
      message+=productString;
      let orderStatus = `\n\n\n - *Order Status - ${orderDetails.orderStatus}*`
      message+=orderStatus;
      let url = `https://web.whatsapp.com/send?phone=${orderDetails.orderUpdateWAPhone}&text=${encodeURI(message)}`;
      window.open(url); 
  }



  const tabNames = ["NEW", "ACCEPTED", "DISPATCHED", "SHIPPED", "OUTFORDELIVERY", "DELIVERED", "ALL", "RETURN INIT", "RETURN DONE", "REFUND INIT", "REFUNDED", "CANCELLED"];

  const orderTables = (status)=>{
    return(
    <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell style={{fontWeight:"bolder",color:"brown"}}> Order id </TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}> Order Status</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Rec date&time</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Pincode</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Order</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Order Total</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Payment</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Whatsapp no.</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>Change Status</TableCell>
          <TableCell align="right" style={{fontWeight:"bolder",color:"brown"}}>more details</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
      {isLoadingSection()}
              {allOrders && allOrders.filter((order) => { 
                if(status === ""){
                if (searchTerm == "" && order.orderStatus === status ) {
                  return allOrders
                } else if (order._id.includes(searchTerm) && order.orderStatus === status) {
                  return order
                }
              }
              else{
                return order
              }
              }).map((row, index) => <>  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                >
                  {index+1}.                 
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                <div onClick={() => navigate(`/order/${row._id}`)} style={{cursor:"pointer"}}>{row?._id}</div>
              </TableCell>
              <TableCell align="right">{row.orderStatus}</TableCell>
              <TableCell align="right">{moment(row.createdAt).format("MMMM Do YYYY, h:mm a")}</TableCell>
              <TableCell align="right"><div style={{backgroundColor:"violet",color:"white",padding:'5px',borderRadius:"7px"}}> {row.shipmentPincode} </div></TableCell>
              <TableCell align="right"> {row.orderProduct.length && row.orderProduct.map((product, index) => {
                    
                    return(
                      <div style={{color:"green",cursor:"pointer"}}>
                        <PreviewIcon style={{width:"40px",height:"40px"}}  onClick={()=>{setIsopen(true);setModaldata(product)}}/> 
                      </div>
                    )
                  })
                  }
              </TableCell>
              <TableCell align="right" style={{fontWeight:"bolder"}}>₹{Math.floor(row.orderTotal)}</TableCell>
              <TableCell align="right">
              {row.paymentResponse ? (
                <div 
                  style={(row.paymentResponse.code === "PAYMENT_SUCCESS" || row.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}
                  >
                      {row.paymentResponse.code === undefined ? (
                        <p>
                          Payment is not processed
                        </p>
                      ) : (
                          null
                        )
      
                      }
                      <div style={{borderRadius: "5px", padding: "10px", color: "#ffffff"}}>
                        <p>
                          Status - {row.paymentResponse.code}
                         </p> 
                        <p>
                          Payment Data - {row.paymentResponse.data.amount / 100}
                         </p> 
                         {row.paymentResponse.data.paymentInstrument ? (
                          <div>
                          <p>
                          Payment Type - {row.paymentResponse.data.paymentInstrument.cardType}
                         </p> 
                          </div>
                         ) : (
                          null
                         )
    
                         }
                        
                         </div>
                       </div> 
                    ) : (<p style={{
                      color:"white",padding:"10px",
                      backgroundColor:"red"
                    }}>
                      Payment is not processed
                    </p>)
      
                    }
              </TableCell>
              <TableCell align="right">{row.orderUpdateWAPhone}</TableCell>
         
              <TableCell align="right">
                   <select  
                   onChange={(e)=>setSetOrderStatus(e.target.value)}
                   style={{
                    minWidth: '120px',
                    padding: '8px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '8px',
                    backgroundColor: '#fff',
                    color: '#333',
                  }}
                    >
                        <option value="">update status</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="DISPATCHED">DISPATCHED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUTFORDELIVERY">OUT FOR DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="RETURN INIT">RETURN INIT</option>
                        <option value="RETURN DONE">RETURN DONE</option>
                        <option value="REFUND INIT">REFUND INIT</option>
                        <option value="REFUNDED">REFUNDED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <UpdateIcon style={{cursor:"pointer"}} onClick={(e) =>{ orderStatusChange(e, setorderstatus, row);setSetOrderStatus('')}}/>
                 
              </TableCell>
              <TableCell align="right"><More style={{cursor:"pointer"}} onClick={() => navigate(`/order/${row._id}`)}></More></TableCell>
            </TableRow>
           </>)
            }
        
      </TableBody>
    </Table>
  </TableContainer>)
  }

  

  const getStatusCount = (status) => {
    return statusCount && statusCount[status] !== undefined ? statusCount[status] : 0;
  };

  const TimeFilterHandler =(e)=>{
       orderfilters.Time = e.target.value ;
       setOrderFilters({...orderfilters});
  }
  

  return(
    <div style={{padding: "0 40px"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {tabNames.map((tabname,tabIndex) => (
          <Tab
            key={tabIndex}
            label={
              <div >
                {tabname}
               
                <span
                  style={{
                    right:"15px",
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '1px 4px',
                    position:"relative",
                    bottom:"10px",
                    fontWeight:"bolder"
                  }}
                >
                {getStatusCount(tabname)}                
                </span>
                
              </div>
            }
            {...a11yProps(tabIndex)}
          />
        ))}
      </Tabs>
    </Box>
    <div>
            <select
                style={{
                    marginTop: "20px",
                    height:"40px" ,
                    border:"2px solid gray",
                    borderRadius:"10px",
                    color:"black",
                    fontWeight:"bolder"
                }}
                value={orderfilters.Time}
                onChange={(e) => {
                    TimeFilterHandler(e);
                }}>
                <option value="">All Date</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Last 15 days</option>
                <option>Last 30 days</option>
            </select>
            <Input
                style={{
                    borderRadius: "1rem",
                    marginTop: "20px",
                    padding: "8px", 
                    marginLeft:"20px"
                }}
                type="text"
                placeholder="Search Orders"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
          
        </div>
      <CustomTabPanel  value={value} index={0}>
      { orderTables("NEW")}
        </CustomTabPanel>
        <CustomTabPanel  value={value} index={1}>
      { orderTables("ACCEPTED")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        {orderTables("DISPATCHED")}
       </CustomTabPanel>
       <CustomTabPanel value={value} index={3}>
      {orderTables("SHIPPED")}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {orderTables('OUTFORDELIVERY')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        {orderTables('DELIVERED')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        {orderTables('ALL')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        {orderTables('RETURN INIT')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        {orderTables('RETURN DONE')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
        {orderTables('REFUND INIT')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={10}>
        {orderTables('REFUNDED')}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={11}>
        {orderTables('CANCELLED')}
      </CustomTabPanel>
     
      <Modal
        open={isopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modelsstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
           <div style={{position:"relative",height:"200px",width:"200px",border:"2px solid gray",boxShadow:"5px 2px 2px 2px",borderRadius:"7px",marginBottom:"10px"}}> <img style={{width:'100%',height:"100%",objectFit:"cover"}} src={modaldata.product?.productImages[0]}/></div>    
            </div>
          <p>Product name: {modaldata.product?.productName}</p>
          <p>order qty: {modaldata?.qty}</p>
          <p>order price: {modaldata.product?.productPrice}</p>
          <p>product discount price: {modaldata.product?.productDiscountPrice}</p>
          </Typography>          
        </Box>
      </Modal>
     
      {/* <CustomTabPanel value={value} index={1}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
      </Table>
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
              <>  
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td style={{
                fontSize:12
              }}> 
              {order._id}
              </td>
              <td style={{
                fontSize:20,
                margin:10
              }}>
              {order.paymentStatus}
              </td>
              <td style={{
                fontSize:12,
                marginRight:10,
                marginLeft:10
              }}>
              {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}

              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <div style={{
                      margin:15
                    }}>
                              <p>Item name: <b style={{
                                color:'#0000007E',
                                fontSize: 18
                              }}>{prod.product.productName}</b></p>
                              <hr></hr>
                              <p>Item qty: <b style={{
                                color:'#0000007E',
                                fontSize: 18
                              }}>{prod.qty}</b></p>
                              <hr></hr>
                              <p>Item price: <b style={{
                                color:'#0000007E',
                                fontSize: 18
                              }}>{prod.product.productPrice}</b></p>
                              <hr></hr>
                              <p>Item discount price: <b style={{
                                color:'#0000007E',
                                fontSize: 18
                              }}>{prod.product.productDiscountPrice}</b> </p>
                    </div>
                  )
                })
                }
              </td>
              <td style={{
                margin:15
              }}>
              {order.orderTotal}
              </td>
              <td style={{
                marginLeft:5,
                marginRight:5
              }}>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green",
                  marginRight:8,
                  marginLeft:8,
                  borderRadius:8 }:{backgroundColor: "red" }}

              >
                  {order.paymentResponse.code === undefined ? (
                    <p style={{
                      fontSize:18
                    }}>
                      <b>Payment is not processed</b>
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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td style={{
                fontSize:20,
                color: 'green'
              }}>
                <b>
                {order.orderUpdateWAPhone}
                </b>
              </td>
              </div>
              <td>
              <Button onClick={(e) => orderStatusChange(e, "ACCEPTED", order._id)} style={{
                  margin:5
                }}>
                  Accept
                </Button>
                <br></br>
                <Button onClick={(e) => orderStatusChange(e, "DISPATCHED", order._id)} style={{
                  margin:5
                }}>
                Dispatched
                </Button>
                <br></br>
                
                <Button onClick={(e) => orderStatusChange(e, "SHIPPED", order._id)} style={{
                  margin:5
                }}>
                Shipped
                </Button>
                <br></br>
                
                <Button onClick={(e) => orderStatusChange(e, "OUTFORDELIVERY", order._id)} style={{
                  margin:5
                }}>
                Out For Delivery
                </Button>
                <br></br>
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <br></br>

                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <br></br>

                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <br></br>

                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
                <br></br>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <br></br>

                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <br></br>

                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
              <hr style={{
                height:5,
                background: 'lime'
              }}></hr>
              </>
            )
          })
          }
         
      </CustomTabPanel> */}
      
      {/* <CustomTabPanel value={value} index={2}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
         </Table> 
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
              <tr>
                <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
             </tr>
           
            )
          })
          }
          
      </CustomTabPanel> */}
      
        {/* <CustomTabPanel value={value} index={3}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
      </Table>
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
              <tr>
                <div onClick={() => navigate(`/order/${order._id}`)}> 
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
           
            )
          })
          }
      </CustomTabPanel> */}
     
      {/* <CustomTabPanel value={value} index={4}>
        <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>          
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
              <tr>
                <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
           
            )
          })
          }
      </CustomTabPanel> */}
      
      {/* <CustomTabPanel value={value} index={5}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
      </Table>          
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
              <tr>
                <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
           
            )
          })
          }
          
      </CustomTabPanel> */}
      
      {/* <CustomTabPanel value={value} index={6}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
      </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
                {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
                </div>
                <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              <td>
                <p onClick={() => navigate(`/order/${order._id}`)} style={{textDecoration: "underline", cursor: "pointer"}} >
                  more
                </p>
              </td>
            </tr>
            )
          })
          }
      </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={7}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "RETURN INIT")
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
            )
          })
          }
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "RETURN DONE")
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
            )
          })
          }
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "REFUND INIT")
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
            )
          })
          }
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={10}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "REFUNDED")
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
            )
          })
          }
          
      </CustomTabPanel>
      <CustomTabPanel value={value} index={11}>
      <Table striped style={{overflow: "hidden"}} bordered>
          <thead style={{backgroundColor: "#9BA4B5"}}>
            <tr>
              <th>
                #
              </th>
              <th>
                Order id
              </th>
              <th>
                Order Status
              </th>
              <th>
               Rec date&time
              </th>
              <th>
                Pincode
              </th>
              <th>
                Order
              </th>
              <th>
                Order Total
              </th>
              <th>
                Payment
              </th>
              <th>
                WA Automation no.
              </th>
              <th>
                Change Status
              </th>
              <th>
                more details
              </th>
            </tr>
          </thead>
        </Table>
          {isLoadingSection()}
              {allOrders && allOrders.filter((order) => {
                if (searchTerm == "") {
                  return allOrders
                } else if (order._id.includes(searchTerm) ) {
                  return order
                }
              }).map((order, index) => {
            if(order.orderStatus === "CANCELLED")
            return(
              <tr>
              <div onClick={() => navigate(`/order/${order._id}`)}>
              <th scope="row">
              {index + 1}
              </th>
              <td>
              {order._id}
              </td>
              <td>
              {order.paymentStatus}
              </td>
              <td>
              {order.createdAt}
              </td>
              <td>
              {order.shipmentPincode}
              </td>
              <td>
              {order.orderProduct.length && order.orderProduct.map((prod, index) => {
                  return(
                    <>
                              <p>item name: {prod.product.productName}</p>
                              <p>item qty: {prod.qty}</p>
                              <p>item price: {prod.product.productPrice}</p>
                              <p>item discount price: {prod.product.productDiscountPrice}</p>
                    </>
                  )
                })
                }
              </td>
              <td>
              {order.orderTotal}
              </td>
              <td>
              {order.paymentResponse ? (
                  <div 
                  style={(order.paymentResponse.code === "PAYMENT_SUCCESS" || order.paymentResponse.code === "COD_SUCCESS") ? {backgroundColor:"green" }:{backgroundColor: "red" }}

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
                     {order.paymentResponse.data.paymentInstrument ? (
                      <div>
                      <p>
                      Payment Type - {order.paymentResponse.data.paymentInstrument.cardType}
                     </p> 
                      </div>
                     ) : (
                      null
                     )

                     }
                     </div>
                   </div> 
                ) : (<p style={{
                  color:"red"
                }}>
                  Payment is not processed
                </p>)
  
                }
              </td>
              <td>
                {order.orderUpdateWAPhone}
              </td>
              </div>
              <td>
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
                
                <Button onClick={(e) => orderStatusChange(e, "RETURN INIT", order._id)} style={{
                  margin:5
                }}>
                Return Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "RETURN DONE", order._id)} style={{
                  margin:5
                }}>
                Returned
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUND INIT", order._id)} style={{
                  margin:5
                }}>
                Refund Init
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "REFUNDED", order._id)} style={{
                  margin:5
                }}>
                Refundded
                </Button>
          
                <Button onClick={(e) => orderStatusChange(e, "DELIVERED", order._id)} style={{
                  margin:5
                }}>
                  Delivered
                </Button>
                <Button onClick={(e) => orderStatusChange(e, "CANCELLED", order._id)} style={{
                  margin:5
                }}>
                  Cancelled
                </Button>
                <Button onClick={(e) => sendUserWhatAppOrderStatus(e, "UPDATE WA", order)} style={{
                  margin:5,
                  backgroundColor:'#3407F8'
                }}>
                  UPDATE
                </Button>
              </td>
              </tr>
            )
          })
          }
          
      </CustomTabPanel> */}

     
    </div>
  )
}

export default Orders;

