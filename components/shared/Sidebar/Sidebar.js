import Link from 'next/link'
import React from 'react'
import styles from '../../../styles/Sidebar.module.css'
const Sidebar=()=>{
    return(
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.innerContainer}>
                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <Link href="/register/signup">Signup</Link>
                            </li>
                            <li className={styles.item}>
                                <Link href="/register/login">login</Link>
                            </li>
                            <li className={styles.item}>
                                <Link href="/">Pizzas</Link>
                            </li>
                            <li className={styles.item}>
                                <Link href="/cart">cart</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar