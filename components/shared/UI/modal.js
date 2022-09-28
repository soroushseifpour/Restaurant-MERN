import React, { useState } from 'react'
import styles from '../../../styles/Modal.module.css'
import useInput from '../../../components/Utility/useInput'
import { useSelector } from 'react-redux'
const Modal = (props) => {
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    const products=useSelector(state=>state.product).cart;
    const user=useSelector(state=>state.user).user;
    const {
        blurHandler: blurStreetHandler,
        changeHanlder: changeStreetHandler,
        isTouched: isStreetTouched,
        isValid: isStreetValid,
        resetValue: resetStreetValue,
        value: streetValue
    } = useInput((value) => value.trim().length > 5)
    const {
        blurHandler: blurApprtmentHandler,
        changeHanlder: changeApprtmentHandler,
        isTouched: isApprtmentTouched,
        isValid: isApprtmentValid,
        resetValue: resetApprtmentValue,
        value: ApprtmentValue
    } = useInput((value) => value.trim().length > 5)
    const {
        blurHandler: blurUnitHandler,
        changeHanlder: changeUnitHandler,
        isTouched: isUnitTouched,
        isValid: isUnitValid,
        resetValue: resetUnitValue,
        value: UnitValue
    } = useInput((value) => value.trim().length > 3)
    const isFormValid= isStreetValid && isApprtmentValid && isUnitValid;
    const checkOutHandler=(e)=>{
        e.preventDefault()
        if(isFormValid){
            const order={
                Address:{
                    street:streetValue,
                    appartment:ApprtmentValue,
                    unit:UnitValue
                },
                user:{
                    username:user.username
                },
                products:[
                    ...products
                ]
            }
            console.log(order)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <h3>Your Address</h3>
                <p>You can click the button below to use your current location as your shipping address</p>
                <button className={styles.btnLocation} onClick={() => setIsAddressOpen((prevState) => !prevState)}>{isAddressOpen === false ? 'Use my location' : 'Close'}</button>
                {isAddressOpen && 
                <form className={styles.form}>
                    {/* <h4>Your Location</h4> */}
                    <div className={styles.formController}>
                        <label htmlFor='street'>Street</label>
                        <input type={"text"} name="street" value={streetValue} onChange={(e) => changeStreetHandler(e.currentTarget.value)} onBlur={blurStreetHandler} />
                    </div>
                    {isStreetTouched && !isStreetValid && <span style={{color:"red"}}>Street input is invalid</span>}
                    <div className={styles.formController}>
                        <label htmlFor='appartment'>appartment</label>
                        <input type={"text"} name="appartment" value={ApprtmentValue} onChange={(e)=>changeApprtmentHandler(e.currentTarget.value)} onBlur={blurApprtmentHandler}/>
                    </div>
                    {isApprtmentTouched && !isApprtmentValid && <span style={{color:"red"}}>App. input is invalid</span>}
                    <div className={styles.formController}>
                        <label htmlFor='unit'>unit</label>
                        <input type={"text"} name="unit" value={UnitValue} onChange={(e)=>changeUnitHandler(e.currentTarget.value)} onBlur={blurUnitHandler} />
                    </div>
                    {isUnitTouched && !isUnitValid && <span style={{color:"red"}}>Unit input is invalid</span>}
                    <button className={isFormValid ? styles.checkout : styles.btnBlock} disabled={!isFormValid} onClick={(e)=>checkOutHandler(e)}>Check-out</button>
                </form>
                }
            </div>
        </>
    )
}
export default Modal