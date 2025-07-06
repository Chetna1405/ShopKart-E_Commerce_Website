import jwt from 'jsonwebtoken';

const isAuth = async (req, res ,next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "User does not have token !" });
        }

        let verifyToken = jwt.verify(token , process.env.JWT_SECRET);
        if (!verifyToken) { 
            return res.status(401).json({ message: "Invalid token!" });
        }
        req.userId = verifyToken.UserId;
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

export default isAuth;