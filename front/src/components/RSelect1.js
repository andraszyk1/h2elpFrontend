import React from 'react'
import Select from 'react-select'


export function RSelect1({ placeholder, onChange, inputValue, inputName, options, defaultInputValue, defaultValue, isMulti }) {
    return (
        <Select
            placeholder={placeholder}
            inputValue={inputValue}
            isClearable
            isMulti={isMulti}
            defaultValue
            options={options}
            defaultInputValue={defaultInputValue}
            onChange={e => onChange(e, inputName)} />
    )
}

export function mapDataForSelects(data, config) {
    const newmap = data?.map((item) => {
        return { value: config.value(item), label: config.name(item) }
    })
    return newmap;
}


export default RSelect1