import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.ico';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedStudentId = localStorage.getItem('studentId');
    const savedPassword = localStorage.getItem('password');
    const savedRemember = localStorage.getItem('remember') === 'true';

    if (savedRemember && savedStudentId && savedPassword) {
      setStudentId(savedStudentId);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (studentId && password) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Handle "Remember me" functionality
          if (remember) {
            localStorage.setItem('studentId', studentId);
            localStorage.setItem('password', password);
            localStorage.setItem('remember', 'true');
          } else {
            localStorage.removeItem('studentId');
            localStorage.removeItem('password');
            localStorage.removeItem('remember');
          }

          toast.success('Login successful!');
          setTimeout(() => {
            navigate('/main');
          }, 1500);
        } else {
          toast.error(data.message || 'Login failed');
          setError(data.message || 'Invalid credentials');
        }
      } catch (err) {
        toast.error('Server error. Please try again later.');
        setError('Server error. Please try again later.');
      }
    } else {
      setError('Please enter both Student ID and Password.');
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#1465b1' }}
    >
      <ToastContainer position="top-right" autoClose={1500} />
      {/* Left Side - Login */}
      <div
        className="w-2/5 flex flex-col justify-center px-12 py-8 shadow-lg"
        style={{ backgroundColor: '#10358b' }}
      >
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Logo" className="w-40 h-25 mr-3" />
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-white">Student ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-200 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full"
            style={{
              backgroundColor: '#1465b1',
              color: '#fff',
              padding: '0.5rem 0',
              borderRadius: '0.375rem',
              fontWeight: '600',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#10358b')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#1465b1')}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-100">Don't have an account? </span>
          <Link to="/signup" className="text-blue-200 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
      {/* Right Side - Project Gist */}
      <div
        className="w-3/5 flex flex-col justify-center px-16 py-8"
        style={{ backgroundColor: '#1465b1' }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">GPAlytics</h1>
        <h2 className="text-xl italic text-blue-100 mb-8">
          🪄 Wingardium GPA-osa – levitate your GPA with analytics
        </h2>

        {/* Features */}
        <div className="mb-4 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
          <h3 className="font-semibold text-lg text-white mb-1">🎯 Features</h3>
          <ul className="ml-4 text-blue-50 space-y-1">
            <li>🧮 CGPA & Target GPA calculator</li>
            <li>⚡ Simple, fast, and student-friendly</li>
            <li>📊 Instant analytics</li>
          </ul>
        </div>

        {/* Who can use */}
        <div className="mb-4 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
          <h3 className="font-semibold text-lg text-white mb-1">👤 Who can use?</h3>
          <ul className="ml-4 text-blue-50 space-y-1">
            <li>🎓 All students, any branch/year</li>
          </ul>
        </div>

        {/* Why use */}
        <div className="mb-4 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
          <h3 className="font-semibold text-lg text-white mb-1">💡 Why use?</h3>
          <ul className="ml-4 text-blue-50 space-y-1">
            <li>🎯 Set goals, track progress</li>
            <li>📈 Plan smarter, save time</li>
          </ul>
        </div>

        {/* How it works */}
        <div className="p-4 bg-blue-900 bg-opacity-30 rounded-lg">
          <h3 className="font-semibold text-lg text-white mb-1">⚙️ How it works?</h3>
          <ul className="ml-4 text-blue-50 space-y-1">
            <li>📝 Enter ID & semester</li>
            <li>🔢 Get results instantly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;