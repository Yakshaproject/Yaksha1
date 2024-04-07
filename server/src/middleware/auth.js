import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies["auth token"]
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = (decoded).userId;
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send({ message: "Unauthorized" })
    }
} 