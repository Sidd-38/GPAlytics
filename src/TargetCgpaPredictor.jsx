import React, { useState, useEffect } from 'react';

const TargetCgpaPredictor = ({ studentId, semester, currentCgpa }) => {
  const [targetCgpa, setTargetCgpa] = useState('');
  const [requiredGpa, setRequiredGpa] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // If currentCgpa changes (from parent), reset requiredGpa and message
  useEffect(() => {
    setRequiredGpa(null);
    setMessage('');
  }, [studentId, semester, currentCgpa]);

  const handlePredict = async (e) => {
    e.preventDefault();
    setRequiredGpa(null);
    setMessage('');
    setLoading(true);

    if (!studentId || !semester) {
      setMessage('Please enter Student ID and Semester above first.');
      setLoading(false);
      return;
    }

    const currCgpa = parseFloat(currentCgpa);
    const tgtCgpa = parseFloat(targetCgpa);

    if (
      isNaN(currCgpa) || isNaN(tgtCgpa) ||
      currCgpa < 0 || currCgpa > 10 ||
      tgtCgpa < 0 || tgtCgpa > 10
    ) {
      setMessage('Please enter valid CGPA values.');
      setLoading(false);
      return;
    }

    // Fetch credits info from backend
    try {
      const response = await fetch('http://localhost:5000/get-credits-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ studentId, semester })
      });
      const data = await response.json();
      if (!data.success) {
        setMessage(data.message || 'Could not fetch credits info.');
        setLoading(false);
        return;
      }
      if (data.isLastSemester) {
        setMessage('🎓 You are in the last semester. No prediction needed!');
        setLoading(false);
        return;
      }
      const { currentTotalCredits, nextSemCredits } = data;
      const required = ((tgtCgpa * (currentTotalCredits + nextSemCredits)) - (currCgpa * currentTotalCredits)) / nextSemCredits;
      setRequiredGpa(required.toFixed(2));
      if (required > 10) {
        setMessage('🚫 The target CGPA is unrealistic for the next semester. Try lowering your target.');
      } else if (required < 0){
        setMessage('🚫 The target CGPA is unrealistic for the next semester. Try increasing your target.');
      }else if (required > 7 && required <=10) {
        setMessage('🎉 You are on track! Keep up the great work!');
      } else if (required < 7) {
        setMessage('👏 You can easily achieve your target CGPA. Stay motivated!');
      } else if (required < 5) {
        setMessage('🎯 Aim Higher. To achieve high CGPA!');
      }else {
        setMessage('');
      }
    } catch (err) {
      setMessage('Failed to fetch credits info from server.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', backgroundColor: '#10358b', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#ffffff', fontSize: '22px' }}>🎯 Target CGPA Predictor</h2>
      <form onSubmit={handlePredict}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#ffffff', marginBottom: '8px', display: 'block' }}>Current CGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={currentCgpa || ''}
            readOnly
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #bbb', 
              backgroundColor: 'rgba(224, 224, 224, 0.9)' 
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#ffffff', marginBottom: '8px', display: 'block' }}>Target CGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={targetCgpa}
            onChange={e => setTargetCgpa(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '6px', 
              border: '1px solid #bbb',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !currentCgpa}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: loading || !currentCgpa ? 'not-allowed' : 'pointer',
            opacity: loading || !currentCgpa ? 0.7 : 1
          }}
        >
          {loading ? 'Calculating...' : 'Predict Required GPA'}
        </button>

        {requiredGpa !== null && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: requiredGpa > 10 || requiredGpa < 0 ? 'rgba(255, 100, 100, 0.9)' : 'rgba(230, 247, 230, 0.9)', 
            borderRadius: '6px', 
            textAlign: 'center',
            marginTop: '25px',
            marginBottom: '15px',
            border: requiredGpa > 10 || requiredGpa < 0 ? '2px solid #8B0000' : '2px solid #2e7d32',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ 
              margin: '5px 0', 
              color: requiredGpa > 10 || requiredGpa < 0 ? '#8B0000' : '#2e7d32', 
              fontSize: '20px', 
              fontWeight: '600' 
            }}>
              Required GPA in next semester: {requiredGpa}
            </p>
            {message && (
              <p style={{ 
                margin: '10px 0 5px 0', 
                color: requiredGpa > 10 || requiredGpa < 0 ? '#8B0000' : '#2e7d32', 
                fontSize: '16px', 
                fontWeight: '500' 
              }}>
                {message}
              </p>
            )}
          </div>
        )}

      </form>
    </div>
  );
};

export default TargetCgpaPredictor;