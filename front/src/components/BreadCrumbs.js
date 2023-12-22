import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation ,useM} from 'react-router-dom';
function BreadCrumbs() {
    const location = useLocation()
    const currPath = location.pathname
    const tabPath = currPath.split("/")

    return (
        <>
        
        <Breadcrumb>
           
            {tabPath.map((pathItem,i) => {
           
                if (i===0){
                          return      <Breadcrumb.Item  key={pathItem+i+"one"} href={'/dashboard'} > Strona główna</Breadcrumb.Item>
                }
                else if(i>1){
                   return      <Breadcrumb.Item key={pathItem+i+"two"} active>{pathItem}</Breadcrumb.Item>
                }else{
                   return <Breadcrumb.Item key={pathItem+i+"three"} href={'/'+pathItem}>{pathItem}</Breadcrumb.Item>
            }}
            )
            }


        </Breadcrumb>
        </>
    )
}

export default BreadCrumbs