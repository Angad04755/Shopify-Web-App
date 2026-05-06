"use client";

import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

interface PaypalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
}

const PaypalButton = ({ amount, onSuccess, onError }: PaypalButtonProps) => {
  const formattedAmount = Number(amount).toFixed(2);

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const isDisabled = !isAuthenticated;

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        disabled={isDisabled}
        fundingSource={FUNDING.PAYPAL}
        createOrder={(_, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: formattedAmount,
                },
              },
            ],
          })
        }
        onApprove={async (_, actions) => {
          if (!actions.order) return;

          const details = await actions.order.capture();
          onSuccess(details);
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError?.(err);
        }}
      />

      {!isAuthenticated && (
        <p className="text-red-500 text-base mt-2">
          Please sign in to checkout
        </p>
      )}
    </PayPalScriptProvider>
  );
};

export default PaypalButton;