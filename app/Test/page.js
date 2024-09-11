"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeTest() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users")
      .then(function (resp) {
        console.log(resp.data);
        const [usersArray] = resp.data.data;
        setUsers(usersArray);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (user) => {
    axios
      .delete("/api/users", { data: { _id: user._id } })
      .then((resp) => {
        console.log("Delete response:", resp.data);
        if (resp.data.success) {
          setUsers(users.filter((u) => u._id !== user._id));
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEdit = (user) => {
    setEditUser(user);
    // Manually trigger the modal opening
    const modalElement = document.getElementById("editUserModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handleUpdate = () => {
    axios
      .put("/api/users", editUser)
      .then(function (resp) {
        console.log(resp.data);
        if (resp.data.success) {
          setUsers(
            users.map((user) =>
              user._id === editUser._id ? editUser : user
            )
          );
          // Close the modal after update
          const modalElement = document.getElementById("editUserModal");
          const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
          bootstrapModal.hide();
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <div>
        <table border={2} cellPadding={10} cellSpacing={0} className="table">
          <thead>
            <tr>
              <td><b>User-Name</b></td>
              <td><b>User-Email</b></td>
              <td><b>User-Password</b></td>
              <td><b>Actions</b></td>
            </tr>
          </thead>
          <tbody>
            {users.map((value) => (
              <tr key={value._id}>
                <td>{value.user_name}</td>
                <td>{value.user_email}</td>
                <td>{value.user_password}</td>
                <td>
                  <button
                    onClick={() => handleEdit(value)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(value)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="editUserModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">
                Update User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-bs-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="User Name"
                value={editUser?.user_name || ''}
                onChange={(e) =>
                  setEditUser({ ...editUser, user_name: e.target.value })
                }
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="User Email"
                value={editUser?.user_email || ''}
                onChange={(e) =>
                  setEditUser({ ...editUser, user_email: e.target.value })
                }
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="User Password"
                value={editUser?.user_password || ''}
                onChange={(e) =>
                  setEditUser({ ...editUser, user_password: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
