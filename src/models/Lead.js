const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  studentName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true 
  },
  mobileNumber: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: [10, 'Mobile number must be at least 10 digits'],
    maxlength: [15, 'Mobile number cannot exceed 15 digits'],
    // Optional: add regex for basic validation (allows +91, 9876543210, etc.)
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number']
  },
  collegePreference: { 
    type: String, 
    required: true, 
    trim: true 
  },
  remark: {
    type: String,
    enum: ['Followup', 'Application Pending', 'Application Done', 'Payment Done'],
    required: true,
  },
  consultant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

// Optional: Add index on mobileNumber for faster lookups
leadSchema.index({ mobileNumber: 1 });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = { Lead };