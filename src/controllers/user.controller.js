const bcrypt = require('bcryptjs');
const { User } = require('../models/User');

const createConsultant = async (req, res) => {
  const { username, password } = req.body;

  console.log('CREATE CONSULTANT ATTEMPT:');
  console.log('  Username:', username);
  console.log('  Received password (plain):', password || '[MISSING]');

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: 'Username taken' });
  }

  // DO NOT HASH HERE — the pre-save hook will do it
  const user = await User.create({ username, password, role: 'consultant' });

  console.log('  → Consultant created successfully:', username);
  console.log('  Stored ID:', user._id.toString());

  res.status(201).json({ id: user._id, username, role: user.role });
};

const getAllConsultants = async (req, res) => {
  const consultants = await User.find({ role: 'consultant' }).select('-password');
  res.json(consultants);
};

module.exports = { createConsultant, getAllConsultants };