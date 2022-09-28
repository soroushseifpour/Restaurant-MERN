import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
const Layout=(props)=>{
    return(
        <>
            <div style={{marginTop:"5rem",height:"100%"}}>
                
                <Navbar/>
                {props.children}
            </div>
        </>
    )
}
export default Layout