// components/OrderManagement.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Table, Button } from "react-bootstrap";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderCollection = await getDocs(collection(db, "orders"));
      setOrders(orderCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <div>
      <h3>Order Management</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="danger" onClick={() => deleteOrder(order.id)} className="ms-2">
                  Delete Order
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderManagement;
