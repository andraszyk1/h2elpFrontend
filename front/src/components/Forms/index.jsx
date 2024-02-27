import { useField } from "formik";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useGetCategoriesQuery } from "../../store/api/categoriesApi";
import { useGetUsersQuery } from "../../store/api/usersApi";
import { TicketAddForm } from "./TicketAddForm";
import { TicketAddFormNowyPracownik } from "./TicketAddFormNowyPracownik";
import { TicketAddFormWzorzec1 } from "./TicketAddFormWzorzec1";
import { useDispatch } from "react-redux";
import { setFiltersToTickets } from "../../store/slices/ticketsSlice";
import { useState } from "react";
export { TicketAddForm, TicketAddFormNowyPracownik, TicketAddFormWzorzec1 };
export const statusOpcje = [{ value: "W realizacji", label: "W realizacji" }, { value: "Nowe", label: "Nowe" }, { value: "Wznowione", label: "Wznowione" }, { value: "Do Akceptacji", label: "Do Akceptacji" }, { value: "Anulowane", label: "Anulowane" }, { value: "W firmie zewnętrznej", label: "W firmie zewnętrznej" }, { value: "W konsultacji", label: "W konsultacji" }, { value: "Wstrzymane", label: "Wstrzymane" }, { value: "Zamknięte", label: "Zamknięte" }];
export const wplywOpcje = [{ value: "Jednostka", label: "Jednostka" }, { value: "Proces", label: "Proces" }, { value: "Grupa użytkowników", label: "Grupa użytkowników" }, { value: "Zakład", label: "Zakład" }]
export const pilonscOpcje = [{ value: "Niska", label: "Niska" }, { value: "Srednia", label: "Średnia" }, { value: "Wysoka", label: "Wysoka" }, { value: "Krytyczna", label: "Krytyczna" }]
export const kontoDomenoweWindowsOpcje = [{ value: "tak", label: "Tak" }, { value: "nie", label: "Nie" }]
export const dostepDoStronWWWOpcje = [{ value: "tak", label: "Tak" }, { value: "nie", label: "Nie" }]
export const kontoPocztoweOpcje = [{ value: "grupowe", label: "Grupowe" }, { value: "imienne", label: "Imienne" }]
export const zrodloZgloszeniaOpcje = [{ value: "chat", label: "Chat" }, { value: "porta", label: "Portal" }, { value: "telefon", label: "Telefon" }, { value: "email", label: "Email" }]

export const CustomAsyncSelect = ({ isMulti, resetInput, options, setFilter, inputName, defaultInputValue, defaultValue, fieldName, label, placeholder, ...props }) => {
  const [ meta, { setValue }] = useField(fieldName);
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    dispatch(setFiltersToTickets({ [fieldName]: e?.value }));
  }

  const filterOptions = (inputValue) => {
    const uniqueptions=[...new Set(options?.map((o) => JSON.stringify(o)))]?.map((s) =>{return (JSON.parse(s))})
    return uniqueptions.filter(i=>i.value.toString().toLowerCase().includes(inputValue.toString().toLowerCase())
    );
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 500);
    });

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}>  {meta.error}</small>) : null}</label>
      <AsyncSelect
        onChange={handleOnChange}
        isClearable={true}
        cacheOptions
        defaultOptions={[...new Set(options?.map((o) => JSON.stringify(o)))]?.map((s) =>
          JSON.parse(s)
          )}
        loadOptions={promiseOptions}
        placeholder={placeholder}
        defaultValue={defaultValue}
        theme={themeSettings}

      />
    </>
  );
};
export const AsyncSelectCategories = ({ isMulti, resetInput, inputName, defaultInputValue, defaultValue, fieldName, label, placeholder, ...props }) => {
  const [field, meta, { setValue }] = useField(fieldName);
  const { data } = useGetCategoriesQuery({ search: field.value, limit: 10 });

  const options = data?.map((option) => ({
    value: option.name,
    label: option.name
  }));
  const loadOptions = async (value, callback) => {

    callback(options)
    setValue(value);
  };
  const handleOnChange = (e) => {
    console.log(e);
    setValue(e)
  }

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}>  {meta.error}</small>) : null}</label>
      <AsyncSelect

        isClearable
        isMulti={isMulti}
        defaultInputValue={defaultInputValue || ''}
        onChange={handleOnChange}
        loadOptions={(e, callback) => loadOptions(e, callback)}
        placeholder={placeholder}
        onBlur={field.onBlur}
        styles={meta.touched && meta.error ? colourStylesAlert : colourStyles}
        theme={themeSettings}
      />
    </>
  );
};
export const AsyncSelectUsers = ({ isMulti, resetInput, inputName, defaultInputValue, defaultValue, fieldName, label, placeholder, ...props }) => {
  const [field, meta, { setValue }] = useField(fieldName);
  const { data } = useGetUsersQuery({ search: field.value, limit: 10 });

  const options = data?.map((option) => ({
    value: option.login,
    label: option.name + " " + option.surname + " " + "(" + option.login + ")"
  }));
  const loadOptions = async (value, callback) => {
    callback(options)
    setValue(value);
  };
  const handleOnChange = (e) => {
    console.log(e);
    setValue(e?.value??'')
  }

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}>  {meta.error}</small>) : null}</label>
      <AsyncSelect
        isClearable
        isMulti={isMulti}
        defaultInputValue={defaultInputValue || ''}
        onChange={handleOnChange}
        loadOptions={(e, callback) => loadOptions(e, callback)}
        placeholder={placeholder}
        onBlur={field.onBlur}
        styles={meta.touched && meta.error ? colourStylesAlert : colourStyles}
        theme={themeSettings}
      />

    </>
  );
};
export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}> {meta.error}</small>) : null}</label>
      <input className="form-control"  {...field} {...props}
        style={meta.touched && meta.error ? { backgroundColor: 'rgba(217, 83, 79,0.2)', height: '2em', borderRadius: 0 } : { backgroundColor: 'white', height: '2em', borderRadius: 0 }}
      />
      {/* {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null} */}
    </>

  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (

    <div className='checkbox'>
      <label >
        <input type="checkbox" {...field} {...props} />
        {children}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}> {meta.error}</small>) : null}
      </label>
      {/* {meta.touched && meta.error ? (
              <div className="alert alert-warning">{meta.error}</div>
            ) : null} */}
    </div>
  );
};

const themeSettings = (theme) => ({
  ...theme,
  borderRadius: 5,

  colors: {
    ...theme.colors,
    primary25: '#FFB6C1',
    primary75: '#FFB6C1',
    primary50: '#FFB6C1',
    primary: '#87CEEB',
  },
  spacing: {
    ...theme.spacing,
    baseUnit: 2,
    controlHeight: 10,
    menuGutter: 4,

  },
})
const colourStylesAlert = {
  control: (styles) => (
    { ...styles, backgroundColor: '#FFE4C4' }
  ),
}
const colourStyles = {
  control: (styles) => (
    { ...styles, backgroundColor: 'white' }
  ),

};

export function MySelect({ fieldName, label, placeholder, setFilter, options, ...props }) {
  const [field, meta, { setValue }] = useField(fieldName);

  const handleOnChange = (e) => {
    setValue(e)
    setFilter && setFilter({ filterValue: e?.value, filterName: props?.name })
  }
  return (<>
    {label && <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{ color: 'rgba(217, 83, 79,0.8)' }}> {meta.error}</small>) : null}</label>}

    <Select
      styles={meta.touched && meta.error ? colourStylesAlert : colourStyles}
      defaultValue={options?.find((option) => option.value === field.value)}
      placeholder={placeholder}
      onChange={handleOnChange}
      options={options}
      onBlur={field.onBlur}
      isClearable
      theme={themeSettings}

    />

    {/* {meta.touched && meta.error ? (
             <div className="alert alert-warning">{meta.error}</div>
        ) : null} */}
  </>);
}