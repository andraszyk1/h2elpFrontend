import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { MdCheckCircle } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useDeleteAcceptTicketMutation, useGetTicketQuery, useUpdateAcceptTicketMutation } from '../store/api/mainApi';
import CardCustom from './CardCustom';
import HistoryStepper from './HistoryStepper';
import { TicketAddAcceptForm } from './Forms/TicketAddAcceptForm';
import TicketPanelActions from './TicketPanelActions';
import { TicketPostAddForm } from './TicketPostAddForm';
import TicketPosts from './TicketPosts';
import { TimeAgo } from './TimeAgo';
export default function TicketSinglePage() {
  const { id } = useParams();
  const { data: ticket, isSuccess, isLoading } = useGetTicketQuery(parseInt(id))
  const [deleteAccept] = useDeleteAcceptTicketMutation()
  const [updateAccept] = useUpdateAcceptTicketMutation()

  const handleDeleteAccept = async (userLogin, ticketId) => {
    try {
      await deleteAccept({ userAcceptId: userLogin, ticketAcceptId: ticketId })
    } catch (error) {
      console.error(error.message);

    }
  }
  const handleUpdateAccept = async (userLogin, ticketId, status) => {
    try {
      const response = await updateAccept({ userAcceptId: userLogin, ticketAcceptId: ticketId, status }).unwrap()
      console.log(response);
    } catch (error) {
      console.error(error.message);

    }
  }

  return (
    <Container minW='100%'>
      <CardCustom isLoading={isLoading} p='0' mb='2' h='100%' overflow='hidden'>
        <TicketPanelActions ticket={ticket} />
      </CardCustom>
      <SimpleGrid columns={[1, 1, 2, 3]} gap='4'>
        <CardCustom cardTitle="Dane Podstawowe" isLoading={isLoading}>
          <List spacing={1}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='blue.500' />
              <b>Temat</b> : {ticket?.temat}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='blue.500' />
              <b>Kategoria</b> : {ticket?.Category?.name}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color={ticket?.status === 'Zamknięte' ? 'red.500' : "green.500"} />
              <b>Status</b> : {ticket?.status}
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='blue.500' />
              <b>Utworzone :</b> <TimeAgo timestamp={ticket?.createdAt} />
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='blue.500' />
              <b>Zmodyfikowane</b> : <TimeAgo timestamp={ticket?.updatedAt} />
            </ListItem>
          </List>
        </CardCustom>

        <CardCustom cardTitle='Opis' isLoading={isLoading}>
          {ticket?.tresc}
          {ticket?.fileName ? <Image src={"https://hidden-dusk-87411-ba77d74a1dd4.herokuapp.com/uploads/" + ticket?.fileName} /> : ""}
        </CardCustom>
        <CardCustom cardTitle="SLA" isLoading={isLoading}>
          <Text fontWeight='900'> SLA Standard</Text>
          <Text fontWeight='500'> Data reakcji :</Text>
          <Text fontWeight='500'> Upłyneło  :</Text>
        </CardCustom>
        <CardCustom cardTitle="Akceptacje" isLoading={isLoading}>
          <TicketAddAcceptForm id={ticket?.id} />
          <Box>
            <Divider />
            {ticket?.ticketAccepts?.map((accept, i) => (
              <Box key={i}>
                <HStack justify='center'>
                  <Text align='center'>
                    {accept?.name} {accept?.surname} ({accept?.login})
                    {" "}
                    <Badge
                      bgColor={accept?.TicketsAccepts?.status === 'Odrzucone' ? 'red.200' : accept?.TicketsAccepts?.status === 'Zaakceptowane' ? 'green.200' : 'blue.200'}>
                      {accept?.TicketsAccepts?.status}
                    </Badge>   </Text>
                </HStack>

                <ButtonGroup justifyContent='center' variant='outline' size='xs' colorScheme='blue' gap={{ base: '1', md: '0' }} spacing={{ base: '0', md: '2' }} width={{ base: '100%' }} >
                  <Button title='Zaakceptuj' colorScheme='green' onClick={() => handleUpdateAccept(accept?.login, ticket.id, "Zaakceptowane")}>Zaakceptuj</Button>
                  <Button title='Odrzuć' colorScheme='blue' onClick={() => handleUpdateAccept(accept?.login, ticket.id, "Odrzucone")}>Odrzuć</Button>
                  <Button colorScheme='red' title='Usuń akceptację' onClick={() => handleDeleteAccept(accept?.login, ticket.id)}><AiFillDelete /></Button>
                </ButtonGroup>
                <Divider />
              </Box>
            )
            )}

          </Box>
        </CardCustom>

        <CardCustom cardTitle='Dodaj Komentarz' isLoading={isLoading}>
          < TicketPostAddForm />
          <TicketPosts id={ticket?.id} />
        </CardCustom>

        <CardCustom cardTitle="Osoby powiązane" isLoading={isLoading}>
          <Tabs isLazy>
            <TabList aria-orientation='horizontal'>
              <Tab>Zgłaszający</Tab>
              <Tab>Autor</Tab>
              <Tab>Opiekunowie</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <List>
                  <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Imię nazwisko :</b>   {ticket?.tworca?.name + " " + ticket?.tworca?.surname} </ListItem>
                  <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Zakład :</b>   {ticket?.tworca?.zaklad}</ListItem>
                  {ticket?.tworca?.email ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Email</b> {ticket?.tworca?.email} </ListItem> : null}
                  {ticket?.tworca?.telefon ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Telefon</b> {ticket?.tworca?.telefon} </ListItem> : null}
                  {ticket?.tworca?.dzial ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Dział</b> {ticket?.tworca?.dzial} </ListItem> : null}
                  {ticket?.tworca?.ulica ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Adres</b> {ticket?.tworca?.kraj + " " + ticket?.tworca?.wojewodztwo + " " + ticket?.tworca?.ulica + " " + ticket?.tworca?.kodpocztowy} </ListItem> : null}
                </List>
              </TabPanel>
              <TabPanel>
                <List variant="flush">
                  <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Imię nazwisko :</b>   {ticket?.zglaszajacy?.name + " " + ticket?.zglaszajacy?.surname} </ListItem>
                  <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Zakład :</b>   {ticket?.zglaszajacy?.zaklad}</ListItem>
                  {ticket?.zglaszajacy?.email ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Email</b> {ticket?.zglaszajacy?.email} </ListItem> : null}
                  {ticket?.zglaszajacy?.telefon ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Telefon</b> {ticket?.zglaszajacy?.telefon} </ListItem> : null}
                  {ticket?.zglaszajacy?.dzial ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Dział</b> {ticket?.zglaszajacy?.dzial} </ListItem> : null}
                  {ticket?.zglaszajacy?.ulica ? <ListItem><ListIcon as={MdCheckCircle} color='blue.500' /><b>Adres</b> {ticket?.zglaszajacy?.kraj + " " + ticket?.zglaszajacy?.wojewodztwo + " " + ticket?.zglaszajacy?.ulica + " " + ticket?.zglaszajacy?.kodpocztowy} </ListItem> : null}
                </List>
              </TabPanel>
              <TabPanel>
                <List>
                  {ticket?.opiekunowie.length > 0 ?
                    ticket?.opiekunowie?.map((opiekun, i) => {
                      return (<ListItem key={i}>
                        <ListIcon as={MdCheckCircle} color='blue.500' />
                        {opiekun?.name + " " + opiekun?.surname + " (" + opiekun?.login + ")"}
                      </ListItem>)
                    })
                    :
                    <ListItem className='mt-2 bg-light border-danger small' >Brak przypisanych opiekunów</ListItem>
                  }
                </List>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardCustom>

        <CardCustom cardTitle="Historia Zgłoszenia" isLoading={isLoading}>
          <HistoryStepper />
        </CardCustom>
      </SimpleGrid>
    </Container>
  )
}
