import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const apiUrl = 'http://localhost:5000/get-cart';
        const response = await axios.get(apiUrl);
        console.log('Cart items response:', response.data);
        setCartItems(response.data.cartItems);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
      }
    };

    fetchCartItems();
  }, []);

  const handlePay = async () => {
    try {
      console.log('Order confirmed!');
  
      // Assuming the API endpoint for payment is '/pay'
      const apiUrl = 'http://localhost:5000/pay';
      const response = await axios.post(apiUrl);
  
      // Clear the cart after successful "payment"
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <table className="table">
       {/* ... */}
<tbody>
  {cartItems.length > 0 && cartItems.map((cartItem) => (
    <tr key={cartItem._id}>
      <td>{cartItem.item?.itemName || 'N/A'}</td>
      <td>{cartItem.quantity}</td>
      <td>${(cartItem.item?.itemPrice || 0) * cartItem.quantity}</td>
    </tr>
  ))}
</tbody>
{/* ... */}

      </table>
      <p>Total: ${total}</p>
      <button type="button" className="btn btn-primary" onClick={handlePay}>
        Pay
      </button>
    </div>
  );
};

export default Cart;
