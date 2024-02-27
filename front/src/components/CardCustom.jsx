import { Box, Skeleton } from '@chakra-ui/react'

const CardCustom = ({ cardTitle, isLoading, children ,...rest}) => {
    return (
        <Skeleton isLoaded={!isLoading}>
            <Box
                h='100%'
                mt={rest.mt ? rest.mt : '2'}
                p={rest.p ? rest.p : '6'}
                shadow="md"
                {...rest}
            >
                <Box fontWeight="bold" minWidth='100px' position="absolute"
                    mt="-8"
                    borderBottom='3px'
                    borderBottomColor='blue.500'
                    fontSize="lg" >
                    {cardTitle}
                </Box>
                <Box>
                    <Box py={{ base: '1', md: '2' }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Skeleton>
    )
}

export default CardCustom