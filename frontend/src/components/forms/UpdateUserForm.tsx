"use client";

import { useUpdateUser } from "@/lib/utils/hooks/user.mutations.hooks";
import { useGetUser } from "@/lib/utils/hooks/user.queries.hooks";
import { User } from "@/types/user.types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdateUserFormProps {
  userId: string;
  //   close modal form
  onClose: () => void;
}

export default function UpdateUserForm({
  userId,
  onClose,
}: UpdateUserFormProps) {
  const { data: user, isLoading, isError } = useGetUser(userId);
  const updateUserMutation = useUpdateUser();
  const { register, handleSubmit, reset, watch, setValue, getValues } =
    useForm<User>({
      defaultValues: {
        userAcademics: { pastSchools: [""] },
      },
    });

  const pastSchools = watch("userAcademics.pastSchools");
  const addSchool = () => {
    setValue("userAcademics.pastSchools", [
      ...getValues("userAcademics.pastSchools"),
      "",
    ]);
  };

  //remove school
  const rmSchool = (id: number) => {
    const updatedSchools = getValues("userAcademics.pastSchools").filter(
      (_, i) => i !== id
    );
    setValue("userAcademics.pastSchools", updatedSchools);
  };

  //   update form values when user data loads
  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  const onSubmit = (data: any) => {
    updateUserMutation.mutate(
      { id: userId, user: data },
      {
        onSuccess: () => {
          alert("updated");
          onClose();
        },
      }
    );
  };
  if (isLoading) return <p>loading user.....</p>;
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white p-8 rounded-md gap-[15px]"
      >
        <div className="flex gap-[30px]">
          {/* user info step of the form  */}
          <div>
            <h2 className="text-xl font-bold">User Info</h2>
            <div>
              <label>First Name</label>
              <input {...register("userInfo.firstName", { required: true })} />
            </div>

            <div>
              <label>Last Name</label>
              <input {...register("userInfo.lastName", { required: true })} />
            </div>
            <div>
              <label>Date of birth</label>
              <input
                {...register("userInfo.dob", { required: true })}
                type="date"
              />
            </div>
            <div>
              <label>Occupation</label>
              <input {...register("userInfo.occupation", { required: true })} />
            </div>
            <div>
              <label>Gender</label>
              <select {...register("userInfo.gender", { required: true })}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* user contact step of the form  */}
          <div>
            <h2 className="text-xl font-bold">User Contact</h2>
            <div>
              <label>Email</label>
              <input
                {...register("userContact.email", { required: true })}
                type="email"
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                {...register("userContact.phoneNumber", { required: true })}
                type="tel"
              />
            </div>
            <div>
              <label>Fax</label>
              <input {...register("userContact.fax")} />
            </div>
            <div>
              <label>LinkedIn URL</label>
              <input {...register("userContact.linkedinUrl")} />
            </div>
          </div>
          {/* user address step of the form  */}
          <div>
            <h2 className="text-xl font-bold">User Info</h2>
            <div>
              <label>Address</label>
              <input {...register("userAddress.address", { required: true })} />
            </div>
            <div>
              <label>City</label>
              <input {...register("userAddress.city", { required: true })} />
            </div>
            <div>
              <label>State</label>
              <input {...register("userAddress.state", { required: true })} />
            </div>
            <div>
              <label>Zip Code</label>
              <input {...register("userAddress.zipCode", { required: true })} />
            </div>
            <div>
              <label>Country</label>
              <input {...register("userAddress.country", { required: true })} />
            </div>
          </div>
          {/* user academics step of the form  */}
          <div>
            <label>Past Schools</label>
            {pastSchools?.map((_, index) => (
              <div key={index} className=" flex-col flex ">
                <input {...register(`userAcademics.pastSchools.${index}`)} />
                <button
                  type="button"
                  onClick={() => rmSchool(index)}
                  className="cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSchool}
              className="cursor-pointer"
            >
              Add School
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            {updateUserMutation.isPending ? "updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
