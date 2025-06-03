import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPassword from './ForgotPassword';
import TargetCgpaPredictor from './TargetCgpaPredictor';
import GpaCalculator from './GpaCalculator';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/main" element={<GpaCalculator />} />
    </Routes>
  </Router>
);

export default App;