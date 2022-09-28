import React from 'react'
import useInput from '../../components/Utility/useInput'
import { sendingData, userActions } from '../../store/userReducer'
import styles from '../../styles/Signup.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
const Signup=()=>{
    const {
        blurHandler:usernameBlurHandler,
        changeHanlder:usernameChangeHandler,
        isValid:usernameIsValid,
        value:usernameValue,
        isTouched:usernameIsTouched,
        resetValue:usernameResetValue
    }=useInput((value)=>value.trim().length > 4)
    const {
        blurHandler:passwordBlurHandler,
        changeHanlder:passwordChangeHandler,
        isValid:passwordIsValid,
        value:passwordValue,
        isTouched:passwordIsTouched,
        resetValue:passwordResetValue
    }=useInput((value)=>value.trim().length > 4)
    const {
        blurHandler:emailBlurHandler,
        changeHanlder:emailChangeHandler,
        isValid:emailIsValid,
        value:emailValue,
        isTouched:emailIsTouched,
        resetValue:emailResetValue
    }=useInput((value)=>value.trim().length > 4 && value.trim().includes('@'))
    const router=useRouter()
    const isFormValid= usernameIsValid && passwordIsValid && emailIsValid;
    const dispatch=useDispatch()
    const reset=()=>{
        usernameResetValue()
        emailResetValue()
        passwordResetValue()
        router.push('/register/login')
    }
    const signupHandler= async (e)=>{
        e.preventDefault();
        if(isFormValid){
            const user={
                username:usernameValue,
                passwordValue:passwordValue,
                email:emailValue
            }
            const response= await sendingData(user);
            toast.success(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });    
            reset();        
        }
    }   
    return(
        <>
            <div className={styles.container}>
                <h2>Welcome To Our Restaurant.</h2>
                <div className={styles.card}>
                    <h3>Sign-up</h3>
                    <form onSubmit={(e)=>signupHandler(e)}>
                        <div className={styles.formInput}>
                            <label htmlFor='username'>Username</label>
                            <input type={'text'} name="username" onChange={(e)=>usernameChangeHandler(e.currentTarget.value)} onBlur={usernameBlurHandler}/>
                        </div>
                            {usernameIsTouched && !usernameIsValid && <div style={{color:"red"}}>The username is not valid</div>}
                        <div className={styles.formInput}>
                            <label htmlFor='email'>Email</label>
                            <input type={'email'} name="email" onChange={(e)=>emailChangeHandler(e.currentTarget.value)} onBlur={emailBlurHandler}/>
                        </div>
                            {emailIsTouched && !emailIsValid && <div style={{color:"red"}}>The email is not valid</div>}
                        <div className={styles.formInput}>
                            <label htmlFor='password'>Password</label>
                            <input type={'password'} name="password" onChange={(e)=>passwordChangeHandler(e.currentTarget.value)} onBlur={passwordBlurHandler}/>
                        </div>
                            {passwordIsTouched && !passwordIsValid && <div style={{color:"red"}}>The password is not valid</div>}
                        <div>
                            <button className={isFormValid ? styles.btn : styles.btnBlock} disabled={!isFormValid}>Login</button>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                         />
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup