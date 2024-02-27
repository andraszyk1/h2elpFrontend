import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import { useAddPostMutation } from '../store/api/postsApi';
import { MyTextInput } from "./Forms";
export const TicketPostAddForm = () => {
    const account = useSelector(state => state.auth.loggedUser);
    const { id } = useParams()
    const [addPost, { isLoading,error }] = useAddPostMutation();

    return (
        <>
            <Formik
                initialValues={{ login: account.login, ticketId: id, content: "" }}
                validationSchema={Yup.object({
                    content: Yup.string()
                        .required("Podaj treść komentarza"),
                })}
                onSubmit={async (newPost,{resetForm}) => {
                    await addPost(newPost);
                    resetForm()
                }}
            >
                {(Formik) => (

                    <Stack spacing="6" as="form" onSubmit={Formik.handleSubmit}>
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
                            <FormControl>
                                <MyTextInput
                                    type="textarea"
                                    name="content"
                                    placeholder="Treść komentarza..."
                                    rows="4"
                                />

                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button
                               variant='outline' colorScheme="blue"
 
                                size="sm"
                                fontSize="sm"
                                isLoading={isLoading}
                                type="submit"
                            >
                                Dodaj
                            </Button>
                        </Stack>
                    </Stack>

                )}
            </Formik>
        </>

    )
}