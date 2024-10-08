import { Role } from "../models/role.js";
export const studentMiddleware = (req, res, next) => {
    if (req.user.role !== Role.STUDENT) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
