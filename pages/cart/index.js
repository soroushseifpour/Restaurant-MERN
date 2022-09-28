import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Backdrop from '../../components/shared/UI/backdrop'
import Modal from '../../components/shared/UI/modal'
import { productActions } from '../../store/productReducer'
import styles from '../../styles/Cart.module.css'
const Cart=()=>{
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const modalHandler=()=>{
        setModalIsOpen((prevState)=>!prevState);
    }
    const cart=useSelector(state=>state.product).cart
    const dispatch=useDispatch()
    const addingHandler=(item)=>{
        dispatch(productActions.addToCart(item))
    }
    const deleteHandler=(item)=>{
        dispatch(productActions.deleteFromCart(item))
    }
    return(
        <>
            <div className={styles.container}>
                <h3>Your Shopping Cart</h3>
                {cart.length > 0 &&
                        <>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.heading}>
                                        <span>Shopping Card</span>
                                    </div>
                                    <div className={styles.btn}>
                                        <span>Remove all</span>
                                    </div>
                                </div>  
                                {cart.map(item=>{
                                    return(
                                        <>
                                        <div className={styles.body}>
                                            <div className={styles.row}>
                                                <div className={styles.imgContainer}>
                                                    <Image src="/pizza.png" layout="responsive" width={500} height={500}/>
                                                </div>
                                                <div className={styles.title}>
                                                    <span>{item.name}</span>
                                                    {item.extraOptions && item.extraOptions.map(item=>{
                                                        return(
                                                            <>
                                                               <span style={{fontWeight:"normal"}}>{item}</span> 
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                                <div className={styles.btnController}>
                                                    <div className={styles.addbtn} onClick={()=>addingHandler(item)}>
                                                        <span>+</span>
                                                    </div>
                                                    <div className={styles.badge}>
                                                        <span>{item.count}</span>
                                                    </div>
                                                    <div className={styles.removebtn} onClick={()=>deleteHandler(item)}>
                                                        <span>-</span>
                                                    </div>
                                                </div>
                                                <div className={styles.information}>
                                                    <span>${item.count * item.price}</span>
                                                    <span className={styles.save}>Save for later</span>
                                                    <span className={styles.remove}>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    )
                                })}
                                <div className={styles.footer}>
                                    <button className={styles.orderbtn} onClick={modalHandler}>Order</button>  
                                </div>
                            </div>
                        </>
                  
                }
                {cart.length ==0 && <h3>There is no item in a Shopping cart</h3>}
            </div>
            {modalIsOpen && <Modal onClick={modalHandler} />}
            {modalIsOpen && <Backdrop onClick={modalHandler}/>}
            
        </>
    )
}
export default Cart