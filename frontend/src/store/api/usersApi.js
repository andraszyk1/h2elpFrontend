import { mainApi } from '../api/mainApi'
export const usersApi = mainApi.injectEndpoints({
    endpoints: builder => ({
      getUsers: builder.query({
            query: (search) => ({
                url:'/users',
                params:search,
                method:'GET'
            }

                ),
          }),
          getADUsers: builder.query({
            query: () => ({ url: `users/getadusers` }),
          }),
        getUser: builder.query(
            {
                query: (login) => ({ url: `users/${login}` }),
            }),
        addUser: builder.mutation({
            query: (user) => ({
                url: `users`,
                body: user,
                method: 'USER'
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `users/${user.id}`,
                body: user,
                method: 'PATCH',
            }),
        }),
    })
})

export const { 
    useGetUsersQuery,useGetUserQuery,
    useAddUserMutation,useUpdateUserMutation

} = usersApi


