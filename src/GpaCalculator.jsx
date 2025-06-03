import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TargetCgpaPredictor from './TargetCgpaPredictor';

const GpaCalculator = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [semester, setSemester] = useState('');
  const [gpa, setGpa] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/health', { 
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        if (response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('error');
        }
      } catch (err) {
        setServerStatus('disconnected');
      }
    };
    checkServerStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGpa(null);
    setCgpa(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/calculate-gpa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ studentId, semester })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error calculating GPA');
      }

      const data = await response.json();
      if (data.gpa !== undefined && data.cgpa !== undefined) {  // Changed from semesterGpa to gpa
        setGpa(data.gpa);  // Changed from data.semesterGpa to data.gpa
        setCgpa(data.cgpa);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch GPA. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#1465b1',
      padding: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Left side - GPA Calculator */}
        <div style={{ 
          flex: '1',
          backgroundColor: '#10358b', 
          borderRadius: '10px', 
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {/* Logout button */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </div>

          <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#ffffff', fontSize: '28px' }}>Student GPA Calculator</h1>
          
          {/* Server status indicator */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            padding: '8px',
            backgroundColor: 
              serverStatus === 'connected' ? 'rgba(230, 247, 230, 0.9)' : 
              serverStatus === 'checking' ? 'rgba(255, 249, 230, 0.9)' : 'rgba(248, 215, 218, 0.9)',
            borderRadius: '5px',
            fontSize: '14px',
            color: 
              serverStatus === 'connected' ? '#2e7d32' : 
              serverStatus === 'checking' ? '#856404' : '#721c24'
          }}>
            {serverStatus === 'connected' && '✅ Connected to server'}
            {serverStatus === 'checking' && '⏳ Checking server connection...'}
            {serverStatus === 'disconnected' && '❌ Cannot connect to server. Is it running?'}
            {serverStatus === 'error' && '⚠️ Server is responding but with errors'}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ffffff' }}>
                Student ID:
              </label>
              <input
                type="text"
                placeholder="Enter student ID (e.g. S001)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ffffff' }}>
                Semester:
              </label>
              <input
                type="number"
                placeholder="Enter semester number"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
                required
                min="1"
                max="8"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px'
              }}
            >
              {loading ? 'Calculating...' : 'Calculate GPA'}
            </button>

            {error && (
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'rgba(248, 215, 218, 0.9)', 
                color: '#721c24', 
                borderRadius: '4px',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            {gpa !== null && cgpa !== null && (
              <div style={{ 
                padding: '15px', 
                backgroundColor: 'rgba(230, 247, 230, 0.9)', 
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '5px 0', color: '#2e7d32', fontSize: '18px', fontWeight: '600' }}>
                  Semester GPA: {gpa}
                </p>
                <p style={{ margin: '5px 0', color: '#2e7d32', fontSize: '18px', fontWeight: '600' }}>
                  CGPA: {cgpa}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Right side - Target CGPA Predictor */}
        <div style={{ flex: '1' }}>
          {gpa !== null && cgpa !== null ? (
            <TargetCgpaPredictor 
              studentId={studentId} 
              semester={semester} 
              currentCgpa={cgpa}
            />
          ) : (
            <div style={{ 
              backgroundColor: '#10358b',
              borderRadius: '10px',
              padding: '30px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              textAlign: 'center',
              color: '#ffffff'
            }}>
              <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>🎯 Target CGPA Predictor</h2>
              <p>Calculate your GPA first to use the predictor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GpaCalculator;