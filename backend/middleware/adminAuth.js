import jwt from 'jsonwebtoken';

const adminAuth = async (req, res ,next) => {
    try {
        // console.log(req.cookies.token);
        let { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Admin does not have token !" });
        }

        let verifyToken = jwt.verify(token , process.env.JWT_SECRET);
        if (!verifyToken) { 
            return res.status(401).json({ message: "Invalid token!" });
        }
        req.adminEmail = process.env.ADMIN_EMAIL;
        next();

    } catch (error) {
        console.error("Admin Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized admin access" });
    }
}

export default adminAuth;