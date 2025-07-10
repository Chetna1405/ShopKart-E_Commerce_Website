export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({ message: "Admin is not found" });
        }
        return res.status(201).json({
            email: adminEmail, 
            role: "admin",
            token: req.cookies 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : `Get admin error :  ${error}`})
    }
}