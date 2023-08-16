import React, {useEffect, useState} from 'react'
import { Container } from '@mui/material'
import { FaUsers } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { RiNumbersFill } from 'react-icons/ri'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { FaUsersSlash } from 'react-icons/fa'
import {MdProductionQuantityLimits} from 'react-icons/md'
import { apiCheck, dashboardStats, makeStatusUpdateView } from '../api/Api'

export default function Home() {


    const [totalUsers, settotalUsers] = useState(0);
    const [totalOrders, settotalOrders] = useState(0);
    const [totalOrderValue, settotalOrderValue] = useState(0);
    const [totalOrderProduct, settotalOrderProduct] = useState(0);
    const [viewsWebsite, setviewsWebsite] = useState(0);
    const [viewsProductView, setviewsProductView] = useState(0);

    const getStats = () => {
        dashboardStats().then((res) => {
            console.log("Res Stats - ", res.data);
            settotalUsers(res.data.totalUsersCount);
            settotalOrders(res.data.totalOrderCount);
            settotalOrderValue(res.data.totalOrderValue);
            settotalOrderProduct(res.data.totalOrderProducts);
            setviewsWebsite(res.data.views[0].totalWebsiteViews);
            setviewsProductView(res.data.views[0].totalProductViews);
        }).catch((err) => {
            console.log("Error - ", err);
        })
    }

    const makeStatsUpdate = () => {
        makeStatusUpdateView().then((res) => {
            console.log("E-Commerce Views - ", res);
        }).catch((error) => {
            console.log("Error - ", error);
        })
      }


    useEffect(() => {
        apiCheck()
        getStats()
        // makeStatsUpdate()
    }, [])
    

  return (
    <div>
        <Container style={{display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column"}}>
        <h3 style={{padding: "10px", marginTop: "20px"}} className="poppinsBold">STATISTICS</h3>
            <div className="dashboard-grid">
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>No. of Registered Users</p>
                        <div className='db-card-grid'>
                            <FaUsers size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{totalUsers}</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>All Earnings</p>
                        <div className='db-card-grid'>
                            <FaMoneyCheckAlt size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{totalOrderValue}</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Total Order Sold</p>
                        <div className='db-card-grid'>
                            <RiNumbersFill size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{totalOrders}</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Ecommerce Vists</p>
                        <div className='db-card-grid'>
                            <AiFillMessage size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{viewsWebsite}</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Ecommerce Product Views</p>
                        <div className='db-card-grid'>
                            <FaUsersSlash size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{viewsProductView}</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Total Products Sold</p>
                        <div className='db-card-grid'>
                            <MdProductionQuantityLimits size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">{totalOrderProduct}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}
