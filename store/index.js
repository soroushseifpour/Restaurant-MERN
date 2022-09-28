import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const store=configureStore({
    reducer:{
        product: productReducer,
        user: userReducer
    }
})
export default store