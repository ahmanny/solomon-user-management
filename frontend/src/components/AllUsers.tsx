"use client";

import { useGetAllUsers } from "@/lib/utils/hooks/user.queries.hooks";
import { User } from "@/types/user.types";
import { useState } from "react";
import UpdateUserForm from "./forms/UpdateUserForm";
import { useDeleteUser } from "@/lib/utils/hooks/user.mutations.hooks";
import UserResume from "./UserResume";
import MultiStepForm from "./forms/MultiStepForm";

export default function AllUsers() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState(false);
  const { data: users, isLoading, isError } = useGetAllUsers();
  const deleteMutation = useDeleteUser();
  const deleteUser = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Fetching users.....</p>;
  if (isError) return <p>Error fetching users. Please try again later.</p>;
  return (
    <div className="p-8">
      <div className=" flex justify-between items-center mb-4">
        <h1 className="font-bold text-center text-xl">Users List</h1>
        <button
          type="button"
          onClick={() => setForm(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer"
        >
          Add new User
        </button>
      </div>
      {/* display all users that was fetched */}
      <div className="overflow-x-auto">
        {users?.length == 0 ? (
          <div className="flex justify-center items-center">
            <h1 className="  text-xl font-bold ">
              No user has been Created....
            </h1>
          </div>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Profile Photo
                </th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">DOB</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userInfo.profilePhoto ? (
                      <img
                        src={`http://localhost:4000${user.userInfo.profilePhoto}`}
                        alt="Profile Photo"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
                      />
                    ) : (
                      <p className="uppercase  w-10 rounded-full bg-gray-400 text-blue-400 text-3xl">
                        {user.userInfo.firstName.charAt(0)}
                        {user.userInfo.lastName.charAt(0)}
                      </p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userInfo.firstName} {user.userInfo.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userContact.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userInfo.dob}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userInfo.gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.userAddress.country}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-blue-300  text-white rounded-md cursor-pointer"
                      onClick={() => setSelectedUser(user ?? "")}
                    >
                      View
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-300  text-white rounded-md cursor-pointer"
                      onClick={() => setSelectedUserId(user.id ?? "")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-300 text-white rounded-md cursor-pointer"
                      onClick={() => deleteUser(user.id ?? "")}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* show update form when a user is selected */}
      {selectedUserId && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <UpdateUserForm
            userId={selectedUserId}
            onClose={() => setSelectedUserId(null)}
          />
        </div>
      )}
      {/* show user in a resume when  selected */}
      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <UserResume
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        </div>
      )}
      {/* open form to add new user*/}
      {form && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <MultiStepForm onClose={() => setForm(false)} />
        </div>
      )}
    </div>
  );
}
