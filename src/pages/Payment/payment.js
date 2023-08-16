import { useEffect } from "react"



const Payment = () => {


    useEffect(() => {
        window.open(`https://business.phonepe.com/dashboard`, '_blank', 'noreferrer')
    }, [])
    

    return(
        <div>
            <p>
                Pament Section Here
            </p>
        </div>
    )

}


export default Payment;