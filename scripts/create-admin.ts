const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const MONGODB_URI = "mongodb://admin:password123@localhost:27017/restaurant?authSource=admin";

// Define User Schema here since we can't import it
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const adminData = {
      name: "Admin User",
      email: "admin@restaurant.com",
      password: await bcrypt.hash("admin123", 12),
      role: "admin",
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    await User.create(adminData);
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser();
