import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      await API.post("/bookings", {
        propertyId: id,
      });

      alert("Booking request sent successfully");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold mb-4">
          Confirm Booking
        </h1>

        <p className="mb-6 text-gray-600">
          Click below to send a booking
          request to the property owner.
        </p>

        <button
          onClick={handleBooking}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-lg
          "
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookProperty;