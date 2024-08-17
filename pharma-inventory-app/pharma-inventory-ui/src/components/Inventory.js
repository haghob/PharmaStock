import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddItem from './AddItem';
import './Inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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

  return (
    <div className="inventory-container">
      <h1>PharmaStock</h1>
      <AddItem onAdd={handleAddItem} />
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nom du médicament</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Numéro de lot</th> {/* Nouveau champ */}
            <th>Date de péremption</th> {/* Nouveau champ */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.batchNumber}</td> {/* Afficher la traçabilité */}
              <td>{item.expiryDate}</td> {/* Afficher la date de péremption */}
              <td>
                <button onClick={() => handleEditItem(item)} className="edit-btn">Modifier</button>
                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
