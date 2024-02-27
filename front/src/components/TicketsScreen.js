
import { Box, Checkbox, Flex, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTicketsQuery } from '../store/api/mainApi'
import { selectCheckedTickets, selectDisableInputCheck, selectFilters, selectSerch, setAllCheckedTickets, setButtonAllTicketsChecked, setCheckedTickets } from '../store/slices/ticketsSlice'
import TableCustom from './TableCustom'
import TicketDeleteBtn from './TicketDeleteBtn'
import TicketEditBtn from './TicketEditBtn'
import TicketShowBtn from './TicketShowBtn'
import TicketsPanelActions from './TicketsPanelActions'
export default function TicketsScreen() {
    const dispatch = useDispatch()
    const checkedTickets = useSelector(selectCheckedTickets)
    const disableCheckedAll = useSelector(selectDisableInputCheck)
    const filters = useSelector(selectFilters)
    const search = useSelector(selectSerch)
    const [tickets, setTickets] = useState([])
    console.log("Filters in TicketScreen : ", filters);
    const formatDate=(date,destination='dateWithTime')=>{
        const newDate=new Date(date);
        const newMinutes=Number(newDate.getMinutes()) < 10 ? `0${newDate.getMinutes()}` : `${newDate.getMinutes()}`
        const newSeconds=Number(newDate.getSeconds()) < 10 ? `0${newDate.getSeconds()}` : `${newDate.getSeconds()}`
        const newMonth=Number(newDate.getMonth()) < 10 ? `0${newDate.getMonth()+1}` : `${newDate.getMonth()+1}`
        const newDay=Number(newDate.getDate()) < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`
        if(destination==='dateWithTime')
        return `${newDay}.${newMonth}.${newDate.getFullYear()} ${newDate.getHours()}:${newMinutes}:${newSeconds} `;
        if(destination==='onlydate'){
            return `${newDate.getFullYear()}-${newMonth}-${newDay}`;
        }
    }
    const { data, isSuccess, isLoading } = useGetTicketsQuery(
        {
            search: search ?? "",
            status: filters.status ?? "",
            category: filters.category ?? "",
            tworca: filters.tworca ?? "",
            opiekunowie: filters.opiekun ?? '',
            temat: filters.temat ?? "",
            utworzono: filters.utworzono ?? "",
            zaktualizowano: filters.zaktualizowano ?? "",

            limit: 10,

        })

        // console.log(data);
    const handleClickCheckTicket = (id) => {
        dispatch(setCheckedTickets(id))
    }
    const handleClickCheckTicketAll = (e) => {
        if (e.target.checked === true) {
            dispatch(setButtonAllTicketsChecked(true));
            dispatch(setAllCheckedTickets(data?.map(ticket => ticket.id)))
        }
        else {
            dispatch(setButtonAllTicketsChecked(false));
            dispatch(setAllCheckedTickets([]))
        }
    }

    const columns = [
        {
            colCheckBox:<Flex justify='center'><Checkbox id='checkAll' name='checkAll' onChange={handleClickCheckTicketAll} isDisabled={Array(checkedTickets).length === 0} isChecked={disableCheckedAll} /></Flex>,
            colValue: item =><Flex justify='center'><Checkbox size='md' colorScheme='green' value={item.id} isChecked={checkedTickets.indexOf(item.id) !== -1 ? true : false} onChange={() => handleClickCheckTicket(item.id)} /></Flex>
        },
        {
            
            colName: "Kategoria",
            colValue: item => item?.Category?.name,
            filter: {
                active: true, name: 'category', initialValue: filters?.category, options: data?.map(row=>({
                    value:row?.Category?.name,label:row?.Category?.name
                }))
            },
            sort: true,
        },
        {
            colName: "Temat",
            colValue: item => item?.temat,
            filter: {
                active: true, name: 'temat', initialValue: filters?.temat, options: data?.map((option) => ({
                    value: option?.temat,
                    label: option?.temat
                }))
            },
            sort: true
        },
        {
            colName: "Status",
            colValue: item => item?.status,
            filter: {
                active: true, name: 'status', initialValue: filters?.status, options: Array.from(new Set(data?.map((option) => ({
                    value: option?.status,
                    label: option?.status
                }))))
            },
            sort: true
        },
        {
            colName: "Twórca",
            colValue: item => item?.tworca?.name + " " + item?.tworca?.surname,
            filter: {
                active: true, name: 'tworca', initialValue: filters?.tworca, options: data?.map((option) => ({
                    value: option?.tworca?.login,
                    label: option?.tworca?.name + " " + option?.tworca?.surname
                }))
            },
            sort: true
        },
        {
            colName: "Opiekun",
            colValue: item => item?.opiekunowie.filter(opiekun=>opiekun.name!=='').map((opiekun)=>{
                return (opiekun.name + " " + opiekun.surname)
              }).join(', '),
            filter: {
                active: true, name: 'opiekun', initialValue: filters?.opiekun?.join(", "),options:data?.map(row=>({
                    value: row?.opiekunowie?.map(opiekun=>(opiekun.login)),
                    label:row?.opiekunowie?.map(opiekun=>(opiekun.name + " " +opiekun.surname)).join(', ')
                }))
            },
            sort: true
        },
     
        {
            colName: "Utworzono",
            colValue: item => formatDate(item?.createdAt,'dateWithTime'),
            filter: {
                active: true, name: 'utworzono', initialValue: filters?.utworzono, options: data?.map((option) => ({
                    value: formatDate(option?.createdAt,'onlydate'),
                    label: formatDate(option?.createdAt,'onlydate')
                }))
            },
            sort: true
        },
        {
            colName: "Zaktualizowano",
            colValue: item => formatDate(item?.updatedAt,'dateWithTime'),
            filter: {
                active: true, name: 'zaktualizowano', initialValue: filters?.zaktualizowano, options: data?.map((option) => ({
                    value: formatDate(option?.updatedAt,'onlydate'),
                    label: formatDate(option?.updatedAt,'onlydate')
                }))
            },
            sort: true,
        },
        {
            colName: "Akcje", colValue: item => <HStack>
                <TicketShowBtn ticketId={item.id} /> <TicketEditBtn ticketId={item.id} />   <TicketDeleteBtn ticketId={item.id} />
            </HStack>
        },
    ]

    useEffect(() => {
        if (isSuccess) {
            setTickets(data)
        }

    }, [isSuccess, data])

    return (
        <>
            <Box>
                <Box className='fluid'>
                    <TicketsPanelActions />
                </Box>
            </Box>
            <Box>
                <Box className='fluid'>
                    <TableCustom data={tickets} columns={columns} isLoading={isLoading} />
                </Box>
            </Box>

        </>
    )
}
