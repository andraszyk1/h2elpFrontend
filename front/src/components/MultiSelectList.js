import React, { useState } from 'react';
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';

function MultiSelectList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(items);
  const [showList, setShowList] = useState(false);

  const filteredItems = list.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    const sortedList = [...list].sort();
    setList(sorted ? sortedList.reverse() : sortedList);
    setSorted(!sorted);
  };

  const handleAddItem = () => {
    if (newItem) {
      setList([...list, newItem]);
      setNewItem('');
    }
  };

  const handleSelectItem = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
      setSearchTerm(item); // Ustaw wybraną wartość jako wartość pola wyszukiwania.
      setShowList(false);
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Wyszukaj..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setShowList(e.target.value !== '');
          }}
        />
        <Button variant="primary" onClick={handleSort}>
          {sorted ? 'Sortuj malejąco' : 'Sortuj rosnąco'}
        </Button>
      </InputGroup>
      {showList && (
        <ListGroup>
          {filteredItems.map((item, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSelectItem(item)}
              active={selectedItems.includes(item)}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <div className="mt-3">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Dodaj nowy element"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <Button variant="success" onClick={handleAddItem}>Dodaj</Button>
        </InputGroup>
      </div>
      <div className="mt-3">
        <h4>Wybrane elementy:</h4>
        <ListGroup>
          {selectedItems.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default MultiSelectList;
