import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAUser } from "../../api/Api";


const UserDetails = () => {

    const { userId } = useParams();



    const getaUserDetails = () => {
        getAUser(userId).then((res) => {
            console.log("User Info - ", res)
        }).catch((err) => {
            console.log("Error - ", err);
        })  
    }

    useEffect(() => {
        getaUserDetails()
    },[])



    return(
        <div>
            <p>
                User Details
            </p>
            <p>
                {userId}
            </p>
        </div>
    )    
}


export default UserDetails;