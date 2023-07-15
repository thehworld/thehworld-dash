import React, {useEffect} from 'react'
import { Container } from '@mui/material'
import { FaUsers } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'
import { RiNumbersFill } from 'react-icons/ri'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { FaUsersSlash } from 'react-icons/fa'
import {MdProductionQuantityLimits} from 'react-icons/md'
import { apiCheck } from '../api/Api'

export default function Home() {

    useEffect(() => {
        apiCheck()
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
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>All Earnings</p>
                        <div className='db-card-grid'>
                            <FaMoneyCheckAlt size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Page Views</p>
                        <div className='db-card-grid'>
                            <RiNumbersFill size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Unread New Messages!</p>
                        <div className='db-card-grid'>
                            <AiFillMessage size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>No. of Logged Out Users</p>
                        <div className='db-card-grid'>
                            <FaUsersSlash size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
                <div className='db-comp'>
                    <div className='db-card-stats'>
                        <p>Total Products Sold</p>
                        <div className='db-card-grid'>
                            <MdProductionQuantityLimits size="80" color='#4FB23A' className="flex-cc" />
                            <h1 className="flex-cc">542</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}
