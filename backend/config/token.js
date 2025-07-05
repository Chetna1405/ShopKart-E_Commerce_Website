import jwt from "jsonwebtoken";

export const genToken = async (UserId) => {
    try {
        const token = await jwt.sign({ UserId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}