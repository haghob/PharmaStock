import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/inventory')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the inventory!', error);
      });
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;