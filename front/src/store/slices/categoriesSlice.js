// import { createSlice,createSelector } from "@reduxjs/toolkit";
// import { getCategories, insertCategory, deleteCategory } from '../thunks/categories';
// import { categoriesApi } from "../api/categoriesApi";
// export const categoriesSlice = createSlice({
//     name: "categories",
//     initialState: {
//         dataCategories: [],
//         isLoading: false,
//         error: null,
//         findedCategories:[]
//     },
//     reducers: {
//         searchCategories(state,action){
//             const findedCategories  = state.findedCategories.filter(
//                  category=>{return  category.temat.toLowerCase().includes(action.payload.toLowerCase()) ||
//                     category.tresc.toLowerCase().includes(action.payload.toLowerCase())
                
                    
//             })         
//             state.dataCategories=findedCategories;
            
//         }
//     },
//     // extraReducers(builder) {
//     //     builder.addCase(getCategories.pending, (state, action) => {
//     //         state.isLoading = true;
//     //     }).addCase(getCategories.fulfilled, (state, action) => {
//     //         state.isLoading = false;
//     //         state.dataCategories = action.payload;
//     //         state.findedCategories=state.dataCategories;
//     //       console.log(action);
//     //         })
//     //         .addCase(getCategories.rejected, (state, action) => {
//     //             state.isLoading = false;
//     //             state.error = action.error.message;
//     //         })
//     //     builder.addCase(insertCategory.pending, (state, action) => {
//     //             state.isLoading = true;
//     //         });
//     //         builder.addCase(insertCategory.fulfilled, (state, action) => {
//     //             state.isLoading = false;
//     //             state.dataCategories.push(action.payload);
//     //         })
//     //         builder.addCase(insertCategory.rejected, (state, action) => {
//     //             state.isLoading = false;
//     //             state.error = action.error.message;
//     //         })
//     //     builder.addCase(deleteCategory.pending, (state, action) => {
//     //             state.isLoading = true;
//     //         })
//     //         builder.addCase(deleteCategory.fulfilled, (state, action) => {
//     //             state.isLoading = false;
//     //             console.log(action);
//     //             state.dataCategories=state.dataCategories.filter((category)=>{return category.id!==action.payload});
//     //         })
//     //         builder.addCase(deleteCategory.rejected, (state, action) => {
//     //             state.isLoading = false;;
//     //             state.error = action.error.message;
//     //         })
//     // }
// })
// const empty = []


// export const {searchCategories} = categoriesSlice.actions
// export default categoriesSlice.reducer
