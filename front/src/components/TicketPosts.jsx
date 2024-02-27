import { Badge, Box, Divider, Flex, HStack, IconButton, Skeleton, Spacer, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useGetPostsQuery } from '../store/api/postsApi'
import { TimeAgo, timeDifferenceInHours } from './TimeAgo'

const TicketPosts = ({ id }) => {
  const [page, setPage] = useState(1)
  const [ticketId] = useState(id)
  const { data: posts, isLoading } = useGetPostsQuery({ ticketId, page })
  const handleStatusDependOnTime = (createdAt) => {
    const hoursLeft = Number(timeDifferenceInHours(createdAt))
    if (hoursLeft < 1) {
      return { color: 'green.200', title: 'Nowe' }
    } else if (hoursLeft >= 0 && hoursLeft < 24)
      return { color: 'blue.200', title: 'Starsze' }
    else if (hoursLeft >= 24 && hoursLeft < 48)
      return { color: 'gray.200', title: 'Pre Archiwum' }
    else if (hoursLeft > 48)
      return { color: 'black.200', title: 'Archiwum' }
  }
  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        overflow="hidden"
        p="4"
      >
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          {posts?.rows.length > 0 ? <> <Text fontSize='1.1rem' fontWeight='700'>Komentarze</Text> </> : 'Brak Komentarzy'}
          {posts?.rows.length > 0 &&
            <>
              <Spacer />
              <HStack gap='2' mr='4' >
                <IconButton
                  onClick={() => setPage((prev) => page === 1 ? prev : prev - 1)}
                  icon={<FaArrowLeft size="10px" />}
                  size="xs"
                  bg="blue.400"
                  isDisabled={page === 1 }
                />
                <IconButton
                  onClick={() => setPage((prev) => page === posts.totalPages ? prev : prev + 1)}
                  icon={<FaArrowRight size="10px" />}
                  size="xs"
                  bg="blue.400"
                  isDisabled={page === posts.totalPages }
                />
                <Text minWidth='30px' fontSize="sm" fontWeight="semibold" color='subtle'>{page} / {posts?.totalPages}</Text>
              </HStack>
            </>
          }

        </Flex>
        <Divider />
        <Flex direction='column'>
          {posts?.rows.map(({ content, createdAt, User }, i) => (
            <Box key={i}>
        
              <HStack>
                <Text fontWeight='500'> {User.name + " " + User.surname} <Badge bgColor={handleStatusDependOnTime(createdAt).color} >{handleStatusDependOnTime(createdAt).title}</Badge> </Text>
              </HStack>
              <HStack justifyContent='left' align='center' justifyItems='left'>
                <Text>{content}
                </Text> </HStack>
              <HStack>
                <Text fontSize='xs'><b>Dodane :</b> <TimeAgo timestamp={createdAt} /></Text>
              </HStack>
              <Divider />

            </Box>
          ))}
        </Flex>
      </Box>
    </Skeleton>
  )
}


export default TicketPosts


