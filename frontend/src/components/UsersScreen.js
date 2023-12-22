import React from "react";
import { Row, Spinner, Alert, Table } from 'react-bootstrap';
import { User } from './User';
import { useGetUsersQuery } from '../store/api/usersApi'
import { selectSearch } from '../store/slices/usersSlice'
import { useSelector } from "react-redux";
import { UserSearch } from "./UserSearch";
export default function UsersScreen() {
    const search = useSelector(selectSearch)
    const { data: usersData, isSuccess: isSuccessGetUsers, isLoading: isLoadingGetUsers,  error: errorUsers } = useGetUsersQuery({ search: search,limit:7 });

    let content
    if (isLoadingGetUsers) {
        content = <Spinner />
    }
    else if (isSuccessGetUsers) {
        content =<Table   hover size="sm"><tbody>{usersData.map(user => (
            <User key={user.login} user={user} />
        ))
    }
    </tbody>
        </Table>
    } else {
        content = errorUsers ?? <Alert>{errorUsers}</Alert>
    }

    return (
        <>
            <Row className="my-2">
                <UserSearch />
            </Row>
            <Row>
                {content}
            </Row>
        </>
    )
}