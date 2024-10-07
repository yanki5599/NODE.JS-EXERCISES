export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;
    if (statusCode === 500) {
        console.log(err);
    }
    return res.status(statusCode).send({ message: message });
};
