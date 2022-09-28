import React from 'react'
import useInput from '../../components/Utility/useInput'
import { gettingData, userActions } from '../../store/userReducer'
import styles from '../../styles/Login.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
const Login=()=>{
    const {
        blurHandler:usernameBlurHandler,
        changeHanlder:usernameChangeHandler,
        isValid:usernameIsValid,
        value:usernameValue,
        isTouched:usernameIsTouched
    }=useInput((value)=>value.trim().length > 4)
    const {
        blurHandler:passwordBlurHandler,
        changeHanlder:passwordChangeHandler,
        isValid:passwordIsValid,
        value:passwordValue,
        isTouched:passwordIsTouched
    }=useInput((value)=>value.trim().length > 4);
    const router=useRouter();
    const isFormValid= usernameIsValid && passwordIsValid;
    const dispatch=useDispatch()
    const loginHandler= async (e)=>{
        e.preventDefault();
        if(isFormValid){
            const user={
                username:usernameValue,
                passwrod:passwordValue
            }
            console.log(user)
            const response= await gettingData(user);
            if(response.status===200){
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
                    
                dispatch(userActions.settingUser(response.data))
                router.push('/');      
            }
            else if(response.status===500){
                toast.error(response, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
    }
    return(
        <>
            <div className={styles.container}>
                <h2>Welcome To Our Restaurant.</h2>
                <div className={styles.card}>
                    <h3>Login</h3>
                    <form onSubmit={(e)=>loginHandler(e)}>
                        <div className={styles.formInput}>
                            <label htmlFor='username'>Username</label>
                            <input type={'text'} name="username" onChange={(e)=>usernameChangeHandler(e.currentTarget.value)} onBlur={usernameBlurHandler}/>
                        </div>
                            {usernameIsTouched && !usernameIsValid && <div style={{color:"red"}}>The username is not valid</div>}
                        <div className={styles.formInput}>
                            <label htmlFor='password'>Password</label>
                            <input type={'password'} name="password" onChange={(e)=>passwordChangeHandler(e.currentTarget.value)} onBlur={passwordBlurHandler}/>
                        </div>
                            {passwordIsTouched && !passwordIsValid && <div style={{color:"red"}}>The password is not valid</div>}
                        <span style={{color:"wheat"}}>Dont have an account?<span style={{textAlign:"center", color:"red", textDecoration:"underline"}}><Link href="/register/signup">Sign-up</Link></span></span>
                        <div>
                            <button className={isFormValid ? styles.btn : styles.btnBlock} disabled={!isFormValid}>Login</button>
                        </div>
                    </form>
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
            </div>
        </>
    )
}
export default Login