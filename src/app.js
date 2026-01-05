// backend/src/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const leadRoutes = require('./routes/lead.routes');
const userRoutes = require('./routes/user.routes');

const { User } = require('./models/User');   // ← move this up here

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://careeraashram-crm.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', cors());   // 🔥 REQUIRED

app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

// Helper function to create initial admin (only runs once)
const createInitialAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = await User.create({
        username: 'admin',
        password: 'password',   // ← will be hashed automatically by pre-save hook
        role: 'admin'
      });
      console.log('🚀 Initial admin created successfully:');
      console.log('   Username: admin');
      console.log('   Password: password');
      console.log('   Role:     admin');
    } else {
      console.log('Admin user already exists — skipping creation');
    }
  } catch (err) {
    console.error('Failed to create initial admin:', err.message);
  }
};

const start = async () => {
  try {
    await connectDB();
    await createInitialAdmin();        // This runs automatically on startup
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Health check: http://localhost:4000/health');
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

start();