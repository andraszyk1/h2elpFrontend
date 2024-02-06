import { createSlice } from "@reduxjs/toolkit";

export const toastSlice=createSlice({
    name:'toast',
    initialState:{
        showToast:false,
        message:'',
        variant:''
    },
    reducers:{
        setShowToast:(state,{payload})=>{
            console.log(payload);
            const {showToast,message,variant}=payload
            state.showToast=showToast
            state.message=message
            state.variant=variant
        }
    }
})

export const {setShowToast} = toastSlice.actions
export default toastSlice.reducer