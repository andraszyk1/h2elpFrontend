import { useField } from "formik";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useGetUsersQuery } from "../../store/api/usersApi";
import { TicketAddForm } from "./TicketAddForm";
import { TicketAddFormNowyPracownik } from "./TicketAddFormNowyPracownik";
import { TicketAddFormWzorzec1 } from "./TicketAddFormWzorzec1";
export { TicketAddForm, TicketAddFormNowyPracownik, TicketAddFormWzorzec1 };

export const wplywOpcje=[{value:"Jednostka",label:"Jednostka"},{value:"Proces",label:"Proces"},{value:"Grupa użytkowników",label:"Grupa użytkowników"},{value:"Zakład",label:"Zakład"}]
export const pilonscOpcje=[{value:"Niska",label:"Niska"},{value:"Srednia",label:"Średnia"},{value:"Wysoka",label:"Wysoka"},{value:"Krytyczna",label:"Krytyczna"}]
export const kontoDomenoweWindowsOpcje=[{value:"tak",label:"Tak"},{value:"nie",label:"Nie"}]
export const dostepDoStronWWWOpcje=[{value:"tak",label:"Tak"},{value:"nie",label:"Nie"}]
export const kontoPocztoweOpcje=[{value:"grupowe",label:"Grupowe"},{value:"imienne",label:"Imienne"}]
export const zrodloZgloszeniaOpcje=[{value:"chat",label:"Chat"},{value:"porta",label:"Portal"},{value:"telefon",label:"Telefon"},{value:"email",label:"Email"}]
export const AsyncSelectUsers = ({ isMulti, inputName, defaultInputValue, defaultValue, fieldName, label, placeholder, ...props }) => {
  const [field, meta, { setValue }] = useField(fieldName);
  const { data } = useGetUsersQuery({ search: field.value, limit: 10 });

  const options = data?.map((option) => ({
    value: option.login,
    label: option.name + " " + option.surname + " " + "(" + option.login + ")"
  }));
  const loadOptions = async (value, callback) => {
    setValue(value);
    callback(options)
  };

  return (
    <>
    <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{color:'rgba(217, 83, 79,0.8)'}}> - {meta.error}</small>):null}</label>
      <AsyncSelect
        isMulti={isMulti}
        defaultInputValue={defaultInputValue || ''}
        onChange={e => setValue(e)}
        loadOptions={(e, callback) => loadOptions(e, callback)}
        placeholder={placeholder}
        onBlur={field.onBlur}
        styles={meta.touched && meta.error ? colourStylesAlert:colourStyles}
      />
      {/* {meta.touched && meta.error ? (
         <div className="alert alert-warning">{meta.error}</div>
      ) : null} */}
    </>
  );
};
export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{color:'rgba(217, 83, 79,0.8)'}}> - {meta.error}</small>):null}</label>
            <input className="form-control" {...field} {...props}
            style={ meta.touched && meta.error ? {backgroundColor:'rgba(217, 83, 79,0.2)'}:{ backgroundColor:'white'}}
            />
            {/* {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null} */}
        </div>

    );
};

export const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (

        <div className='checkbox'>
            <label >
                <input type="checkbox" {...field} {...props} />
                {children}{meta.touched && meta.error ? (<small style={{color:'rgba(217, 83, 79,0.8)'}}> - {meta.error}</small>):null}
            </label>
            {/* {meta.touched && meta.error ? (
              <div className="alert alert-warning">{meta.error}</div>
            ) : null} */}
        </div>
    );
};

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',


  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});
const colourStylesAlert = {
  control: (styles) => (
    { ...styles, backgroundColor:'rgba(217, 83, 79,0.2)' }
    ),}
const colourStyles = {
  control: (styles) => (
    { ...styles, backgroundColor:'white' }
    ),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isSelected
      ? '#eee'
      : isFocused
      ? '#ddd'
      : undefined,
      color: isSelected
      ? '#5cb85c'
      :'#292b2c',
    cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),

};

export  function MySelect({ fieldName, label, placeholder,options, ...props }) {
    const [field, meta, { setValue }] = useField(fieldName);
    return (<>
        <label htmlFor={props.id || props.name}>{label}{meta.touched && meta.error ? (<small style={{color:'rgba(217, 83, 79,0.8)'}}> - {meta.error}</small>):null}</label>
       
        <Select
          styles={meta.touched && meta.error ? colourStylesAlert:colourStyles}
            defaultValue={options.find((option) => option.value === field.value)}
            placeholder={placeholder}
            onChange={e=>setValue(e)}
            options={options}
            onBlur={field.onBlur}
            
        />
     
        {/* {meta.touched && meta.error ? (
             <div className="alert alert-warning">{meta.error}</div>
        ) : null} */}
    </>);
}