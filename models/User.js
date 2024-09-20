// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee', 'HR'], default: 'employee' },
    employeeId: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    doj: { type: Date, required: true },

}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
    console.log('Plaintext password:', password);
    console.log('Hashed password from DB:', this.password);
    
    if (!password || !this.password) {S
        throw new Error('Password is missing');
    }
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        console.log('Comparison result:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};
const User = mongoose.model('User', userSchema);
module.exports = User;