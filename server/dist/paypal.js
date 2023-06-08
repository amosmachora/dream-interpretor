import { baseURL } from "./constants.js";
import fetch from "node-fetch";
export const getAccessToken = async () => {
    const paypalApiUrl = `${baseURL}
    `;
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    const secret = process.env.REACT_APP_PAYPAL_SECRET;
    const authString = `${clientId}:${secret}`;
    const encodedAuthString = Buffer.from(authString).toString("base64");
    try {
        const response = await fetch(paypalApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-Language": "en_US",
                Authorization: `Basic ${encodedAuthString}`,
            },
        });
        console.log(response);
        const responseData = await response.text();
        console.log(responseData);
        return responseData.access_token;
    }
    catch (error) {
        console.error("Error retrieving access token:", error);
        throw error;
    }
};
