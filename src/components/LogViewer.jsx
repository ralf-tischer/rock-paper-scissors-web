import React, { useState } from 'react';

// LogViewer component to display logs on the screen
const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  // Function to add a new log message
  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  // Expose the addLog function globally so it can be called from anywhere in the app
  window.addLog = addLog;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, backgroundColor: 'white', color: 'black', maxWidth: '100%', maxHeight: '50%', overflow: 'auto', zIndex: 1000 }}>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default LogViewer;