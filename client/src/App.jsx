import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckOutForm";

const stripePromise = loadStripe("pk_test_51QHdYyBU681vIFBkL7FTVXhlWjLIlvdVbeCAUK4UC8hTsHqUtxMvbb72EQVxIF9sUdU8aJQn3oeDgv17crnmXikJ006cLmV8Fz");

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await axios.post("http://localhost:8000/payment/create-payment-intent", {
          // No need to specify payment method type since both are supported in the backend
        });
        setClientSecret(res.data.clientSecret); // Set clientSecret received from the backend
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  
  const loader = 'auto';

  return (
    <>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default App;
