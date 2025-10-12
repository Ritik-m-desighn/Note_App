import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";   // <-- import cors

import notesRoute from "./routes/noteroutes.js";
import authRoute from "./routes/authroutes.js";

dotenv.config();
const app = express();

// Enable CORS
app.use(cors({
  origin: [
    "http://localhost:3000",                 // for local dev
    "https://mineworklist.netlify.app/"    // your actual Netlify URL 
  ],
  credentials: true,
}));


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
