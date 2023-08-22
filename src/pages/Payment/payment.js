import { useEffect, useState } from "react"
import { createOfferCode, getAllOffers } from "../../api/Api";



const Payment = () => {


    
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [list, setList] = useState([]);
    
    const handleInputChange1 = (e) => {
      setInput1(e.target.value);
    };
  
    const handleInputChange2 = (e) => {
      setInput2(e.target.value);
    };

  const [fetchOffers, setfetchOffers] = useState(false);
  const [allOfferCodes, setallOfferCodes] = useState([]);

    
  const handleAddToList = (e) => {
        e.preventDefault();
        createOfferCode({input1, input2}).then((res) => {
            console.log("Offer Res - ",res);
            setfetchOffers(!fetchOffers);
            setInput1("");
            setInput2("");
        }).catch((err) => {
            console.log("Error - ", err);
        })
  };


  const getAllOffersList = () => {
        getAllOffers().then((res) => {
            console.log("All Offers - ", res);
            setallOfferCodes(res.data.offers);
        }).catch((err) => {
            console.log("Error - ", err);
        });
  }

  useEffect(() => {
    getAllOffersList()
 
  }, [fetchOffers])
  

    return(
       
        <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '10px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            flex: '1',
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: '#005713',
            margin: '10px',
            borderRadius: '10px',
          }}
        >
          <h2 style={{ color: 'white' }}>Coupons / Offers</h2>
          <input
            type="text"
            placeholder="Coupon Code"
            value={input1}
            onChange={handleInputChange1}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="text"
            placeholder="Offer"
            value={input2}
            onChange={handleInputChange2}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button
            onClick={handleAddToList}
            style={{ width: '100%', backgroundColor: 'white', color: 'green' }}
          >
            Create
          </button>
        </div>
        <div
          style={{
            flex: '1',
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: 'green',
            margin: '10px',
            borderRadius: '10px',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ color: 'white' }}>List</h2>
          <ul style={{ listStyle: 'none', padding: '0', color: 'white' }}>
            {allOfferCodes && allOfferCodes.map((item, index) => (
            <div>
                {console.log('item', item)}
              <li key={index}>{`Code: ${item.code}, Value: ${item.value}`}</li>
              <button style={{
                width:150,
                height:32,
                backgroundColor: '#FFFFFF',
                borderRadius:5,
                marginRight:5
              }}>
                Disable
              </button>
              <button style={{
                width:150,
                height:32,
                backgroundColor: '#FFFFFF',
                borderRadius:5,
              }}>
                Delete
              </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )

}


export default Payment;