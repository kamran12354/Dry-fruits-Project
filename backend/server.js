// server.js (partial)
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.routes.js"; // keep file name
import User from "./models/user.model.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Parse JSON bodies (for API clients)
app.use(express.json({ limit: "10mb" }));
// Also parse urlencoded bodies (in case forms or proxies send this way)
app.use(express.urlencoded({ extended: true }));

// Simple request logger to help debug incoming requests (method, url and body)
app.use((req, res, next) => {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - body:`, req.body);
  } catch (err) {
    // ignore logging errors
  }
  next();
});
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost on common development ports (5173, 5174, 3000, etc.)
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // allow cookies to be sent
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // <-- fixed from "/api/card" to "/api/cart"

// Temporary debug route to echo back request body so frontend/proxy can be tested easily.
if (process.env.NODE_ENV !== "production") {
  app.post("/api/debug/echo", (req, res) => {
    res.json({ received: req.body });
  });

  // Create a user for testing (development only)
  app.post("/api/debug/create-user", async (req, res) => {
    try {
      const { name, email, password, role = "user" } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ message: "name, email and password are required" });
      }

      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "User already exists" });

      const user = await User.create({ name, email, password, role });

      return res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
      console.error("/api/debug/create-user error:", err.message);
      return res.status(500).json({ message: err.message });
    }
  });

  // List users (development only)
  app.get("/api/debug/users", async (req, res) => {
    try {
      const users = await User.find().select("name email role createdAt");
      res.json({ users });
    } catch (err) {
      console.error("/api/debug/users error:", err.message);
      res.status(500).json({ message: err.message });
    }
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
