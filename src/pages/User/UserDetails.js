import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAUser } from "../../api/Api";


const UserDetails = () => {

    const { userId } = useParams();


    const [aUserDetails, setaUserDetails] = useState("");

    const getaUserDetails = () => {
        getAUser(userId).then((res) => {
            console.log("User Info - ", res)
            setaUserDetails(res.data.user);
        }).catch((err) => {
            console.log("Error - ", err);
        })  
    }

    useEffect(() => {
        getaUserDetails()
    },[])



    return(
        <div>
            <p style={{
                textAlign: 'center',
                marginTop:50,
                fontSize:35,
                fontWeight:700
            }}>
                User Details
            </p>
            <div class="user-preview" style={{
                height: '100%',
                backgroundColor: '#F4F4F4'
            }}>
  <div class="user-info" style={{
    textAlign: 'center'
  }}>
    <img src={aUserDetails.userProfilePic} alt="User Photo"/>
    <h2>User Name {aUserDetails.userGoogleName}</h2>
    <p>Address: {aUserDetails.userEmail}</p>
  </div>
  <div class="user-orders" style={{
    textAlign: 'center'
  }}>
    <h3>Orders:</h3>
    {aUserDetails.userCart && aUserDetails.userCart.map((user, index) => {
        return(
        <div>
            <h4>Name: {user.product.productName}</h4>
            <p>Product Name: {user.product.productName}</p>
            <p>Product Price: {user.product.productPrice}</p>
            <p>Product Dis Price: {user.product.productDiscountPrice}</p>
        </div>
        )
    })
    }
    
  </div>
  <div class="user-orders" style={{
    textAlign: 'center'
  }}>
    <h3>In Cart:</h3>
    {aUserDetails.userCart && aUserDetails.userCart.map((user, index) => {
        return(
        <div>
            <h4>Name: {user.product.productName}</h4>
            <p>Product Name: {user.product.productName}</p>
            <p>Product Price: {user.product.productPrice}</p>
            <p>Product Dis Price: {user.product.productDiscountPrice}</p>
        </div>
        )
    })
    }
    
  </div>
</div>
        </div>
    )    
}


export default UserDetails;