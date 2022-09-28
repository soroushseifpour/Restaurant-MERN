import {createSlice } from '@reduxjs/toolkit'
import React from 'react'
const INITIAL_STATE={
    user:null
}
const USERS=[];
const userReducer=createSlice({
    name:"USER",
    initialState:INITIAL_STATE,
    reducers:{
        settingUser(state,action){
            state.user={...action.payload}
        }
    }
})
export const gettingData=(user)=>{
    const promise=new Promise((resolve,reject)=>{
        const isExist=USERS.find(u=>u.username===user.username)
        setTimeout(() => {
            if(isExist){
                resolve({status:200,message:"Successfully login!",data:user})
            }
            else{
                reject({status:500,message:"The user not found"})
            }               
        }, 300);
    })
    return promise
}
export const sendingData=(user)=>{
    const promise=new Promise((resolve)=>{
        const newUser={...user,userID:Math.random()}
        USERS.push(newUser);
        setTimeout(() => {
            resolve({message:'The user successfullt created!',data:newUser})   
        }, 300);
    })
    return promise;
}
export const userActions=userReducer.actions;
export default userReducer.reducer