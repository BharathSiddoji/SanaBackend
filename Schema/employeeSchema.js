const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({ 
    name: String,
    email: String,
    password: String
});
module.exports = mongoose.model('Employee', employeeSchema)