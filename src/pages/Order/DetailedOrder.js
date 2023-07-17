import { useParams } from "react-router-dom"



const DetailedOrder = () => {

    const {orderId} = useParams();


    console.log("OrderId - ", orderId);
    
    return(
        <div>
            <h3>
                Detailed Order
            </h3>
        </div>
    )

}


export default DetailedOrder