import paypal from '@paypal/checkout-server-sdk';

// 1️⃣ Get Client ID and Secret
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// 2️⃣ Create a Sandbox Environment
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

// 3️⃣ Create PayPal Client
const client = new paypal.core.PayPalHttpClient(environment);

export { client, paypal };
