import { useParams } from "react-router-dom"
import { getAOrderDetails } from "../../api/Api";
import { useEffect } from "react";
import { useState } from "react";



const DetailedOrder = () => {

    const {orderId} = useParams();

    const [orderDetail, setorderDetail] = useState({});

    const getAOrderDetailsHere = () => {
        getAOrderDetails(orderId).then((res) => {
            console.log("Order Detail - ", res.data.order);
            setorderDetail(res.data.order);
        }).catch((error) => {
            console.log("Error - ", error);
        })
    }

    useEffect(() => {
        getAOrderDetailsHere()
    },[])


    
    return(
        <div>
            <h3>
                Detailed Order
            </h3>
            {orderDetail ? (
                <div>
                    <p>
                        {orderDetail.orderId}
                    </p>
                    <p>
                        {orderDetail.createdAt}
                    </p>
                    <p>
                        {orderDetail.paymentStatus}
                    </p>
                    <p>
                        {orderDetail.paymentTotal}
                    </p>
                    <p>
                        {orderDetail.shipmentAddress}
                    </p>
                    <p>
                        {orderDetail.orderId}
                    </p>
                    <p>
                        {orderDetail.orderId}
                    </p>
                    <p>
                        {orderDetail.orderId}
                    </p>
                    <p>
                        {orderDetail.orderId}
                    </p>
                </div>    
            ) : (   
                <div>
                    Loading ...
                </div>
            ) 

            }
        </div>
    )

}


export default DetailedOrder