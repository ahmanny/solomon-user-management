import { User } from "@/types/user.types";
import Link from "next/link";

interface UserResumeProps {
  user: User;
  //   close modal form
  onClose: () => void;
}
export default function UserResume({ user, onClose }: UserResumeProps) {
  return (
    <div className=" max-w-3xl bg-white p-8 rounded-md shadow-lg mx-auto">
      {/* profile photo and name */}
      <div className=" flex items-center gap-4">
        {user.userInfo.profilePhoto ? (
          <img
            src={`http://localhost:4000${user.userInfo.profilePhoto}`}
            alt="Profile Photo"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
        ) : (
          <div className="uppercase w-24 h-24 rounded-full bg-gray-200 text-neutral-800 text-3xl">
            {user.userInfo.firstName.charAt(0)}
            {user.userInfo.lastName.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">
            {user.userInfo.firstName} {user.userInfo.lastName}
          </h2>
          <p className="text-gray-500">{user.userContact.email}</p>
        </div>
      </div>
      <div className="mt-7">
        <h3 className="font-semibold text-xl border-b pb-2 mb-3">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-neutral-700 text-lg">
          <p>
            <strong>DOB: </strong>
            {user.userInfo.dob || "N/A"}
          </p>
          <p>
            <strong>Gender: </strong>
            {user.userInfo.gender || "N/A"}
          </p>
          <p>
            <strong>Occupation: </strong>
            {user.userInfo.occupation || "N/A"}
          </p>
        </div>
      </div>
      <div className="mt-7">
        <h3 className="font-semibold text-xl border-b pb-2 mb-3">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-neutral-700 text-lg">
          <p>
            <strong>Phone: </strong>
            {user.userContact.phoneNumber || "N/A"}
          </p>
          <p>
            <strong>Email: </strong>
            {user.userContact.email || "N/A"}
          </p>
          <p>
            <strong>Fax: </strong>
            {user.userContact.fax || "N/A"}
          </p>
          <p>
            <strong>LinkedIn: </strong>
            {user.userContact.linkedinUrl ? (
              <Link href={user.userContact.linkedinUrl}>Click here</Link>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      </div>
      <div className="mt-7">
        <h3 className="font-semibold text-xl border-b pb-2 mb-3">Address</h3>
        <div className="grid grid-cols-2 gap-4 text-neutral-700 text-lg">
          <p>
            <strong>Address: </strong>
            {user.userAddress.address || "N/A"}
          </p>
          <p>
            <strong>City: </strong>
            {user.userAddress.city || "N/A"}
          </p>
          <p>
            <strong>State: </strong>
            {user.userAddress.state || "N/A"}
          </p>
          <p>
            <strong>Zip code: </strong>
            {user.userAddress.zipCode || "N/A"}
          </p>
          <p>
            <strong>Country: </strong>
            {user.userAddress.country || "N/A"}
          </p>
        </div>
      </div>
      <div className="mt-7">
        <h3 className="font-semibold text-xl border-b pb-2 mb-3">
          Academic Background
        </h3>
        <div className="grid grid-cols-2 gap-4 text-neutral-700 text-lg">
          <strong>Past Schools: </strong>
          <ul>
            {user.userAcademics.pastSchools.map((school, index) => (
              <li key={index}>{school}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className=" flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
