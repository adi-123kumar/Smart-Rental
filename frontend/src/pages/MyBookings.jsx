import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } =
        await API.get(
          "/bookings/my-bookings"
        );

      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (
    status
  ) => {
    if (status === "Approved")
      return "bg-green-600";

    if (status === "Rejected")
      return "bg-red-600";

    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Rental Applications
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow">
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
                    overflow-hidden
                  "
                >
                  {/* HEADER */}

                  <div
                    className="
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      p-6
                    "
                  >
                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {
                            booking.property
                              ?.title
                          }
                        </h2>

                        <p>
                          📍
                          {
                            booking.property
                              ?.location
                          }
                        </p>

                      </div>

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          font-semibold

                          ${getStatusColor(
                          booking.status
                        )}
                        `}
                      >
                        {
                          booking.status
                        }
                      </span>

                      {
                        booking.status ===
                        "Payment Pending" && (

                          <a
                            href={`/payment/${booking._id}`}
                            className="
        inline-block
        mt-4
        bg-green-600
        text-white
        px-6
        py-3
        rounded-xl
      "
                          >
                            Pay Now
                          </a>
                        )
                      }

                    </div>
                  </div>

                  {/* BODY */}

                  <div className="p-6">

                    <div className="grid md:grid-cols-3 gap-6">

                      {/* RENT DETAILS */}

                      <div
                        className="
                          bg-gray-50
                          rounded-xl
                          p-5
                        "
                      >
                        <h3 className="font-bold mb-3">
                          Rent Details
                        </h3>

                        <p>
                          Monthly Rent
                        </p>

                        <p className="font-bold text-xl text-blue-600">
                          ₹
                          {
                            booking.monthlyRent
                          }
                        </p>

                        <div className="mt-4">

                          <p>
                            Security Deposit
                          </p>

                          <p className="font-bold text-lg">
                            ₹
                            {
                              booking.securityDeposit
                            }
                          </p>

                        </div>

                      </div>

                      {/* RENTAL INFO */}

                      <div
                        className="
                          bg-gray-50
                          rounded-xl
                          p-5
                        "
                      >
                        <h3 className="font-bold mb-3">
                          Rental Details
                        </h3>

                        <p>
                          Move-In Date
                        </p>

                        <p className="font-semibold">
                          {booking.moveInDate
                            ? new Date(
                              booking.moveInDate
                            ).toLocaleDateString()
                            : "-"}
                        </p>

                        <div className="mt-3">

                          <p>
                            Lease Duration
                          </p>

                          <p className="font-semibold">
                            {
                              booking.leaseDuration
                            }
                            {" "}
                            Months
                          </p>

                        </div>

                        <div className="mt-3">

                          <p>
                            Occupants
                          </p>

                          <p className="font-semibold">
                            {
                              booking.numberOfOccupants
                            }
                          </p>

                        </div>

                      </div>

                      {/* OWNER INFO */}

                      <div
                        className="
                          bg-gray-50
                          rounded-xl
                          p-5
                        "
                      >
                        <h3 className="font-bold mb-3">
                          Property Owner
                        </h3>

                        <p>
                          Name:
                        </p>

                        <p className="font-semibold">
                          {
                            booking.owner
                              ?.name
                          }
                        </p>

                        <div className="mt-3">

                          <p>
                            Email:
                          </p>

                          <p className="font-semibold break-all">
                            {
                              booking.owner
                                ?.email
                            }
                          </p>

                        </div>

                        <div className="mt-3">

                          <p>
                            Phone:
                          </p>

                          <p className="font-semibold">
                            {
                              booking.owner
                                ?.phone
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* APPLICATION DETAILS */}

                    <div className="mt-8">

                      <h3 className="text-xl font-bold mb-4">
                        Application Details
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">

                        <div>
                          <p>
                            Occupation:
                          </p>

                          <p className="font-semibold">
                            {
                              booking.occupationType
                            }
                          </p>
                        </div>

                        <div>
                          <p>
                            Company:
                          </p>

                          <p className="font-semibold">
                            {
                              booking.companyName
                            }
                          </p>
                        </div>

                        <div>
                          <p>
                            Monthly Income:
                          </p>

                          <p className="font-semibold">
                            ₹
                            {
                              booking.monthlyIncome
                            }
                          </p>
                        </div>

                        <div>
                          <p>
                            Vehicle Count:
                          </p>

                          <p className="font-semibold">
                            {
                              booking.vehicleCount
                            }
                          </p>
                        </div>

                        <div>
                          <p>
                            Pets:
                          </p>

                          <p className="font-semibold">
                            {booking.hasPets
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p>
                            Smoking:
                          </p>

                          <p className="font-semibold">
                            {booking.smokingHabit
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* MESSAGE */}

                    {booking.tenantMessage && (
                      <div className="mt-8">

                        <h3 className="font-bold mb-3">
                          Your Message
                        </h3>

                        <div
                          className="
                            bg-blue-50
                            border
                            rounded-xl
                            p-4
                          "
                        >
                          {
                            booking.tenantMessage
                          }
                        </div>

                      </div>
                    )}

                    {/* TIMELINE */}

                    <div className="mt-8 border-t pt-6">

                      <p className="text-gray-500">
                        Application Submitted:
                      </p>

                      <p className="font-semibold">
                        {new Date(
                          booking.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyBookings;