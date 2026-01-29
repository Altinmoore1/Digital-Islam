
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalDonateButtonProps {
    amount: string;
    currency?: string;
    onSuccess: (details: any) => void;
    onError?: (err: any) => void;
    fundingSource?: "paypal" | "card";
}

const PayPalDonateButton: React.FC<PayPalDonateButtonProps> = ({
    amount,
    currency = "USD",
    onSuccess,
    onError,
    fundingSource
}) => {

    // Memoize options to prevent unnecessary script reloads
    const initialOptions = React.useMemo(() => ({
        clientId: "AWlcyt5axlAatiSoHeCfoRf8WZikaEdTdBGp2WXlpF-Sr40H1uAHOkhBvdIj6vE3s1CdRGIAugNLMjZN",
        currency: currency,
        intent: "capture",
    }), [currency]);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="w-full z-0 relative">
                <PayPalButtons
                    fundingSource={fundingSource}
                    forceReRender={[amount, currency, fundingSource]}
                    style={{ layout: "vertical", shape: "rect", label: "donate" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                    description: "Donation to Digital Islam",
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            if (actions.order) {
                                const details = await actions.order.capture();
                                onSuccess(details);
                            }
                        } catch (err) {
                            console.error("Capture Error:", err);
                            if (onError) onError(err);
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Error:", err);
                        if (onError) onError(err);
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalDonateButton;
