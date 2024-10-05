import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import AddUser from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]); // State to hold users

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the list
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home users={users} setUsers={setUsers} />} />
        <Route
          path="/user/:id"
          element={<UserDetails users={users} setUsers={setUsers} />}
        />
        <Route path="/add-user" element={<AddUser onUserAdded={addUser} />} />
      </Routes>
    </>
  );
}

export default App;
