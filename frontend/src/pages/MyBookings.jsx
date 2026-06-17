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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-xl">
          No bookings found
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(
            (booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="font-bold text-xl">
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

                <p>
                  ₹
                  {
                    booking.property
                      ?.price
                  }
                </p>

                <p className="mt-2">
                  Status:
                  <strong>
                    {" "}
                    {
                      booking.status
                    }
                  </strong>
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyBookings;