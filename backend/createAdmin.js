import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const recreateAdmin = async () => {
  // ⚠️ delete all admins (safe in dev)
  await Admin.deleteMany({});

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "theeyasakthi@gmail.com",
    password: hashedPassword,
  });

  console.log("✅ Admin recreated with bcrypt");
  process.exit();
};

recreateAdmin();
