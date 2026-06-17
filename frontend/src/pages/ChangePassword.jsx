import { useState } from "react";
import API from "../services/api";

function ChangePassword() {
  const [oldPassword,
    setOldPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        const { data } =
          await API.put(
            "/users/change-password",
            {
              oldPassword,
              newPassword,
            }
          );

        alert(data.message);

        setOldPassword("");
        setNewPassword("");

      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10">

      <form
        onSubmit={
          submitHandler
        }
        className="bg-white p-6 shadow rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">
          Change Password
        </h1>

        <input
          type="password"
          placeholder="Old Password"
          className="border p-2 w-full mb-4"
          value={
            oldPassword
          }
          onChange={(e) =>
            setOldPassword(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          value={
            newPassword
          }
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Change Password
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;