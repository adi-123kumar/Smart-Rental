import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PaymentPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking =
    async () => {
      try {
        const { data } =
          await API.get(
            `/bookings/${bookingId}`
          );

        setBooking(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const loadScript = (src) => {
    return new Promise(
      (resolve) => {
        const script =
          document.createElement(
            "script"
          );

        script.src = src;

        script.onload = () =>
          resolve(true);

        script.onerror = () =>
          resolve(false);

        document.body.appendChild(
          script
        );
      }
    );
  };

  const handlePayment =
    async () => {

      const res =
        await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

      if (!res) {
        alert(
          "Razorpay SDK failed to load"
        );
        return;
      }

      try {

        const { data } =
          await API.post(
            `/payments/create-order/${bookingId}`
          );

        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            data.order.amount,

          currency:
            data.order.currency,

          order_id:
            data.order.id,

          name:
            "Smart Rental",

          description:
            "Property Booking Payment",

          handler:
            async function (
              response
            ) {

              try {

                await API.post(
                  "/payments/verify",
                  response
                );

                alert(
                  "Payment Successful"
                );

                window.location.href =
                  "/my-bookings";

              } catch (
                error
              ) {
                console.log(
                  error
                );

                alert(
                  "Verification Failed"
                );
              }
            },
        };

        const paymentObject =
          new window.Razorpay(
            options
          );

        paymentObject.open();

      } catch (error) {
        console.log(error);
      }
    };

  if (loading)
    return <h1>Loading...</h1>;

  const total =
    booking.monthlyRent +
    booking.securityDeposit;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Complete Payment
        </h1>

        <div className="space-y-4">

          <div>
            Monthly Rent:
            ₹{booking.monthlyRent}
          </div>

          <div>
            Security Deposit:
            ₹{booking.securityDeposit}
          </div>

          <div className="text-2xl font-bold">
            Total:
            ₹{total}
          </div>

        </div>

        <button
          onClick={handlePayment}
          className="
            mt-8
            w-full
            bg-green-600
            text-white
            py-4
            rounded-xl
          "
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}

export default PaymentPage;