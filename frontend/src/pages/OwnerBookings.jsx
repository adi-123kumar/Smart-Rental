import { useEffect, useState } from "react";
import API from "../services/api";

function OwnerBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } =
        await API.get(
          "/bookings/owner-bookings"
        );

      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveBooking =
    async (id) => {
      try {
        await API.put(
          `/bookings/${id}/approve`
        );

        alert(
          "Booking Approved"
        );

        fetchBookings();
      } catch (error) {
        console.log(error);
      }
    };

  const rejectBooking =
    async (id) => {
      try {
        await API.put(
          `/bookings/${id}/reject`
        );

        alert(
          "Booking Rejected"
        );

        fetchBookings();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Rental Applications
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No booking requests found.
        </div>
      ) : (
        <div className="space-y-8">

          {bookings.map(
            (booking) => (
              <div
                key={booking._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-8
                "
              >
                {/* Property */}

                <div className="mb-6">

                  <h2 className="text-2xl font-bold">
                    {
                      booking
                        .property
                        ?.title
                    }
                  </h2>

                  <p>
                    📍
                    {
                      booking
                        .property
                        ?.location
                    }
                  </p>

                  <p>
                    ₹
                    {
                      booking
                        .property
                        ?.price
                    }
                    /month
                  </p>

                </div>

                {/* Applicant */}

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <h3 className="font-bold text-lg mb-3">
                      Personal Details
                    </h3>

                    <p>
                      Name:
                      {" "}
                      {
                        booking.fullName
                      }
                    </p>

                    <p>
                      Email:
                      {" "}
                      {
                        booking.email
                      }
                    </p>

                    <p>
                      Phone:
                      {" "}
                      {
                        booking.phoneNumber
                      }
                    </p>

                    <p>
                      Gender:
                      {" "}
                      {
                        booking.gender
                      }
                    </p>

                    <p>
                      DOB:
                      {" "}
                      {booking.dateOfBirth
                        ? new Date(
                            booking.dateOfBirth
                          ).toLocaleDateString()
                        : "-"}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg mb-3">
                      Employment
                    </h3>

                    <p>
                      Occupation:
                      {" "}
                      {
                        booking.occupationType
                      }
                    </p>

                    <p>
                      Company:
                      {" "}
                      {
                        booking.companyName
                      }
                    </p>

                    <p>
                      Monthly Income:
                      ₹
                      {
                        booking.monthlyIncome
                      }
                    </p>

                  </div>

                </div>

                {/* Verification */}

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                  <div>

                    <h3 className="font-bold text-lg mb-3">
                      Identity
                    </h3>

                    <p>
                      Document:
                      {" "}
                      {
                        booking.idType
                      }
                    </p>

                    <p>
                      Number:
                      {" "}
                      {
                        booking.idNumber
                      }
                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg mb-3">
                      Emergency Contact
                    </h3>

                    <p>
                      Name:
                      {" "}
                      {
                        booking.emergencyContactName
                      }
                    </p>

                    <p>
                      Phone:
                      {" "}
                      {
                        booking.emergencyContactPhone
                      }
                    </p>

                  </div>

                </div>

                {/* Rental Info */}

                <div className="mt-8">

                  <h3 className="font-bold text-lg mb-3">
                    Rental Details
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">

                    <div>
                      Move-In:
                      <br />
                      <strong>
                        {new Date(
                          booking.moveInDate
                        ).toLocaleDateString()}
                      </strong>
                    </div>

                    <div>
                      Lease:
                      <br />
                      <strong>
                        {
                          booking.leaseDuration
                        }
                        {" "}
                        Months
                      </strong>
                    </div>

                    <div>
                      Occupants:
                      <br />
                      <strong>
                        {
                          booking.numberOfOccupants
                        }
                      </strong>
                    </div>

                  </div>

                </div>

                {/* Lifestyle */}

                <div className="mt-8">

                  <h3 className="font-bold text-lg mb-3">
                    Lifestyle Information
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">

                    <p>
                      Pets:
                      {" "}
                      <strong>
                        {booking.hasPets
                          ? "Yes"
                          : "No"}
                      </strong>
                    </p>

                    <p>
                      Smoking:
                      {" "}
                      <strong>
                        {booking.smokingHabit
                          ? "Yes"
                          : "No"}
                      </strong>
                    </p>

                    <p>
                      Vehicles:
                      {" "}
                      <strong>
                        {
                          booking.vehicleCount
                        }
                      </strong>
                    </p>

                  </div>

                </div>

                {/* Message */}

                {booking.tenantMessage && (
                  <div className="mt-8">

                    <h3 className="font-bold text-lg mb-3">
                      Message From Tenant
                    </h3>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      {
                        booking.tenantMessage
                      }
                    </div>

                  </div>
                )}

                {/* Status */}

                <div className="mt-8">

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-white
                      font-semibold

                      ${
                        booking.status ===
                        "Approved"
                          ? "bg-green-600"
                          : booking.status ===
                            "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }
                    `}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* Actions */}

                {booking.status ===
                  "Pending" && (
                  <div className="flex gap-4 mt-8">

                    <button
                      onClick={() =>
                        approveBooking(
                          booking._id
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                      "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectBooking(
                          booking._id
                        )
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                      "
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}

export default OwnerBookings;