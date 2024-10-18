// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart'; // Import the Cart component

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = 'http://localhost:5000/get-items';
        const response = await axios.get(apiUrl);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = async (itemId, quantity) => {
    try {
      const response = await axios.post('http://localhost:5000/add-to-cart', {
        item: itemId,
        quantity: quantity,
      });

      console.log('Item added to cart:', response.data);
      // Optionally, you can update the UI or show a success message
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle errors, show a message, or take appropriate actions
    }
  };

  return (
    <div className="container mt-5">
      <h2>Welcome to the user Dashboard!</h2>
      <h3>Items:</h3>
      <div className="row">
        {items.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`data:${item.itemImage.contentType};base64,${item.itemImage.data}`} className="card-img-top" alt={item.itemName} />
              <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: Ksh {item.itemPrice}</p>
                <p className="card-text">Inventory: {item.inventory}</p>
                <div className="mb-3">
                  <label htmlFor={`quantityInput_${item._id}`} className="form-label">
                    Quantity:
                  </label>
                  <input type="number" className="form-control" id={`quantityInput_${item._id}`} defaultValue="1" min="1" />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(item._id, document.getElementById(`quantityInput_${item._id}`).value)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Button or icon to show/hide the cart */}
      <button type="button" className="btn btn-secondary mt-3" onClick={() => setShowCart(!showCart)}>
        {showCart ? 'Hide Cart' : 'Show Cart'}
      </button>
      {/* Render the Cart component if showCart is true */}
      {showCart && <Cart />}
    </div>
  );
};

export default Dashboard;
