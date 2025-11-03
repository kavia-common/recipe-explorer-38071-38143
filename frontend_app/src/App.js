import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from './components/SignIn.jsx';

// PUBLIC_INTERFACE
/**
 * Root app rendering the Sign In screen by default.
 * Theme toggle is preserved for preview convenience.
 * @returns {JSX.Element} Application root component.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <SignIn />
      </header>
    </div>
  );
}

export default App;
