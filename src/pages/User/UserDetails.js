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
    <img src="user.jpg" alt="User Photo"/>
    <h2>User Name</h2>
    <p>Address: 123 Main St, City, Country</p>
  </div>
  <div class="user-orders" style={{
    textAlign: 'center'
  }}>
    <h3>Orders:</h3>
    <div>
      <div>
        <h4>Order #1</h4>
        <p>Product A</p>
        <p>Product B</p>
      </div>
      <div>
        <h4>Order #2</h4>
        <p>Product C</p>
      </div>
    </div>
  </div>
</div>
        </div>
    )    
}


export default UserDetails;