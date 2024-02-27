import { Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomAsyncSelect } from "./Forms";
function TableCustom({ data, columns, isLoading }) {

  return (
    <Skeleton isLoaded={!isLoading} fadeDuration={4}>
      <TableContainer>
        <Table variant='striped' colorScheme="blackAlpha" size='sm'>
          <Thead>
            <Tr>
              {columns.map((col, i) => {
                return <Th key={i} maxW={col?.filter?.active === true ? '150px' : 'auto'} minW={col?.filter?.active === true ? '150px' : 'auto'}>
                  <>
                    {col?.colCheckBox ? (col?.colCheckBox) : '' }
                  
                    {col?.filter?.active === true ?

                      <Formik
                        initialValues={{ [col?.filter?.name]: col?.filter?.initialValue }}
                        validationSchema={Yup.object({ [col?.filter?.name]: Yup.mixed().notRequired() })}
                      ><Form>
                          <CustomAsyncSelect defaultValue={col?.filter?.initialValue ? { value: col?.filter?.initialValue, label: col?.filter?.initialValue } : ''} options={col?.filter?.options} name={col?.filter?.name} fieldName={col?.filter?.name} placeholder={col?.colName} />
                        </Form>
                      </Formik>

                      :
                      ''
                    }
                  </>
                </Th>
              })}
            </Tr>
          </Thead>

          <Tbody>
            {
              data.map((row) => {
                return (<Tr key={row.id}>
                  {columns.map((col, i) => {
                    return (<td key={i}>{col?.colValue(row)}</td>)
                  })}
                </Tr>)
              })
            }
          </Tbody>

        </Table>
        {/* <Pagination>
        <Pagination.First />
        <Pagination.Prev /> 
         {Array(countPages).fill(0).map((_, i) => {
          console.log(i)
          return _
        })} 
             
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last /> 
      </Pagination> 
      <Row>
                <Col className='fluid'>
                    <Form.Select size="sm" onChange={(e) => setTicketsLimit(e.target.value)}>
                        <option>1</option>
                        <option>5</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                    </Form.Select>
                </Col>
            </Row> */}
      </TableContainer>
    </Skeleton>

  );
}

export default TableCustom;