import React, { useState } from 'react';
import axios from 'axios';

const ItemUpload = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemInventory, setItemInventory] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleInventoryChange = (e) => {
    setItemInventory(e.target.value);
  };

  const handleImageChange = (e) => {
    setItemImage(e.target.files[0]);
  };

  const handleItemUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      setIsLoading(true);
  
      // Validation checks (add more as needed)
      if (!itemName || !itemPrice || !itemDescription || !itemInventory || !itemImage) {
        throw new Error('All fields are required.');
      }
  
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('itemPrice', itemPrice);
      formData.append('description', itemDescription); // Use the correct field name
      formData.append('inventory', itemInventory); // Use the correct field name
      formData.append('itemImage', itemImage);
  
      const apiUrl = 'http://localhost:5000/upload-item';
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Item Upload Response:', response.data);
  
      // Optionally, you can handle success, update UI, etc.
    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors, show a message, or take appropriate actions
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container mt-4">
      <h3>Item Upload</h3>
      <form>
        {/* Add additional input fields for description and inventory */}
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">Item Description:</label>
          <input type="text" className="form-control" id="itemDescription" value={itemDescription} onChange={handleDescriptionChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemInventory" className="form-label">Item Inventory:</label>
          <input type="number" className="form-control" id="itemInventory" value={itemInventory} onChange={handleInventoryChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Item Name:</label>
          <input type="text" className="form-control" id="itemName" value={itemName} onChange={handleItemNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemPrice" className="form-label">Item Price:</label>
          <input type="text" className="form-control" id="itemPrice" value={itemPrice} onChange={handleItemPriceChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemImage" className="form-label">Item Image:</label>
          <input type="file" className="form-control" id="itemImage" onChange={handleImageChange} />
        </div>

        {/* Disable the button or show a loading spinner during upload */}
        <button type="button" className="btn btn-primary" onClick={handleItemUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Item'}
        </button>
      </form>
    </div>
  );
};

export default ItemUpload;
