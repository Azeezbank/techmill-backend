import jwt from "jsonwebtoken";
export class AuthGuard {
    // Verify JWT and attach user to request
    static authenticate(req, res, next) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "No token provided" });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.banned) {
                return res.status(403).json({ message: "Your account is banned" });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            console.error("Invalid token", err);
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}
