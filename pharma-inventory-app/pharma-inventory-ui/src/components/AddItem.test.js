// AddItem.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AddItem from './AddItem';

jest.mock('axios');

test('should add a new item and display success message', async () => {
  const onAdd = jest.fn();
  const { getByPlaceholderText, getByText, getByRole } = render(<AddItem onAdd={onAdd} />);

  const nameInput = getByPlaceholderText('Nom du médicament');
  const quantityInput = getByPlaceholderText('Quantité');
  const priceInput = getByPlaceholderText('Prix');
  const batchNumberInput = getByPlaceholderText('Numéro de lot');
  const expiryDateInput = getByPlaceholderText('Date de péremption');
  const submitButton = getByRole('button', { name: /ajouter/i });

  fireEvent.change(nameInput, { target: { value: 'Paracetamol' } });
  fireEvent.change(quantityInput, { target: { value: '10' } });
  fireEvent.change(priceInput, { target: { value: '5.99' } });
  fireEvent.change(batchNumberInput, { target: { value: 'B123' } });
  fireEvent.change(expiryDateInput, { target: { value: '2024-12-31' } });

  axios.post.mockResolvedValueOnce({
    data: {
      name: 'Paracetamol',
      quantity: 10,
      price: 5.99,
      batchNumber: 'B123',
      expiryDate: '2024-12-31'
    }
  });

  fireEvent.click(submitButton);

  await waitFor(() => expect(onAdd).toHaveBeenCalledWith({
    name: 'Paracetamol',
    quantity: 10,
    price: 5.99,
    batchNumber: 'B123',
    expiryDate: '2024-12-31'
  }));

  expect(nameInput.value).toBe('');
  expect(quantityInput.value).toBe('');
  expect(priceInput.value).toBe('');
  expect(batchNumberInput.value).toBe('');
  expect(expiryDateInput.value).toBe('');
  expect(getByText(/Le médicament "Paracetamol" a été ajouté avec succès!/i)).toBeInTheDocument();
});