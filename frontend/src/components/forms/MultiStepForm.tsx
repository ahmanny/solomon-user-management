"use client";

import { useCreateUser } from "@/lib/utils/hooks/user.mutations.hooks";
import { useUserStore } from "@/store/user.store";
import { User } from "@/types/user.types";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface MultiStepFormProps {
  // close modal form
  onClose: () => void;
}

const steps = [
  "User Info",
  "Contact Info",
  "Address",
  "Academic Background",
  "Review",
];

export default function MultiStepForm({ onClose }: MultiStepFormProps) {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm<User>({
      defaultValues: {
        userAcademics: { pastSchools: [""] },
      },
    });

  // add school
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

  //   create mutation
  const createMutation = useCreateUser();

  // form submit
  const onSubmit = (data: any) => {
    // Allow dynamic type
    const formData = new FormData();

    if (data.userInfo.profilePhoto && data.userInfo.profilePhoto[0]) {
      formData.append("profilePhoto", data.userInfo.profilePhoto[0]); // Append file
    }
    formData.append("userData", JSON.stringify(data)); // Convert user data to JSON string

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          alert("added");
          onClose();
        },
        onError: (error) => {
          console.error("error creating user:", error);
        },
      });
    }
  };

  return (
    <div className="w-lg mx-auto p-6 shadow-md rounded-md flex flex-col justify-center items-center gap-4 bg-white">
      <h2 className="text-xl font-bold">{steps[step]}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px]"
      >
        {step === 0 && (
          <>
            {/* user info step of the form  */}
            <div>
              <label>Profile Photo</label>
              <input
                type="file"
                {...register("userInfo.profilePhoto", { required: true })}
                accept="image/*"
              />
            </div>
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
          </>
        )}

        {step === 1 && (
          <>
            {/* user contact step of the form  */}

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
          </>
        )}

        {step === 2 && (
          <>
            {/* user address step of the form  */}

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
          </>
        )}

        {step === 3 && (
          <>
            {/* user academics step of the form  */}
            <label>Past Schools</label>
            {pastSchools.map((_, index) => (
              <div key={index} className=" flex-col flex ">
                <input
                  {...register(`userAcademics.pastSchools.${index}`, {
                    required: true,
                  })}
                />
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
          </>
        )}
        {/* user review step of the form  */}

        {step === 4 && (
          <div className="p-4 text-blue-600 rounded-md ">
            <p className="capitalize">
              <strong>Name:</strong> {watch("userInfo.firstName")}{" "}
              {watch("userInfo.lastName")}
            </p>
            <p>
              <strong>Email:</strong> {watch("userContact.email")}
            </p>
            <p>
              <strong>Phone:</strong> {watch("userContact.phoneNumber")}
            </p>
            <p>
              <strong>Address:</strong> {watch("userAddress.address")},
              {watch("userAddress.city")}, {watch("userAddress.state")}
            </p>
            <div className="flex gap-4">
              <strong>Education: </strong>
              <ul>
                {pastSchools.map((school, index) => (
                  <li key={index}>{school}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className=" flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex gap-6">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              {step < steps.length - 1
                ? "Next"
                : createMutation.isPending
                ? "Submit..."
                : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
