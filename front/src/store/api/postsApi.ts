import {mainApi} from '../api/mainApi'

export const postStatuses = ['draft', 'published', 'pending_review'] as const
export interface User{
    email:string,
    name:string,
    surname:string
}
export interface Ticket{
id:number
}
export interface Post {
  content: string,
  status: typeof postStatuses[number],
  createdAt:string,
  email:string,
  User:User
}

export interface Obiekt{
    page:number,
    ticketId:number
}

interface ListResponse<T> {
  currentPage: number
  id:number,
  per_page: number
  total: number
  totalPages: number | string
  count: number
  data: T[]
  rows: T[]

}
export const postsApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<ListResponse<Post>, Obiekt | void>({
      query: ({ticketId,page}:Obiekt) => `tickets/${ticketId}/posts/page/${page}`,
      providesTags: [ { type:'Posts', id:'LIST' }],
    }),
    //:id/post/
    addPost: build.mutation<ListResponse<Post>, Obiekt | void>({
      query: ({ticketId,...params}:Obiekt) => ({ 
        url:`tickets/${ticketId}/post`,
        body:{...params},
        method:'POST'
      }),
      invalidatesTags: [ { type:'Posts', id:'LIST' }],
    }),
  }),
})

export const { 
    useGetPostsQuery,useAddPostMutation
} = postsApi
// export const postsApi = mainApi.injectEndpoints({
//     endpoints: builder => ({
//         getPosts: builder.query({
//             query: () => '/posts',
//             providesTags: (result) =>
//                 result
//                     ? [
//                         ...result.map(({ id }) => ({ type: 'Posts', id })),
//                         { type: 'Posts', id: 'LIST' }
//                     ]
//                     : [{ type: 'Posts', id: 'LIST' },],
//         }),
//         getPost: builder.query(
//             {
//                 query: (id) => ({ url: `posts/${id}` }),
//                 providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }],
//             }),
//         getPostsByTworcaId: builder.query({
//             query: (id) => ({ url: `posts/tworca/${id}` }),
//             providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }]
//         }),
//         addPost: builder.mutation({
//             query: (post) => ({
//                 url: `posts`,
//                 body: post,
//                 method: 'POST'
//             }),
//             invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
//         }),
//         updatePost: builder.mutation({
//             query: (post) => ({
//                 url: `posts/${post.id}`,
//                 body: post,
//                 method: 'PATCH',
//             }),
//             invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: "LIST" }, { type: 'Posts', id: arg.id }],
//         }),
//     })
// })

// export const { 
//     useGetPostsQuery,useGetPostQuery,useGetPostsByTworcaIdQuery,
//     useAddPostMutation,useUpdatePostMutation

// } = postsApi