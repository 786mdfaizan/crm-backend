const jwt = require('jsonwebtoken');
const { User } = require('../models/User');  // ← ADD THIS LINE

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log('LOGIN ATTEMPT:');
  console.log('  Username:', username);
  console.log('  Password entered (plain):', password);

  if (!username || !password) {
    console.log('  Missing fields');
    return res.status(400).json({ message: 'Username and password required' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    console.log('  → User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  console.log('  → User found. Stored hash:', user.password.substring(0, 30) + '...');

  const isMatch = await user.comparePassword(password);
  console.log('  → Password match result:', isMatch);

  if (!isMatch) {
    console.log('  → Login failed: incorrect password');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  console.log('  → Login SUCCESS for user:', username);

  res.json({
    token,
    user: { id: user._id, username: user.username, role: user.role },
  });
};

module.exports = { login };