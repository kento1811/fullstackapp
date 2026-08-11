import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const { data, error } = await supabase
        .from("users")
        .insert([{ username, email, password_hash: hashedPassword }])
        .select()
        .single();

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "User registered successfully", user: data });
};

export const loginUser = async (req, res) => {
    const {username, password} = req.body;

    const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();
    
    if(error){
        console.error(error);
        return res.status(500).json({
            error : error.message
        })
    }

    if(!data || !await bcrypt.compare(password, data.password_hash)){
        return res.status(401).json({
            error : "Invalid username or password"
        })
    }

    const accessToken = jwt.sign(
    {
        userId: data.id,
        username: data.username,
        email: data.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "15m"
    }
    );

    const refreshToken = jwt.sign({
        id: data.id,
        username: data.username,
        email: data.email
        }, 
        process.env.JWT_REFRESH_SECRET, 
        {expiresIn : "7d"}
    );

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
    });

    
    res.json({
        message : "Login successful",
        accessToken,
        user : {
            id : data.id,
            username : data.username,
            email : data.email,
        }
    })
}

export function logoutUser(req, res){
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.json({
        message : "Logout successful"
    })
}

export async function refreshToken(req, res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            error : "No refresh token provided"
        })
    }

    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({
            userId: decoded.id,
            username: decoded.username,
            email: decoded.email
        }, process.env.JWT_SECRET, {expiresIn : "15m"});
        res.json({
            accessToken
        });
    } catch(error){
        return res.status(401).json({
            error : "Invalid refresh token"
        })
    }
}

