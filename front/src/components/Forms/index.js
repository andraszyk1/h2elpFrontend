import { useField } from "formik";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useGetUsersQuery } from "../../store/api/usersApi";

export const wplywTablica=[{value:"Jednostka",label:"Jednostka"},{value:"Proces",label:"Proces"},{value:"Grupa użytkowników",label:"Grupa użytkowników"},{value:"Zakład",label:"Zakład"}]
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
    <label htmlFor={props.id || props.name}>{label}</label>
      <AsyncSelect
        isMulti={isMulti}
        defaultInputValue={defaultInputValue || ''}
        onChange={e => setValue(e)}
        loadOptions={(e, callback) => loadOptions(e, callback)}
        placeholder={placeholder}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error ? (
         <div className="alert alert-warning">{meta.error}</div>
      ) : null}
    </>
  );
};
export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="alert alert-warning">{meta.error}</div>
            ) : null}
        </div>

    );
};

export const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (

        <div className='checkbox'>
            <label >
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
              <div className="alert alert-warning">{meta.error}</div>
            ) : null}
        </div>
    );
};



export  function MySelect({ fieldName, label, placeholder,options, ...props }) {
    const [field, meta, { setValue }] = useField(fieldName);
    return (<>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Select
            defaultValue={options.find((option) => option.value === field.value)}
            placeholder={placeholder}
            onChange={e=>setValue(e)}
            options={options}
            onBlur={field.onBlur}
        />
        {meta.touched && meta.error ? (
             <div className="alert alert-warning">{meta.error}</div>
        ) : null}
    </>);
}