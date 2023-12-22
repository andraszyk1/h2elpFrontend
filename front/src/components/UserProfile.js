import React from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useGetUserQuery } from '../store/api/usersApi'

function UserProfile() {
  const { login } = useParams()
  const { data: user, isSuccess,isLoading } = useGetUserQuery(login)

  let content;
  if (isLoading){
    content=<Spinner/>
  } 
  else if (isSuccess) {
    console.log(user);
    content = <Table  striped bordered hover className='m-4 shadow'>
      <thead>
        <tr>
          <th>Właściowść</th>
          <th>Wartość</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries({...user}).map((row, i) => {
          console.log(row[0]);
          if (row[0] === "przelozonyObject") {
            let przelozonyObject = JSON.parse(row[1])
            return (<tr key={row[0]}><td>przelozony</td><td>{przelozonyObject?.name} {przelozonyObject?.surname}</td></tr>)
          }else{
            return (<tr key={i}><td>{row[0]}</td><td>{row[1]??"-"}</td></tr>)
          }
        })
        



        }
      </tbody>

    </Table>
  }
  return (
    <>
      {content}
    </>
  )
}

export default UserProfile