import { createSlice } from "@reduxjs/toolkit";
const initialIsAuthenticated=localStorage.getItem("isAuthenticated")?true: true
const initialIsloggedUser=localStorage.getItem("loggedUser")?JSON.parse(localStorage.getItem("loggedUser")): {login:'jkowalski'}
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated:initialIsAuthenticated,
        loggedUser:initialIsloggedUser
    },
    reducers: {
        authenticateAction:(state,action)=>{
            const {isAuthenticated,user}=action.payload;
         
            state.isAuthenticated=isAuthenticated;
            state.loggedUser=user;
            localStorage.setItem("isAuthenticated","true");
            localStorage.setItem("loggedUser",JSON.stringify(state.loggedUser));
          
        },
        unAuthenticateAction:(state,action)=>{
            const {isAuthenticated,user}=action.payload;
          
            state.isAuthenticated=isAuthenticated;
            state.loggedUser=user;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("loggedUser");
            
            
        }
    },
    // extraReducers(builder) {
    //     builder.addCase(getUsers.pending, (state, action) => {
    //         state.isLoading = true;
    //     }).addCase(getUsers.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //             state.dataUsers = action.payload;
          
    //         })
    //         .addCase(getUsers.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.error.message;
    //         })
    //     builder.addCase(insertUser.pending, (state, action) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(insertUser.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.dataUsers.push(action.payload);
    //         })
    //         .addCase(insertUser.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.error.message;
    //         })
    //     builder.addCase(deleteUser.pending, (state, action) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(deleteUser.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             console.log(action);
    //             state.dataUsers=state.dataUsers.filter((user)=>{return user.id!==action.payload});
    //         })
    //         .addCase(deleteUser.rejected, (state, action) => {
    //             state.isLoading = false;;
    //             state.error = action.error.message;
    //         })
    // }
})

export const { authenticateAction,unAuthenticateAction } = authSlice.actions
export default authSlice.reducer
