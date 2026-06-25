import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phoneNumber: "",

      gender: "",
      dateOfBirth: "",

      occupationType: "",
      companyName: "",
      monthlyIncome: "",

      idType: "Aadhaar",
      idNumber: "",

      emergencyContactName: "",
      emergencyContactPhone: "",

      moveInDate: "",
      leaseDuration: 11,

      numberOfOccupants: 1,

      hasPets: false,
      smokingHabit: false,

      vehicleCount: 0,

      tenantMessage: "",
    });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/bookings",
        {
          propertyId: id,
          ...formData,
        }
      );

      alert(
        "Booking request submitted successfully"
      );

      navigate(
        "/my-bookings"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Booking failed"
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      py-10
      px-4
    "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-2xl
        shadow-xl
        p-8
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-8
        "
        >
          Rental Application
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-10"
        >
          {/* PERSONAL DETAILS */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Personal Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                value={
                  formData.phoneNumber
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              >
                <option value="">
                  Select Gender
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Other
                </option>
              </select>

              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>
          </div>

          {/* EMPLOYMENT */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Employment Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="occupationType"
                placeholder="Occupation"
                required
                value={
                  formData.occupationType
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={
                  formData.companyName
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                value={
                  formData.monthlyIncome
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>
          </div>

          {/* IDENTITY */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Identity Verification
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <select
                name="idType"
                value={
                  formData.idType
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              >
                <option>
                  Aadhaar
                </option>

                <option>
                  PAN
                </option>

                <option>
                  Passport
                </option>

                <option>
                  Driving License
                </option>
              </select>

              <input
                type="text"
                name="idNumber"
                placeholder="Document Number"
                required
                value={
                  formData.idNumber
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>
          </div>

          {/* EMERGENCY */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Emergency Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="emergencyContactName"
                placeholder="Contact Name"
                required
                value={
                  formData.emergencyContactName
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="emergencyContactPhone"
                placeholder="Contact Number"
                required
                value={
                  formData.emergencyContactPhone
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>
          </div>

          {/* RENTAL DETAILS */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Rental Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="date"
                name="moveInDate"
                required
                value={
                  formData.moveInDate
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="leaseDuration"
                placeholder="Lease Duration (Months)"
                value={
                  formData.leaseDuration
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="numberOfOccupants"
                placeholder="Occupants"
                value={
                  formData.numberOfOccupants
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="vehicleCount"
                placeholder="Vehicles"
                value={
                  formData.vehicleCount
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>

            <div className="flex gap-8 mt-5">

              <label>
                <input
                  type="checkbox"
                  name="hasPets"
                  checked={
                    formData.hasPets
                  }
                  onChange={
                    handleChange
                  }
                />
                <span className="ml-2">
                  Have Pets
                </span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="smokingHabit"
                  checked={
                    formData.smokingHabit
                  }
                  onChange={
                    handleChange
                  }
                />
                <span className="ml-2">
                  Smoking
                </span>
              </label>

            </div>
          </div>

          {/* MESSAGE */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Message To Owner
            </h2>

            <textarea
              rows="5"
              name="tenantMessage"
              value={
                formData.tenantMessage
              }
              onChange={
                handleChange
              }
              placeholder="Tell the owner about yourself..."
              className="
                w-full
                border
                rounded-lg
                p-4
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4
              rounded-xl
              font-bold
              text-lg
            "
          >
            Submit Rental Application
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookProperty;