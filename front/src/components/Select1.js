import React, { useState } from 'react'

function Select1() {
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'apple', text: 'Apple 🍏'},
        {value: 'banana', text: 'Banana 🍌'},
        {value: 'kiwi', text: 'Kiwi 🥝'},
      ];
    
      const [selected, setSelected] = useState([]);
    
      const handleChange = event => {
        console.log(event);
        setSelected([...selected,event.target.value]);
        console.log(selected);
      };
    
      return (
        <div>
          <select value={selected} onChange={handleChange} multiple>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      );
    };


export default Select1