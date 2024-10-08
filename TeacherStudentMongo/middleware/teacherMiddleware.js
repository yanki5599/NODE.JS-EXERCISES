import { Role } from "../models/role.js";
export const teacherMiddleware = (req, res, next) => {
    if (req.user.role !== Role.TEACHER) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
