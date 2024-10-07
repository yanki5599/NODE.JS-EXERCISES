export const studentMiddleware = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
