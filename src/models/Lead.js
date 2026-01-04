const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  collegePreference: { type: String, required: true, trim: true },
  remark: {
    type: String,
    enum: ['Followup', 'Application Pending', 'Application Done', 'Payment Done'],
    required: true,
  },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = { Lead };