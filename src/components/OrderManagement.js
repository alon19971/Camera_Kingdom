// components/OrderManagement.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { Table, Button, Modal, Form } from "react-bootstrap";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showRefundConfirm, setShowRefundConfirm] = useState(false); // For refund confirmation
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const staticOrders = [
        {
          id: "static_order_1",
          customerName: "John Doe",
          totalPrice: 250.50,
          status: "Pending",
          items: [{ name: "Camera", quantity: 1, price: 250.50 }],
        },
      ];

      try {
        const orderCollection = await getDocs(collection(db, "orders"));
        if (orderCollection.empty) {
          setOrders(staticOrders);
        } else {
          setOrders(orderCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const updateOrderStatus = async (orderId) => {
    if (!newStatus) return;
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    setNewStatus("");
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setShowRefundConfirm(false); // Hide refund confirmation modal when details are closed
  };

  const handleResendEmail = () => {
    alert("Confirmation email has been resent!");
  };

  const handleRefundOrder = () => {
    setShowRefundConfirm(true); // Show refund confirmation
  };

  const confirmRefund = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), { status: "Refunded" });
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: "Refunded" } : order))
    );
    setShowRefundConfirm(false);
    setShowDetails(false); // Close modal after refund
  };

  return (
    <div>
      <h3>Order Management</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <Form.Control
            type="text"
            placeholder="Search by customer name or order ID..."
            className="mb-3"
          />
          <Form.Control as="select" className="mb-3">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="refunded">Refunded</option>
          </Form.Control>
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
                  <td>{order.customer?.fullName || "N/A"}</td>
                  <td>{order.purchase?.totalPrice ? `${order.purchase.totalPrice}₪` : "N/A"}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button variant="info" onClick={() => handleShowDetails(order)}>
                      View Details
                    </Button>
                    <Button variant="danger" onClick={() => deleteOrder(order.id)} className="ms-2">
                      Delete Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {selectedOrder && (
        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Customer: {selectedOrder.customerName || "N/A"}</h5>
            <h5>Total Price: {selectedOrder.totalPrice ? `${selectedOrder.totalPrice}₪` : "N/A"}</h5>
            <h5>Status: {selectedOrder.status}</h5>
            <h6>Items:</h6>
            <ul>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity} - Price: {item.price}₪
                  </li>
                ))
              ) : (
                <li>No items in this order.</li>
              )}
            </ul>

            <Form.Group className="mt-3">
              <Form.Label>Update Order Status</Form.Label>
              <Form.Control
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder="Enter new status (e.g., Shipped, Delivered)"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateOrderStatus(selectedOrder.id)}>
              Update Status
            </Button>
            <Button variant="warning" onClick={handleResendEmail}>
              Resend Confirmation Email
            </Button>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
            <Button variant="danger" onClick={handleRefundOrder}>
              Refund Order
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Refund confirmation modal */}
      {showRefundConfirm && (
        <Modal show={showRefundConfirm} onHide={() => setShowRefundConfirm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Refund</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to refund this order?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => confirmRefund(selectedOrder.id)}>
              Yes, Refund
            </Button>
            <Button variant="secondary" onClick={() => setShowRefundConfirm(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;
