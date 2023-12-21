// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// const client = axios.create({
//     baseURL: "http://localhost:3000/",
//     headers: { 'X-Custom-Header': 'helpdesk' }

// });
// const getCategories = createAsyncThunk('categories/getCategories', async () => {
//     const response = await client.get("/");
//     console.log(response);
//     return response.data;
// })
// const deleteCategory= createAsyncThunk('categories/deleteCategory',async (id)=>{
//     console.log(id);
//     await client.delete(`/${id}`);
//     return id;
// })

// const insertCategory = createAsyncThunk('categories/insertCategory',async (category)=>{
//     const response = await client.post('/',category);
//     return response.data;
// })

// const updateCategory= createAsyncThunk('categories/updateCategory', async (id, category)=>{
//     const response = await client.put(`/${id}`, category);
//     return response.data;
// })

// export { getCategories, deleteCategory, insertCategory, updateCategory };
