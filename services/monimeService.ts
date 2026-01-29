import { v4 as uuidv4 } from 'uuid';

const MONIME_API_URL = '/api/monime';
const MONIME_TOKEN = 'mon_OjT1ZlV92xF8GH8pIVqii0jBZx7WGARYzja5XKthVMeKmJDT7I1rTmTZCcbFD1jd';
const MONIME_SPACE_ID = 'spc-k6MTfzPSrCLYPFUz5NKAtFjtREP';

interface LineItem {
    type: 'custom';
    name: string;
    price: {
        currency: string;
        value: number; // In minor units (cents)
    };
    quantity: number;
}

interface CreateCheckoutSessionRequest {
    name: string;
    lineItems: LineItem[];
    cancelUrl: string;
    successUrl: string;
    metadata?: Record<string, string>;
    paymentOptions?: {
        bank?: {
            disable?: boolean;
        };
        momo?: {
            disable?: boolean;
        };
        card?: {
            disable?: boolean;
        };
    };
}

export const createCheckoutSession = async (
    amount: number, // Amount in SLE (major units)
    metadata: { name: string; email: string; phone: string; project: string }
): Promise<{ redirectUrl: string } | null> => {
    try {
        const payload: CreateCheckoutSessionRequest = {
            name: `Donation from ${metadata.name}`,
            lineItems: [
                {
                    type: 'custom',
                    name: `Donation - ${metadata.project}`,
                    price: {
                        currency: 'SLE',
                        value: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            paymentOptions: {
                bank: { disable: false }, // Explicitly enable bank payments
                momo: { disable: false },
                card: { disable: false }
            },
            cancelUrl: window.location.href, // Stay on the same page if cancelled
            successUrl: window.location.origin + '?status=success', // Redirect to home with success param
            metadata: {
                customer_name: metadata.name,
                customer_email: metadata.email,
                customer_phone: metadata.phone,
                project: metadata.project,
            },
        };

        const response = await fetch(`${MONIME_API_URL}/checkout-sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MONIME_TOKEN}`,
                'Monime-Space-Id': MONIME_SPACE_ID,
                'Idempotency-Key': uuidv4(),
                'Monime-Version': 'caph.2025-08-23',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Monime API Error:', errorData);
            throw new Error(errorData.message || 'Failed to create checkout session');
        }

        const data = await response.json();

        if (data.success && data.result && data.result.redirectUrl) {
            return { redirectUrl: data.result.redirectUrl };
        } else {
            console.error('Unexpected Monime response structure:', data);
            throw new Error('Invalid response from payment provider');
        }

    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};
