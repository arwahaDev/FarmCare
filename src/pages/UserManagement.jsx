import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUser as saveUserUpdate
} from "../app/redux/api/users";

const API_URL = "http://localhost:5000/api/users";

const getAdminToken = () => {
  const session = JSON.parse(
    localStorage.getItem("agri_session") || "null"
  );

  return session?.token;
};
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [pendingUsers,setPendingUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUserId,setEditingUserId] = useState(null);
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  cnic: "",
  joiningDate: "",
  status: "active",
  userType: "employee"
});
  useEffect(() => {
  const loadUsers = async () => {
    try {
      const response = await fetch(
        `${API_URL}?status=active`,
        {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`
          }
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load users");
      }

      setUsers(result.data?.users || []);
    } catch (error) {
      console.error("Load users error:", error);
      alert(error.message);
    }
  };

  loadUsers();
}, []);
       useEffect(() => {
  const loadPendingUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/pending`, {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load pending users"
        );
      }

      setPendingUsers(result.data?.users || []);

    } catch (error) {
      console.error("Pending users error:", error);
      alert(error.message);
    }
  };

  loadPendingUsers();
}, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password:formData.password,
        userType: formData.userType === "teamLead"
          ? "teamlead"
          : "employee",
        cnic: formData.cnic,
        joiningDate: formData.joiningDate,
        status: "inactive"
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "User creation failed");
    }

    alert("User added successfully!");

    setFormData({
      name: "",
      email: "",
      password: "",
      cnic: "",
      joiningDate: "",
      status: "active",
      userType: "employee"
    });

    setShowForm(false);
    window.location.reload();

  } catch (error) {
    alert(error.message);
  }
};
   const handleDeleteUser = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (confirmDelete) {
    setUsers(users.filter((user) => user.id !== id));
  }
};
  const handleApproveUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`
      },
      body: JSON.stringify({
        id: id,
        status: "active"
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "User approval failed");
    }

    setUsers((previousUsers) =>
      previousUsers.map((item) =>
        String(item.id) === String(id)
          ? { ...item, status: "active" }
          : item
      )
    );
      setPendingUsers((previousUsers) =>
      previousUsers.filter(
      (item) => String(item.id) !== String(id)
     )
    );
    alert("User approved successfully!");

  } catch (error) {
    alert(error.message);
  }
};
     const handleEditUser = (user) => {
      setEditingUserId(user.id);

  setFormData({
    name: user.name,
    email: user.email,
    password: "",
    userType: user.userType
  });

  setShowForm(true);
};
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>User Management</h2>
          <p className="text-muted">
            Manage system users from one place.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add User"}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
              <h5 className="mb-3">
              {editingUserId ? "Update User" : "Add New User"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
                    <div className="mb-3">
                <label className="form-label">CNIC</label>
                <input
                  type="text"
                  name="cnic"
                  className="form-control"
                  value={formData.cnic || ""}
                  onChange={handleChange}
                  placeholder="Enter CNIC"
                  required
                   />
                  </div>
                  <div className="mb-3">
                   <label className="form-label">Joining Date</label>
                     <input
                        type="date"
                        name="joiningDate"
                        className="form-control"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                      />
                  </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">User Type</label>
                <select
                  name="userType"
                  className="form-select"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="teamLead">Team Lead</option>
                </select>
              </div>

                <button type="submit" className="btn btn-success">
                {editingUserId ? "Update User" : "Save User"}
                </button>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">All Users</h5>
          <p className="text-muted">
            Total Users: {users.length}
          </p>

          {users.length === 0 ? (
            <p className="text-muted">No users available.</p>
          ) : (
            <div className="table-responsive">
  <table className="table table-bordered table-hover">
    <thead className="table-light">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>User Type</th>
        <th>User Code</th>
        <th>Status</th>
        <th>Approval</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.userCode || user.id}</td>
      <td>{user.userType}</td>

      {/* Status Column */}
      <td>
        <span
          className={`badge ${
            user.status === "approved"
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {user.status || "pending"}
        </span>
      </td>

      {/* Approval Column */}
      <td>
        {user.status === "approved" ? (
          <span className="text-success fw-bold">
            Approved
          </span>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleApproveUser(user.id)}
          >
            Approve
          </button>
        )}
      </td>

      {/* Action Column */}
      <td>
        <div className="d-flex gap-2 flex-wrap">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEditUser(user)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>
          )}
        </div>
      </div>
         <div className="card shadow-sm mt-4">
  <div className="card-body">
    <h5 className="mb-3">Pending Registration Requests</h5>

    <p className="text-muted">
      Total Pending Requests: {pendingUsers.length}
    </p>

    {pendingUsers.length === 0 ? (
      <p className="text-muted">No pending requests.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    Pending
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApproveUser(user.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default UserManagement;