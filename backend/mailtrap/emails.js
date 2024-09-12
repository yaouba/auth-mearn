import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE,  PASSWORD_RESET_REQUEST_TEMPLATE} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.testing.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Email Verification",
        });

        console.log(response)
    } catch (error) {
        throw new Error("Failed to send verification email: " + error.message);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.testing.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Auth",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log(response)
    } catch (error) {
        
    }
}

export const sendResetPasswordEmail = async (email, resetUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.testing.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        });

        console.log(response)
    } catch (error) {
        throw new Error("Failed to send reset password email: " + error.message);
    }
}