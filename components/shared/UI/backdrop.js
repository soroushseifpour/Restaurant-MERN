import React from 'react'
import styles from '../../../styles/Backdrop.module.css'
const Backdrop=(props)=>{
    return(
        <>
            <div className={styles.container} onClick={props.onClick}></div>
        </>
    )
}
export default Backdrop