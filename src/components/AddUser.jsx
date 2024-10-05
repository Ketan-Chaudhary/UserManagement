import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser({ onUserAdded }) {
  // Accept onUserAdded prop
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    if (!user.name || user.name.length < 3) {
      formErrors.name =
        "Name is required and must be at least 3 characters long.";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!user.email || !emailRegex.test(user.email)) {
      formErrors.email = "Please enter a valid email.";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!user.phone || !phoneRegex.test(user.phone)) {
      formErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
          toast.success("User created successfully!");
          onUserAdded(response.data); // Call the prop to update users list
          navigate("/"); // Redirect to home page after success
        })
        .catch(() => {
          toast.error("Error creating user! Please try again.");
        });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded"
    >
      <h2 className="text-2xl mb-4">Add New User</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Add User
      </button>
    </form>
  );
}

export default AddUser;
