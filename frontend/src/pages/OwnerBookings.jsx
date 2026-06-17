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

      <h1 className="text-3xl font-bold mb-6">
        Booking Requests
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-xl">
          No requests found
        </div>
      ) : (
        <div className="space-y-4">

          {bookings.map(
            (booking) => (
              <div
                key={
                  booking._id
                }
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="font-bold text-xl">
                  {
                    booking
                      .property
                      ?.title
                  }
                </h2>

                <p>
                  Tenant:
                  {" "}
                  {
                    booking
                      .tenant
                      ?.name
                  }
                </p>

                <p>
                  {
                    booking
                      .tenant
                      ?.email
                  }
                </p>

                <p className="mt-2">
                  Status:
                  {" "}
                  <strong>
                    {
                      booking.status
                    }
                  </strong>
                </p>

                {booking.status ===
                  "Pending" && (
                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        approveBooking(
                          booking._id
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectBooking(
                          booking._id
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
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