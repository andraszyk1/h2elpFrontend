import  { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useGetUsersQuery } from '../store/api/usersApi';

export function mapDataForSelects(data, config) {
  const newmap = data.map((item) => {
    return { value: config.value(item), label: config.name(item) }
  })
  return newmap;
}
export function mapDataFromSelectToOpiekun(data, config) {
  const newmap = data.map((item) => {
    return { login: config.value(item) }
  })
  return newmap;
}
const AsyncSelectUsers = ({ isMulti,valueToInput, onChange,defaultValue }) => {
  const [inputValue, setInputValue] = useState(valueToInput??'');
  const { data } = useGetUsersQuery({ search: inputValue, limit: 10 });

  const loadOptions = async (inputValue, callback) => {
    setInputValue(inputValue); // Ustaw nową wartość dla hooka zapytania
    const mapedData = mapDataForSelects(data, { value: item => item.login, name: item => item.name + " " + item.surname + " " +"("+item.login+")" })
    callback(mapedData)
  };

  return (
    <AsyncSelect
      isMulti={isMulti}
      defaultInputValue={valueToInput ||''}
      defaultValue={defaultValue}
      defaultOptions={data}
      onChange={onChange}
      loadOptions={(inputValue, callback) => loadOptions(inputValue, callback)}
      placeholder="Users"
    />
  );
};

export default AsyncSelectUsers;
