import { useSession } from "next-auth/react";
import React, { FormEvent } from "react";
import { popupCenter } from "../ultil/popupUtils";
import Stripe from "stripe";

const CheckoutForm: React.FC = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Create a Checkout Session.
    const checkoutSession: Stripe.Checkout.Session = await fetch(
      `/api/payment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };

  return (
    <button
      className="text-left my-8 border-white border-2 p-2 hover:bg-white hover:text-black"
      onClick={handleSubmit}
    >
      <span>Buy {(value / 1000).toLocaleString()}</span>k Tokens
      <span className="p-1 text-white bg-green-800 rounded-xl mx-2">
        ${(value * price).toFixed(2).toLocaleString()}
      </span>
    </button>
  );
};

export default CheckoutForm;
