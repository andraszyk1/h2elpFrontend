import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hidden-dusk-87411-ba77d74a1dd4.herokuapp.com/' }),
  tagTypes: ['Tickets', 'UserTickets', 'Posts','TicketAccepts'],
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: (query) => ({ url: `tickets`,params:query }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Tickets', id })),
            { type: 'Tickets', id: 'LIST' }
          ]
          : [{ type: 'Tickets', id: 'LIST' }],

    }),
    getTicket: builder.query(
      {
        query: (id) => ({ url: `tickets/${id}` }),
        providesTags: (result, error, arg) => [{ type: 'Tickets', id: "LIST" }, { type: 'Tickets', id: arg }],
       
      }),
    getTicketsByTworcaId: builder.query({
      query: ({id,page}) => ({ url: `tickets/tworca/${id}/page/${page}` }),

      providesTags:(result) =>
      result.data
        ? [
          ...result.data.map(({ id }) => ({ type: 'UserTickets', id })),
          { type: 'UserTickets', id: 'LIST' }
        ]
        : [{ type: 'UserTickets', id: 'LIST' }]
    }),
    addAcceptTicket: builder.mutation({
      query: (AcceptTicket) => ({
        url: `accepttickets`,
        body: AcceptTicket,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
    }),
    deleteAcceptTicket: builder.mutation({
      query: (AcceptTicket) => ({
        url: "accepttickets",
        body: AcceptTicket,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
    }),
    updateAcceptTicket: builder.mutation({
      query: (AcceptTicket) => ({
        url: "accepttickets",
        body: AcceptTicket,
        method: 'PATCH'
      }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }]
    }),
    getTicketAccepts: builder.query({
      query: () => ({ url: `accepttickets` }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'TicketAccepts', id })),
            { type: 'TicketAccepts', id: 'LIST' }
          ]
          : [{ type: 'TicketAccepts', id: 'LIST' },],

    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: `tickets`,
        body: ticket,
        method: 'POST',
        formData:true,
      }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' },{ type: 'UserTickets' ,id:"LIST" }]
    }),
    updateTicket: builder.mutation({
      query: ({id,...payload}) => ({
        url: `tickets/${id}`,
        body: payload,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Tickets', id: "LIST" }]

    }),
    getTicketsCountWithStatus: builder.query({
      query: ({status}) => ({
        url: `tickets/status/${status}`,
        method: 'GET',
      }),
     
    }),
    updateTicketStatus: builder.mutation({
      query: (payload) => ({
        url: `tickets/status`,
        body: payload,
        method: 'POST',

      }),
      invalidatesTags: (result, error, payload) => [{ type: 'Tickets', id: "LIST" },{ type: 'UserTickets', id: payload.id }]
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `tickets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tickets', id: "LIST" }]
    }),
    uploadFile: builder.mutation({
      query: (payload) => ({
        url: `file`,
        method: 'POST',
        body:payload
      }),

    }),

  })
})


export const {
  useGetTicketsQuery,
  useGetTicketQuery,
  useAddTicketMutation,
  useUpdateTicketMutation,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
  useGetTicketsByTworcaIdQuery,
  useAddAcceptTicketMutation,
  useDeleteAcceptTicketMutation,
  useGetTicketAcceptsQuery,
  useUpdateAcceptTicketMutation,
  useGetTicketsCountWithStatusQuery,
  useUploadFileMutation

} = mainApi
