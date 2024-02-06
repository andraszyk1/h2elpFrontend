import { useEffect, useState } from 'react'
import { useGetCategoriesQuery } from '../store/api/categoriesApi'
import { Card, Spinner, Alert, Button, Form } from 'react-bootstrap'
import { IoCloseSharp } from "react-icons/io5";
import { TicketAddForm, TicketAddFormNowyPracownik, TicketAddFormWzorzec1 } from './Forms'
import { useSelector } from 'react-redux';

function TicketAddByCategory() {
    const account = useSelector(state => state.auth.loggedUser);
    const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery()
    const [category, setCategory] = useState('')
    const [categoryId, setCategoryId] = useState(null)
    const [searchCategory, setSearchCategory] = useState('')
    const [filteredCategories, setFilteredCategories] = useState([])
    let content;
    useEffect(() => {
        if (isSuccess)
            setFilteredCategories(data)
    }, [data, isSuccess])
    const handleCloseForm = () => {
        setCategory('')
        setSearchCategory('')
        setFilteredCategories(data)
    }
    const handleOnChange = (e) => {
        console.log(e.target.value);
        setSearchCategory(e.target.value)

        const filteredCategories = data?.filter(category => category?.name.toLowerCase().includes(searchCategory.toLowerCase()))

        setFilteredCategories(filteredCategories)
    }
    const TicketAddFormWrapper = ({ children }) => {
        return (
            <Card className='my-4 shadow'>
                <Card.Header>
                    <Button onClick={handleCloseForm} variant='light' size='sm'><h4><IoCloseSharp /></h4> </Button>
                    {" "}
                    Dodaj zgłoszenie - {category}
                </Card.Header>

                <Card.Body>
                    {children}
                </Card.Body>
            </Card>
        )
    }
    const renderByCategory = (content) => {
        console.log("a")
        if (category === "Zasoby sieciowe") {
            return (
                <TicketAddFormWrapper ><TicketAddForm /></TicketAddFormWrapper>
            )
        }
        if (category === "Nowy pracownik") {
            return (
                <TicketAddFormWrapper ><TicketAddFormNowyPracownik categoryId={categoryId} tworcaId={account.login} /></TicketAddFormWrapper>
            )
        }
        if (category === "Problemy z siecią komputerową" || category === "Usterka komputera" || category === "Drukarki" ||
            category === "Baza techniczna" || "Baza danych" || category === "Rozbudowa sprzętu" || category === "Instalacja nowego komputera" ||
            category === "Instalacja oprogramowania" || category === "Zmiana miejsca użytkowania" || category === "Przydział telefonu komórkowego" ||
            category === "Problemy z czytnikiem" || category === "Outlook" || category === "Nadanie uprawnień do druku/skanowania" ||
            category === "Internet" || category === "MS Office" || category === "Instalacja/przeniesienie telefonu stacjonarnego" ||
            category === "Instalacja drukarki" || category === "Usterka drukarki" || category === "Instalacja/przeniesienie telefonu stacjonarnego"
        ) {
            return (
                <TicketAddFormWrapper ><TicketAddFormWzorzec1 categoryId={categoryId} tworcaId={account.login} /> </TicketAddFormWrapper>
            )
        }
        return (<><Form className='m-2 p-2 shadow'>  <Form.Control placeholder='Szukaj kategorię...' onChange={handleOnChange} type='text' /></Form><div className='d-flex flex-column-reverse'>{content}</div></>)
    }
    // memo(renderByCategory)
    const handleCategoryClick = (category) => {
        setCategory(category?.name)
        setCategoryId(category?.id)
    }
    if (isLoading) {
        content = <Spinner />
    } else if (isSuccess) {

        content = filteredCategories?.map(function (category) {
            return <Card className='p-2 m-2 shadow card-hover' key={category?.id} onClick={() => handleCategoryClick(category)}>{category?.name}</Card>
        })


    } else if (isError) {
        content = <Alert>Brak kategorii do wyboru</Alert>
    }

    return (
        <> {renderByCategory(content)}</>
    )
}

export default TicketAddByCategory