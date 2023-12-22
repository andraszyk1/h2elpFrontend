// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// const client = axios.create({
//     baseURL: "http://192.168.60.112:3000/users",
//     headers: { 'X-Custom-Header': 'Maflow' }

// });
// const getUsers = createAsyncThunk('users/getUsers', async () => {
//     const response = await client.get();
//     return response.data;
// })
// const deleteUser= createAsyncThunk('users/deleteUser',async (id)=>{
//     await client.delete(`/${id}`);
//     return id;
// })

// const insertUser = createAsyncThunk('users/insertUser',async (user)=>{
//     const response = await client.post('/',user);
//     return response.data;
// })

// const updateUser= createAsyncThunk('users/updateUser', async (id, user)=>{
//     const response = await client.put(`/${id}`, user);
//     return response.data;
// })

// export { getUsers, deleteUser, insertUser, updateUser };
