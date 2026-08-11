import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error : "No token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            error : "No token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Access token expired"
            });
        }

        return res.status(401).json({
            error: "Invalid access token"
        });
    }
}