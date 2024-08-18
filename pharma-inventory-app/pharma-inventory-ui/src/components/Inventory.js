import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddItem from './AddItem';
import './Inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:8080/api/inventory')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the inventory!', error);
      });
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    fetchItems();
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:8080/api/inventory/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the item!', error);
      });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = (updatedItem) => {
    axios.put(`http://localhost:8080/api/inventory/${updatedItem.id}`, updatedItem)
      .then(response => {
        setItems(items.map(item => (item.id === updatedItem.id ? response.data : item)));
        setEditingItem(null);
      })
      .catch(error => {
        console.error('There was an error updating the item!', error);
      });
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="inventory-container">
      <h1>Inventaire des médicaments</h1>
      <AddItem onAdd={handleAddItem} />
      <input
        type="text"
        placeholder="Rechercher un médicament..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nom du médicament</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Numéro de lot</th>
            <th>Date de péremption</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.batchNumber}</td>
              <td>{item.expiryDate}</td>
              <td>
                <button onClick={() => handleEditItem(item)} className="edit-btn">Modifier</button>
                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
      {editingItem && (
        <div className="edit-form-container">
          <h2>Modifier le médicament</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateItem(editingItem);
          }} className="edit-form">
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              required
            />
            <input
              type="number"
              value={editingItem.quantity}
              onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
              required
            />
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
              required
            />
            <input
              type="text"
              value={editingItem.batchNumber}
              onChange={(e) => setEditingItem({ ...editingItem, batchNumber: e.target.value })}
              required
            />
            <input
              type="date"
              value={editingItem.expiryDate}
              onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
              required
            />
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inventory;