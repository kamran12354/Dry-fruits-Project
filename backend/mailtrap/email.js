import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailtemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const verificationEmail = async (email, verificationToken) => {
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: [{ email }],
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
            ),
        });

        return response;

    } catch (error) {
        console.log("Error in the verification email route:", error.message);
    }
};

export const sendForgetPasswordEmail = async (email, resetToken) => {
    try {
        // Reset URL with token
        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        // Replace resetURL in the HTML template
        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

        const response = await mailtrapClient.send({
            to: [{ email }], // Mailtrap expects array
            from:sender,
            subject: "Reset Your Password",
            html: htmlContent,
        });

        return response;

    } catch (error) {
        console.log("Error in the forget password email route:", error.message);
    }
};
