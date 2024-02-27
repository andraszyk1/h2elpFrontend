import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { AsyncSelectUsers } from ".";
import { useAddAcceptTicketMutation, useUpdateTicketStatusMutation } from "../../store/api/mainApi";
import { setShowToast } from "../../store/slices/toastSlice";
export const TicketAddAcceptForm = ({ id }) => {
    const dispatch = useDispatch();
    const [addAccept, { isLoading: isLoadingAccept, error }] = useAddAcceptTicketMutation();
    const [updateTicketStatus, { isLoading: isLoadingStatus }] = useUpdateTicketStatusMutation();

    return (
        <>
            <Formik
                initialValues={{ status: "Do Akceptacji", akceptujacy: {value:null,label:null}, ticketAcceptId: id }}
                validationSchema={Yup.object({
                    akceptujacy: Yup.mixed()
                        .notRequired("Wybierz osobę akceptującą"),
                })}
                onSubmit={async (newAccept) => {
                    await updateTicketStatus({ id: [id], status: "Wstrzymane" }).unwrap()
                    const response = await addAccept(newAccept).unwrap()
                    console.log(response)
                    const { message,success } = response;
                    dispatch(setShowToast({ showToast: true, message: message, variant: success ? 'success' : 'danger' }));
            
          
                }}
            >
                <Form>
                    <Stack spacing="6">
                        {error && (
                            <Alert
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                            >
                                <AlertIcon />
                                <AlertTitle>Przepraszamy</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Stack spacing="5">
                            <AsyncSelectUsers
                               isClearable={true}
                                fieldName="akceptujacy"
                                name="akceptujacy"
                                placeholder="Wybierz..."
                            />
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                variant='outline' colorScheme="blue"
                                size="sm"
                                fontSize="sm"
                                isLoading={isLoadingAccept || isLoadingStatus}
                                type="submit"
                            >
                                Dodaj
                            </Button>
                        </Stack>
                    </Stack>
                </Form>

            </Formik>
        </>

    )
}