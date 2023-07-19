import { useParams } from "react-router-dom"
import { getAOrderDetails } from "../../api/Api";
import { useEffect } from "react";
import { useState } from "react";
import { CircularProgress, Container } from "@mui/material";

const DetailedOrder = () => {

    const {orderId} = useParams();

    const [orderDetail, setorderDetail] = useState({});
    const [userDetails, setuserDetails] = useState("");
    const getAOrderDetailsHere = () => {
        getAOrderDetails(orderId).then((res) => {
            console.log("Order Detail - ", res.data);
            setorderDetail(res.data.order);
            setuserDetails(res.data.user);
        }).catch((error) => {
            console.log("Error - ", error);
        })
    }

    useEffect(() => {
        getAOrderDetailsHere()
    },[])

    return(
        <Container>
            <div style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", margintop: "20px", padding: "10px", minHeight: "100vh"}}>
            <h3 style={{textAlign: "center"}}>
                Details
            </h3>
            <div>
                User Details
                {userDetails ? (
                    <div>
                    <h5>
                    User Name: {userDetails.userGoogleName}
                    </h5>    
                    <h5>
                    User Contact: {userDetails.contactNumber}
                    </h5>    
                    <h5>
                    User Whatsapp Automation Number: {userDetails.contactWAForAuto}
                    </h5>    
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress color="success" />
                    </div>
                )}
             </div>   
             <hr />
            {orderDetail ? (
                <div>
                    Order Details
                    <h5>
                        Order ID: {orderDetail.orderId}
                    </h5>
                    <h5>
                        Order Created Time/Date: {orderDetail.createdAt}
                    </h5>
                    <h5>
                        Payment Status: {orderDetail.paymentStatus}
                    </h5>
                    <h5>
                        Payment Total: {orderDetail.paymentTotal}
                    </h5>
                    <h5>
                        Shipment Address: {orderDetail.shipmentAddress}
                    </h5>
                    <h5>
                        Order Issue Status: {orderDetail.orderIssueStatus}
                    </h5>
                    <h5>
                        Order Status: {orderDetail.orderStatus}
                    </h5>
                    <h5>
                        Whatsapp Update phn no: {orderDetail.orderUpdateWAPhone}
                    </h5>
                    <h5>
                        Payment ID: {orderDetail.paymentId}
                    </h5>
                    <h5>
                        Payment Method: {orderDetail.paymentMethod}
                    </h5>
                    <h5>
                        Shipment ID: {orderDetail.shipmentId}
                    </h5>
                    <h5>
                        Shipment Pincode: {orderDetail.shipmentPincode}
                    </h5>
                    <h5>
                        Shipment State: {orderDetail.shipmentState}
                    </h5>
                </div>    
            ) : (   
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress color="success" />
                </div>
            ) 
            }
             </div>
        </Container>
    )

}


export default DetailedOrder