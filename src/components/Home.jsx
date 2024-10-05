import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Home({ users, setUsers }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    } else {
      setLoading(false); // If users are already loaded, set loading to false
    }
  }, [users]);

  const fetchUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch users! Please try again.");
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          toast.success("User deleted successfully!");
          setUsers(users.filter((user) => user.id !== id)); // Remove deleted user
        })
        .catch(() => {
          toast.error("Error deleting user! Please try again.");
        });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading...</div>; // Centered loading message
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">User Management</h1>
      <p className="text-red-500 mb-2">
        Note: In JSONPlaceholder API changes are not persisted permanently. So
        if you add or delete a user, it will not be saved permanently. Hence we
        can not Update & View the user details which we add manually.
      </p>
      <Link
        to="/add-user"
        className="mb-6 inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition"
      >
        Add New User
      </Link>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Email
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Phone
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.phone}</td>
                <td className="py-3 px-4 border-b">
                  <Link
                    to={`/user/${user.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
