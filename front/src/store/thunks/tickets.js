// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// const client = axios.create({
//     baseURL: "http://localhost:3000/tickets",
//     headers: { 'X-Custom-Header': 'Maflow' }

// });
// const getTickets = createAsyncThunk('tickets/getTickets', async () => {
//     const response = await client.get("/");
//     return response.data;
// })
// const deleteTicket= createAsyncThunk('tickets/deleteTicket',async (id)=>{
//     console.log(id);
//     await client.delete(`/${id}`);
//     return id;
// })

// const insertTicket = createAsyncThunk('tickets/insertTicket',async (ticket)=>{
//     const response = await client.post('/',ticket);
//     return response.data;
// })

// const updateTicket= createAsyncThunk('tickets/updateTicket', async (id, ticket)=>{
//     const response = await client.put(`/${id}`, ticket);
//     return response.data;
// })

// const updateTicketStatus= createAsyncThunk('tickets/updateTicketStatus', async ({ticketId, name})=>{
//     console.log(ticketId,name);
//     const id=ticketId
//     const response=await client.put(`/${id}`, {status:name});
//     console.log(response);
//     return {ticketId, name};
// })

// export { getTickets, deleteTicket, insertTicket, updateTicket,updateTicketStatus };
