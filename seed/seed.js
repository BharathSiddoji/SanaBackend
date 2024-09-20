// seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const seedAdmin = async () => {
  const adminEmail = "sana002@SaNa.com";
  const adminPassword = "employee@SaNa002"; // Change this to a secure password

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    // const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      name: "Employee",
      email: adminEmail,
      password: adminPassword,
      username: "Admin", // Optional: Add a username,
      role: "employee",
      employeeId: "SaNa002",
      gender: "Male",
      age: 25,
      address: "123 Main St, Anytown, USA",
      phone: 1234567890,
      doj: new Date(),
    });
    await adminUser.save();
    console.log("Admin user created:", adminUser);
  } else {
    console.log("Admin user already exists.");
  }
};

// Connect to MongoDB and seed the admin
mongoose
  .connect("mongodb://localhost:27017/SaNaHr")
  .then(() => {
    console.log("MongoDB connected");
    return seedAdmin();
  })
  .then(() => mongoose.connection.close())
  .catch((err) => console.error("MongoDB connection error:", err));
