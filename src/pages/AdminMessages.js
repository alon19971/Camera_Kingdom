// components/AdminMessages.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Table } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const AdminMessages = () => {
  const { userData } = useAuthContext(); // Assuming userData.isAdmin indicates admin rights
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.isAdmin) {
      const fetchMessages = async () => {
        try {
          const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          setMessages(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [userData]);

  if (!userData?.isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="admin-messages">
      <h3>Messages</h3>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{new Date(message.createdAt.toDate()).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminMessages;
