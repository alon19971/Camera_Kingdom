import React, { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Table, Button } from "react-bootstrap";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from Firestore
    const fetchUsers = async () => {
      const userCollection = await getDocs(collection(db, "users"));
      setUsers(userCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, []);

  // Promote a user to manager
  const promoteToManager = async (userId) => {
    await updateDoc(doc(db, "users", userId), { role: "manager" });
    alert("User promoted to manager!");
  };

  // Demote a manager to user
  const demoteToUser = async (userId) => {
    await updateDoc(doc(db, "users", userId), { role: "user" });
    alert("User demoted to regular user!");
  };

  // Delete a user account
  const deleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId)); // Update UI
    alert("User account deleted!");
  };

  return (
    <div>
      <h3>User Management</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "manager" ? (
                  <Button variant="primary" onClick={() => promoteToManager(user.id)}>
                    Promote to Manager
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => demoteToUser(user.id)}>
                    Demote to User
                  </Button>
                )}
                <Button variant="danger" onClick={() => deleteUser(user.id)} className="ms-2">
                  Delete User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
