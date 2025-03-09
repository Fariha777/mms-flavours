import "dotenv/config";
import { connectToDatabase } from "../src/lib/mongodb";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    const { db } = await connectToDatabase();

    // Check if admin exists
    const existingAdmin = await db.collection("users").findOne({ email: "admin@farihamunni.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await db.collection("users").insertOne({
      name: "Admin",
      email: "admin@farihamunni.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error seeding admin:", error);
    throw error;
  }
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
