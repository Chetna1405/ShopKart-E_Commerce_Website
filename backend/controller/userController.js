import User from "../model/UserModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        return res.status(500).json({ message: "get current user error" });
    }    
}