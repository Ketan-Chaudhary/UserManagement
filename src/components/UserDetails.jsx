import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching user details.");
        setLoading(false);
      });
  }, [id]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
        .then(() => {
          toast.success("User updated successfully!");
          navigate("/"); // Redirect to home page after success
        })
        .catch(() => {
          toast.error("Error updating user!");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded"
    >
      <h2 className="text-2xl mb-4 font-semibold">Edit User</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
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
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
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
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition"
      >
        Update User
      </button>
    </form>
  );
}

export default UserDetails;
