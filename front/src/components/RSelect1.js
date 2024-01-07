import React from 'react'
import Select from 'react-select'


export function RSelect1({ placeholder,
    onChange,
    inputValue,
    inputName,
    options,
    defaultInputValue,
    defaultValue,
    isMulti }) {

        
    return (
        <Select
            placeholder={placeholder}
            inputValue={inputValue}
            isClearable={false}
            isMulti={isMulti}
            defaultValue={defaultValue}
            options={options}
            defaultInputValue={defaultInputValue}
            onChange={e => onChange(e, inputName)} />
    )
}

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

export default RSelect1