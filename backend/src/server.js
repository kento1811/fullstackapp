import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://fullstackappfrontend-six.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

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



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});