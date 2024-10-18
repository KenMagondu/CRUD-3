import React, { useState, useEffect } from 'react';
import ItemUpload from './ItemUpload';
import axios from 'axios';

const AdminDashboard = () => {
  // State to store order details
  const [orders, setOrders] = useState([]);

  // Fetch order details when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = 'http://localhost:5000/get-orders';
        const response = await axios.get(apiUrl);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      {/* Add your admin-specific content here */}
      <ItemUpload />

      {/* Display order details */}
      <div className="mt-5">
        <h3>Order Details</h3>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              {/* Add other relevant columns */}
              <th>Total Sales</th>
              <th>Total Capital Used</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className={index % 2 === 0 ? 'table-light' : 'table-info'}>
                {order.cartItems.map((cartItem) => (
                  <React.Fragment key={cartItem.item._id}>
                    <td>{cartItem.item.itemName || 'N/A'}</td>
                    <td>{cartItem.quantity}</td>
                    {/* ... other columns */}
                  </React.Fragment>
                ))}
                <td>{order.totalSales}</td>
                <td>{order.totalCapitalUsed}</td>
                <td>{order.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
