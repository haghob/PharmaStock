import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [batchNumber, setBatchNumber] = useState(''); // Nouveau champ pour la traçabilité
  const [expiryDate, setExpiryDate] = useState(''); // Nouveau champ pour la date de péremption
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { 
      name, 
      quantity: parseInt(quantity), 
      price: parseFloat(price),
      batchNumber, // Ajouter la traçabilité
      expiryDate // Ajouter la date de péremption
    };
    axios.post('http://localhost:8080/api/inventory', newItem)
      .then(response => {
        onAdd(response.data);
        setName('');
        setQuantity('');
        setPrice('');
        setBatchNumber('');
        setExpiryDate('');
        setMessage(`Le médicament "${response.data.name}" a été ajouté avec succès!`);
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
        setMessage('Une erreur s\'est produite lors de l\'ajout du médicament!');
      });
  };

  return (
    <div className="add-item-container">
      <h2>Ajouter un nouveau médicament</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          type="text"
          placeholder="Nom du médicament"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantité"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Numéro de lot"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de péremption"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddItem;
