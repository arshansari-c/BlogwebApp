import jwt from "jsonwebtoken"

export const resetPasswordToken = async ({ userId, res }) => {
    try {
        const key = process.env.RESET_PASSWORD_TOKEN;
        if (!key) {
            return res.status(500).json({ message: "Key not found" });
        }

        const token = jwt.sign({ userId }, key, { expiresIn: '7d' });

        res.cookie('resetpassword', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

    } catch (error) {
        console.log("reset password token error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
