import { mainApi } from '../api/mainApi'

export const loginApi = mainApi.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                body: user,
                method:'POST'
            }),
        }),
        logout: builder.mutation({
            query: (user) => ({
                url: 'logout',
                body: user,
                method:'POST'
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `user/${id}`
            }),
        })
    })
})

export const {useLoginMutation,useLogoutMutation}=loginApi