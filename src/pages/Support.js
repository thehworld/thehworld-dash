import { getAllOrderIssues } from "../api/Api";
import { useEffect, useState } from 'react'

const Support = () => {
    
    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      };
      
      const itemStyle = {
        width: '300px',
        height: '200px',
        margin: '10px',
        textAlign: 'center',
        color: '#fff',
        padding: '20px',
      };

      const [allIssues, setallIssues] = useState([]);
      

      const getAllIssues =  () => {
            getAllOrderIssues().then((res) => {
                console.log("Issues Orders - ", res);
                setallIssues(res.data.issues);
            }).catch((err) => {
                console.log("Error - ", err);
            })
      }

      useEffect(() => {
        getAllIssues(); 
      
      }, [])
      

    return(
        <div>
        <div style={gridStyle}>
            {allIssues && allIssues.map((iss, index) => {
                return(
                    <div style={{ ...itemStyle, backgroundColor: '#e74c3c' }}>
                        <div>
                            <p>
                                {iss.status}
                            </p>
                            <p>
                                {iss.order.orderId}
                            </p>
                            <p>
                                {iss.order.shipmentStatus}
                            </p>
                        </div>
                    </div>
                )
            })

            }
      
    </div>
        </div>
    )
}


export default Support;