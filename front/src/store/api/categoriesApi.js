import { mainApi } from '../api/mainApi'

export const categoriesApi = mainApi.injectEndpoints({
    endpoints: builder => ({
            getCategories: builder.query({
                query: () => '/categories',
             
          }),
    })
})

export const { 
    useGetCategoriesQuery
} = categoriesApi