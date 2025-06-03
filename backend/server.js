const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// Add this at the top of your file
require('dotenv').config();

const app = express();
// Replace the hardcoded MongoDB URI with
const uri = process.env.MONGODB_URI;

// Update your server listen call
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());

// MongoDB connection
const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000
});
const dbName = 'cgpa_calculator';

let db;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Connect to MongoDB and initialize collections
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    db = client.db(dbName);
    
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('✅ Created users collection');
      
      await db.collection('users').createIndex({ student_id: 1 }, { unique: true });
      console.log('✅ Created index on student_id');
    }
    
    if (!collectionNames.includes('cgpadb')) {
      await db.createCollection('cgpadb');
      console.log('✅ Created cgpadb collection');
    }
    
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err);
    return false;
  }
}

// Registration endpoint
app.post('/register', async (req, res) => {
  console.log('📝 Registration attempt received');
  
  if (!db) {
    console.error('❌ Database connection not available');
    return res.status(503).json({
      success: false,
      message: "Database connection not available"
    });
  }

  const { name, studentId, password, course } = req.body;
  console.log('📋 Registration details:', { name, studentId, course });

  if (!name || !studentId || !password || !course) {
    console.warn('⚠️ Missing required fields');
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ student_id: studentId });
    if (existingUser) {
      console.warn('⚠️ Student ID already exists:', studentId);
      return res.status(400).json({
        success: false,
        message: "Student ID already registered"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      student_id: studentId,
      password: hashedPassword,
      course,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('✅ User registered successfully:', { studentId, insertedId: result.insertedId });

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({
      success: false,
      message: "Error during registration"
    });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  console.log('🔐 Login attempt received');

  if (!db) {
    console.error('❌ Database connection not available');
    return res.status(503).json({
      success: false,
      message: "Database connection not available"
    });
  }

  const { studentId, password } = req.body;
  console.log('🔍 Login attempt for student ID:', studentId);

  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ student_id: studentId });

    if (!user) {
      console.warn('⚠️ User not found:', studentId);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.warn('⚠️ Invalid password for user:', studentId);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    console.log('✅ Login successful for user:', studentId);
    res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        studentId: user.student_id,
        course: user.course
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({
      success: false,
      message: "Error during login"
    });
  }
});

// Forgot password endpoint
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log('📧 Password reset requested for:', email);

  if (!email) {
    console.warn('⚠️ No email provided');
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CGPA Calculator - Password Reset',
      html: `
        <h2>Password Reset</h2>
        <p>Your temporary password is: <strong>${tempPassword}</strong></p>
        <p>Please change your password after logging in.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
      `
    };

    // Verify email configuration
    console.log('📧 Attempting to send email with nodemailer...');
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);

    res.json({
      success: true,
      message: "Temporary password has been sent to your email"
    });

  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({
      success: false,
      message: "Error sending password reset email. Please try again later."
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    server: 'running',
    database: db ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start the server
const startServer = async () => {
  try {
    const dbConnected = await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      if (!dbConnected) {
        console.warn('⚠️ Server started without database connection. Some features may not work.');
      }
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nGracefully shutting down...');
  try {
    if (client) {
      await client.close();
      console.log('✅ MongoDB connection closed.');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});


// GPA calculation endpoint
app.post('/calculate-gpa', async (req, res) => {
  console.log('📊 GPA calculation requested');

  if (!db) {
    console.error('❌ Database connection not available');
    return res.status(503).json({
      success: false,
      message: "Database connection not available"
    });
  }

  const { studentId, semester } = req.body;
  console.log('🔍 Calculating GPA for:', { studentId, semester });

  if (!studentId || !semester) {
    return res.status(400).json({
      success: false,
      message: "Student ID and semester are required"
    });
  }

  try {
    const cgpaCollection = db.collection('cgpadb');
    const studentData = await cgpaCollection.findOne({ student_id: studentId });

    if (!studentData || !studentData.semesters || !studentData.semesters[semester]) {
      console.warn('⚠️ No data found for student:', studentId);
      return res.status(404).json({
        success: false,
        message: "No data found for this semester"
      });
    }

    const semesterCourses = studentData.semesters[semester];
    console.log('semesterCourses:', semesterCourses);

    let totalCredits = 0;
    let totalGradePoints = 0;

    semesterCourses.forEach(course => {
      // Defensive: handle both number and {$numberInt: "..."} 
      const credits = typeof course.credits === 'object' ? parseInt(course.credits.$numberInt) : parseInt(course.credits);
      const gradePoint = typeof course.grade_point === 'object' ? parseInt(course.grade_point.$numberInt) : parseInt(course.grade_point);
      totalCredits += credits;
      totalGradePoints += credits * gradePoint;
    });

    const semesterGpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    // Calculate CGPA up to current semester
    let allCredits = 0;
    let allGradePoints = 0;

    for (let i = 1; i <= parseInt(semester); i++) {
      if (studentData.semesters[i]) {
        studentData.semesters[i].forEach(course => {
          const credits = typeof course.credits === 'object' ? parseInt(course.credits.$numberInt) : parseInt(course.credits);
          const gradePoint = typeof course.grade_point === 'object' ? parseInt(course.grade_point.$numberInt) : parseInt(course.grade_point);
          allCredits += credits;
          allGradePoints += credits * gradePoint;
        });
      }
    }

    const cgpa = allCredits > 0 ? allGradePoints / allCredits : 0;

    console.log('✅ GPA calculation successful:', { semesterGpa, cgpa });
    res.json({
      success: true,
      gpa: parseFloat(semesterGpa.toFixed(2)),
      cgpa: parseFloat(cgpa.toFixed(2))
    });

  } catch (err) {
    console.error('❌ GPA calculation error:', err);
    res.status(500).json({
      success: false,
      message: "Error calculating GPA"
    });
  }
});

// Credits info endpoint
app.post('/get-credits-info', async (req, res) => {
  const { studentId, semester } = req.body;

  if (!db) {
    return res.status(503).json({ success: false, message: "Database connection not available" });
  }
  if (!studentId || !semester) {
    return res.status(400).json({ success: false, message: "Student ID and semester are required" });
  }

  try {
    const cgpaCollection = db.collection('cgpadb');
    const studentData = await cgpaCollection.findOne({ student_id: studentId });

    if (!studentData || !studentData.semesters) {
      return res.status(404).json({ success: false, message: "No data found for this student" });
    }

    // Calculate total credits up to current semester
    let currentTotalCredits = 0;
    for (let i = 1; i <= parseInt(semester); i++) {
      if (studentData.semesters[i]) {
        studentData.semesters[i].forEach(course => {
          const credits = typeof course.credits === 'object'
            ? parseInt(course.credits.$numberInt)
            : parseInt(course.credits);
          currentTotalCredits += credits;
        });
      }
    }

    // Credits for next semester
    const nextSem = (parseInt(semester) + 1).toString();
    let nextSemCredits = 0;
    if (studentData.semesters[nextSem]) {
      studentData.semesters[nextSem].forEach(course => {
        const credits = typeof course.credits === 'object'
          ? parseInt(course.credits.$numberInt)
          : parseInt(course.credits);
        nextSemCredits += credits;
      });
    }

    // If no next semester, mark as last semester
    const isLastSemester = nextSemCredits === 0;

    res.json({
      success: true,
      currentTotalCredits,
      nextSemCredits,
      isLastSemester
    });
  } catch (err) {
    console.error('❌ /get-credits-info error:', err);
    res.status(500).json({ success: false, message: "Error fetching credits info" });
  }
});