import React from 'react'
import styles from '../styles/Orders.module.css'
const Orders=(props)=>{

    return(
        <>
           <div className={styles.container}>
                <h3>Your Order</h3>
                <table className={styles.table1} id="table1">
                        <thead>
                            <tr>
                                <th className={styles.th1}>First Name</th>
                                <th className={styles.th1}>First Name</th>
                                <th className={styles.th1}>First Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.td1}>Peter</td>
                                <td className={styles.td1}>Peter</td>
                                <td className={styles.td1}>Peter</td>
                            </tr>
                        </tbody>
                    </table>
            </div> 
        </>
    )
}
export default Orders