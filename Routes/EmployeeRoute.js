const express = require('express');
const router = express.Router();
// const { authenticate, authorize } = require('../middleware/auth'); // Middleware for authentication and authorization






router.get('/employees/test', (req, res) => {
  res.send('Employee route is working!');
});


router.post('/employees/login', (req, res) => {
  // Logic to create a new employee
  const {name,password}= req.body
  console.log(name, password)
  res.send('Employee created successfully');
})






















// // HR Manager Routes
// // router.use(authenticate); // Ensure user is authenticated


// // //test
// // router.get('/employees/test', (req, res) => {
// //   res.send('Employee route is working!');
// // });



// // HR Manager-specific routes
// router.get('/employees', authorize('HR'), (req, res) => {
//   // Logic to get all employees
// });

// router.post('/employees', authorize('HR'), (req, res) => {
//   // Logic to create a new employee
// });

// router.put('/employees/:id', authorize('HR'), (req, res) => {
//   // Logic to update employee details
// });

// router.delete('/employees/:id', authorize('HR'), (req, res) => {
//   // Logic to delete an employee
// });

// // Employee-specific routes
// router.get('/employees/me', authenticate, (req, res) => {
//   // Logic to get the current employee's details
// });

// router.post('/employees/me/leave', authenticate, (req, res) => {
//   // Logic to submit a leave request
// });

// router.get('/employees/me/attendance', authenticate, (req, res) => {
//   // Logic to get attendance records for the current employee
// });

// router.get('/employees/me/payslips', authenticate, (req, res) => {
//   // Logic to get payslips for the current employee
// });

module.exports = router;