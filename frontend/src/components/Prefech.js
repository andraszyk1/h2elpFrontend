import React,{useEffect} from 'react'
import store from '../store'
import { Outlet } from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { usersApi} from "../store/api/usersApi";
import { useGetUsersQuery} from "../store/api/usersApi";
import { categoriesApi } from '../store/api/categoriesApi';
import { setUsers } from '../store/slices/usersSlice';

function Prefech() {
  // const dispatch=useDispatch()
  // const users=dispatch(usersApi.util.prefetch('getUsers',undefined,{force:false}))
  // const {data:usersData,isSuccess,isFetching,isLoading}=useGetUsersQuery(undefined,{
  //   refetchOnMountOrArgChange:false,refetchOnReconnect:false
  // });

  // useEffect(()=>{
  //   if(isSuccess){
  //   dispatch(setUsers(usersData))

  // }
  // },[dispatch,usersData,isSuccess])
  // 
  // useEffect(()=>{
  //   console.log("prefechuUeEffect_Users");
  //   // const adUsers=store.dispatch(usersApi.endpoints.getUsers.initiate())
  //   // const adUsers=store.dispatch(usersApi.util.prefetch('getUsers',undefined,{
  //   //   force:false
  //   // }))
  //   // return ()=>{
  //   //  adUsers.unsubscribe()
  //   // }
  // },[dispatch])
  // useEffect(()=>{
  //   console.log("prefechuUeEffect_Categories");
  //   // const categories=store.dispatch(categoriesApi.endpoints.getCategories.initiate())
  //   // const categories=store.dispatch(categoriesApi.util.prefetch('getCategories',undefined,{
  //   //   force:true
  //   // }))
  //   // return ()=>{
  //   //    categories.unsubscribe()
  //   // }
  // },[dispatch])
// let content 
//   if(isLoading){
//     content=<Spinner/>
//   }else if ( isSuccess){
//     content=<Outlet/>
//   }
//     return (
//       <>
//       {content}
//       </>
//   )
}

export default Prefech