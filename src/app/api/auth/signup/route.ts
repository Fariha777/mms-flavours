import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyEmail } from "@/lib/emailVerifier";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Verify email
    try {
      const isValidEmail = await verifyEmail(email);
      if (!isValidEmail) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
    } catch (error) {
      console.error("Email verification error:", error);
      return NextResponse.json({ error: "Failed to verify email address" }, { status: 500 });
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully", userId: user._id }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
