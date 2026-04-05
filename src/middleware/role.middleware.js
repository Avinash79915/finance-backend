export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try{
            const userRole = req.headers?.role; //  header se role nikalenge
            if(!userRole){
                return res.status(401).json({ message: "Role not provided" });
            }
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};