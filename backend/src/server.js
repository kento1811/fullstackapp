import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import http from "http";
import { setupWebSocket } from "./websocket/websocket.js";

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

setupWebSocket(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api",messageRoutes);


app.get("/",async (req, res) => {
    const {data, error} = await supabase
    .from("users")
    .select("*");

    if(error){
        console.error(error);
        return res.status(500).json({
            error : error.message
        })
    }
    res.json(data);
});

server.listen(port, () =>{
  console.log(`Server is running on ws://localhost:${port}`);
});
