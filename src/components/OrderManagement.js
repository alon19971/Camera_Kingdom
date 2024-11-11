// components/OrderManagement.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  increment
} from "firebase/firestore";
import { Table, Button, Modal, Form } from "react-bootstrap";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false); // Confirm cancellation modal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const staticOrders = [
        {
          id: "static_order_1",
          customerName: "John Doe",
          totalPrice: 250.5,
          status: "Pending",
          items: [{ id: "product_1", name: "Camera", quantity: 1, price: 250.5 }],
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

  // Confirm refund
  const confirmRefund = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), { status: "Refunded" });
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: "Refunded" } : order))
    );
    setShowRefundConfirm(false);
    setShowDetails(false); // Close modal after refund
  };

  // Show cancel confirmation modal
  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelConfirm(true);
  };

  // Confirm order cancellation and update quantities
const confirmCancelOrder = async (order) => {
  try {
    // Loop through each item in the order and update product quantities
    const batchUpdatePromises = order.items.map((item) =>
      updateDoc(doc(db, "products", item.id), {
        quantity: increment(item.quantity)
      })
    );
    await Promise.all(batchUpdatePromises);

    // Set order status to "Canceled" in the database
    await updateDoc(doc(db, "orders", order.id), { status: "Canceled" });

    // Update the status in the local `orders` state to reflect in the UI
    setOrders(
      orders.map((ord) => (ord.id === order.id ? { ...ord, status: "Canceled" } : ord))
    );

    alert("Order canceled, and product quantities updated.");
  } catch (error) {
    console.error("Error updating quantities after cancellation:", error);
  } finally {
    setShowCancelConfirm(false);
    setShowDetails(false);
  }
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
                    <Button
                      variant="warning"
                      onClick={() => handleCancelOrder(order)}
                      className="ms-2"
                    >
                      Cancel Order
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

      {/* Cancel order confirmation modal */}
      {showCancelConfirm && (
        <Modal show={showCancelConfirm} onHide={() => setShowCancelConfirm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Cancelation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to cancel this order and restock items?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => confirmCancelOrder(selectedOrder)}>
              Yes, Cancel Order
            </Button>
            <Button variant="secondary" onClick={() => setShowCancelConfirm(false)}>
              No, Keep Order
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;
