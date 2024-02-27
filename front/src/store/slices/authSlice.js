import { createSlice } from "@reduxjs/toolkit";
// const initialIsAuthenticated=localStorage.getItem("isAuthenticated")?true: true //wersja do vercela
// const initialIsloggedUser=localStorage.getItem("loggedUser")?JSON.parse(localStorage.getItem("loggedUser")): {login:'jkowalski'} //wersja do vercel
const initialIsAuthenticated=localStorage.getItem("isAuthenticated")?true: false
const initialIsloggedUser=localStorage.getItem("loggedUser")?JSON.parse(localStorage.getItem("loggedUser")): {}
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated:initialIsAuthenticated,
        loggedUser:initialIsloggedUser
    },
    reducers: {
        authenticateAction:(state,{payload})=>{
            const {isAuthenticated,user}=payload;
         
            state.isAuthenticated=isAuthenticated;
            state.loggedUser=user;
            localStorage.setItem("isAuthenticated",JSON.stringify(isAuthenticated));
            localStorage.setItem("loggedUser",JSON.stringify(state.loggedUser));
          
        },
        unAuthenticateAction:(state,{payload})=>{
            const {isAuthenticated,user}=payload;
            state.isAuthenticated=isAuthenticated;
            state.loggedUser=user;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("loggedUser");
            
            
        }
    },
   
})

export const { authenticateAction,unAuthenticateAction } = authSlice.actions
export default authSlice.reducer
