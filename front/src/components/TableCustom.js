import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { FaArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSort } from "../store/slices/ticketsSlice";
function TableCustom({ data, columns }) {
  const dispatch = useDispatch()
  const [order, setOrder] = useState('asc')
  const [sortedValue, setSortedValue] = useState('')
  const [dataTotal, setDataTotal] = useState(Array.from(data).length)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(10)
  const [countPages, setCountPages] = useState(Math.ceil(dataTotal / dataPerPage))
  const [ticketsLimit, setTicketsLimit] = useState(5)
  useMemo(() => {
    // console.log(dataTotal);
    setCurrentPage(1)
    setDataPerPage(10)
    setCountPages(Math.ceil(dataTotal / dataPerPage))
  }, [dataTotal, dataPerPage])
  const handleThAscSortClick = (colName, colValue) => {
    setOrder('asc')
    setSortedValue(colName)
    dispatch(setSort({ sortValue: colValue, sortType: 'asc' }))
  }
  const handleThDescSortClick = (colName, colValue) => {
    setOrder('desc')
    setSortedValue(colName)
    dispatch(setSort({ sortValue: colValue, sortType: 'desc' }))
  }
  return (
    <>
      <Table  striped="rows" size="md" responsive={true}>
        <thead>
          <tr>
            {columns.map((col, i) => {
              return <th key={i}>
                {col?.colName}{" "}
                {col?.sort ?
                  <>
                    {order === 'desc' && sortedValue === col?.colName ?
                      <FaArrowAltCircleUp style={{ cursor: 'pointer' }} onClick={() => handleThAscSortClick(col?.colName, col?.valueToSort)}>Asc</FaArrowAltCircleUp>
                      : order === 'asc' && sortedValue === col?.colName ?
                        <FaRegArrowAltCircleDown style={{ cursor: 'pointer' }} onClick={() => handleThDescSortClick(col?.colName, col?.valueToSort)}>Desc</FaRegArrowAltCircleDown >
                        :
                        <FaArrowAltCircleUp style={{ cursor: 'pointer' }} onClick={() => handleThAscSortClick(col?.colName, col?.valueToSort)}>Asc</FaArrowAltCircleUp>
                    }
                  </>
                  : ""}

              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, i) => {
              return (<tr key={row.id}>
                {columns.map((col, i) => {
                  return (<td key={i}>{col?.colValue(row)}</td>)
                })}
              </tr>)
            })
          }
        </tbody>
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
    </>
  );
}

export default TableCustom;