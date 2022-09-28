import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import styles from '../../../styles/Navbar.module.css'
import Sidebar from '../Sidebar/Sidebar';
import Backdrop from '../UI/backdrop'
const Navbar = () => {
    const count = useSelector(state => state.product).cart;
    const user = useSelector(state => state.user).user;
    let name = user !== null ? ' Hello ' + user.username : 'Signup/login'
    const modalHandler=()=>{
        setIsModalOpen((prevState)=>!prevState);
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            {isModalOpen && <Sidebar/>}
            {isModalOpen && <Backdrop onClick={modalHandler}/>}
            <navbar className={styles.navbar}>
                <div className={styles.itemList}>
                    <div className={styles.ham} onClick={()=>setIsModalOpen((prevState)=>!prevState)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.navlist}>

                        <ul className={styles.menuList}>
                            <li className={styles.menuItem}>Menu</li>
                            <li className={styles.menuItem}>Franchising</li>
                            <li className={styles.menuItem}>More</li>
                        </ul>
                        <div className={`${styles.menuList} ${styles.timhorton}`}>
                            <Link href="/">MY-Pizza</Link>
                        </div>
                        <div className={`${styles.menuList} ${styles.menuRight}`}>
                            <div className={styles.signup}>
                                <Link href="/register/login">{name}</Link>
                            </div>
                        </div>
                        <div className={`${styles.menuList} ${styles.menuRight}`}>
                            <div>
                                <span style={{ fontWeight: "bold", marginRight: ".5rem" }}>Cart Items :</span>
                                <Link href="/cart">{count.length}</Link>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </navbar>
        </>
    )
}
export default Navbar