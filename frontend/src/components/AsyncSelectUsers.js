import React, { useState } from 'react';
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
const AsyncSelectUsers = ({ isMulti, onChange, inputName, defaultInputValue, defaultValue }) => {
  const [inputValue, setInputValue] = useState('');
  const { data, error, isLoading } = useGetUsersQuery({ search: inputValue, limit: 10 });
  // console.log(defaultInputValue)


  const loadOptions = async (inputValue, callback) => {
    setInputValue(inputValue); // Ustaw nową wartość dla hooka zapytania
    const mapedData = mapDataForSelects(data, { value: item => item.login, name: item => item.name + " " + item.surname })
    callback(mapedData)
  };

  return (
    <AsyncSelect isClearable={true}
      isMulti={isMulti}
      defaultInputValue={defaultInputValue}
    defaultValue={defaultValue || ''}
      onChange={e => onChange(e, inputName)}
      loadOptions={(inputValue, callback) => loadOptions(inputValue, callback)}
      placeholder="Users"
    />
  );
};

export default AsyncSelectUsers;
