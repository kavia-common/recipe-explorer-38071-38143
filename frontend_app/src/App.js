import React, { useState, useEffect } from 'react';
import './App.css';

// Simple, lightweight Sign In screen based on the provided Figma HTML/CSS assets.
// This avoids heavy demo assets and reduces memory footprint during development.

// PUBLIC_INTERFACE
export function SignIn() {
  /** Render a Sign In UI inspired by the Figma assets provided. */
  return (
    <div className="figma-screen" id="screen-sign-in-11-235" style={{ width: 375, minHeight: 812, background: 'var(--style-10-background-color)', margin: '0 auto', position: 'relative' }}>
      {/* Title */}
      <div className="abs rel" style={{ left: 30, top: 94, width: 315, height: 75 }}>
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 200,
            height: 45,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '30px',
            fontWeight: 600,
            lineHeight: '45px',
            letterSpacing: 0,
            textAlign: 'left',
            color: 'var(--color-000000)',
          }}
        >
          Hello,
        </p>
        <p
          className="abs"
          style={{
            left: 0,
            top: 45,
            width: 250,
            height: 30,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: 0,
            textAlign: 'left',
            color: 'var(--color-121212)',
          }}
        >
          Welcome Back!
        </p>
      </div>

      {/* Email input (non-functional placeholder layout faithful to design) */}
      <div className="abs rel" style={{ left: 30, top: 226, width: 315, height: 81 }}>
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 100,
            height: 21,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '21px',
            letterSpacing: 0,
            textAlign: 'left',
            color: 'var(--color-121212)',
          }}
        >
          Email
        </p>
        <div
          className="abs"
          style={{
            left: 0,
            top: 26,
            width: 315,
            height: 55,
            background: 'var(--color-ffffff)',
            border: '1.5px solid var(--style-30-border-color)',
            borderRadius: '10px',
          }}
        />
        <input
          aria-label="Email"
          placeholder="Enter Email"
          style={{
            position: 'absolute',
            left: 20,
            top: 36,
            width: 275,
            height: 35,
            margin: 0,
            border: 'none',
            outline: 'none',
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '13px',
            background: 'transparent',
            color: 'var(--color-130f26)',
          }}
        />
      </div>

      {/* Password input */}
      <div className="abs rel" style={{ left: 30, top: 337, width: 315, height: 81 }}>
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 150,
            height: 21,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '21px',
            textAlign: 'left',
            color: 'var(--color-121212)',
          }}
        >
          Enter Password
        </p>
        <div
          className="abs"
          style={{
            left: 0,
            top: 26,
            width: 315,
            height: 55,
            background: 'var(--color-ffffff)',
            border: '1.5px solid var(--style-30-border-color)',
            borderRadius: '10px',
          }}
        />
        <input
          type="password"
          aria-label="Password"
          placeholder="Enter Password"
          style={{
            position: 'absolute',
            left: 20,
            top: 36,
            width: 275,
            height: 35,
            margin: 0,
            border: 'none',
            outline: 'none',
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '13px',
            background: 'transparent',
            color: 'var(--color-130f26)',
          }}
        />
      </div>

      {/* Forgot Password */}
      <div className="abs rel" style={{ left: 40, top: 438, width: 200, height: 17 }}>
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 160,
            height: 17,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: '16.5px',
            textAlign: 'center',
            color: 'var(--color-ff9c00)',
            cursor: 'pointer',
          }}
          onClick={() => console.log('Forgot Password clicked')}
        >
          Forgot Password?
        </p>
      </div>

      {/* CTA Button */}
      <button
        id="big-button-54-668"
        className="abs"
        style={{
          left: 30,
          top: 480,
          width: 315,
          height: 60,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: 'var(--style-11-background-color)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          color: 'var(--color-ffffff)',
          fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: 16,
          fontWeight: 600,
        }}
        onClick={() => console.log('Sign In clicked')}
      >
        Sign In
        <span aria-hidden="true" style={{ display: 'inline-block', width: 20, height: 20, position: 'relative', marginLeft: 6 }}>
          <span style={{ position: 'absolute', left: 3, top: 9, width: 14, height: 2, background: '#ffffff' }} />
          <span style={{ position: 'absolute', left: 9, top: 4, width: 2, height: 12, background: '#ffffff', transform: 'skewX(-30deg)' }} />
        </span>
      </button>

      {/* Or Sign in With */}
      <div className="abs rel" style={{ left: 90, top: 560, width: 195, height: 17 }}>
        <div className="abs" style={{ left: 0, top: 9, width: 50, height: 0, borderTop: '1px solid var(--style-28-border-color)' }} />
        <div className="abs" style={{ left: 145, top: 9, width: 50, height: 0, borderTop: '1px solid var(--style-28-border-color)' }} />
        <p
          className="abs"
          style={{
            left: 57,
            top: 0,
            width: 110,
            height: 17,
            margin: 0,
            fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
            fontSize: '11px',
            fontWeight: 500,
            lineHeight: '16.5px',
            textAlign: 'left',
            color: 'var(--color-d9d9d9)',
          }}
        >
          Or Sign in With
        </p>
      </div>

      {/* Social buttons (placeholders) */}
      <div className="abs rel" style={{ left: 131, top: 597, width: 44, height: 44 }}>
        <div
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 44,
            height: 44,
            background: 'var(--style-126-background-color)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-0)',
          }}
        />
        <div className="abs rel" aria-hidden="true" style={{ left: 10, top: 10, width: 24, height: 24 }}>
          <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, borderRadius: 4, background: 'var(--color-d9d9d9)' }} />
        </div>
      </div>

      <div className="abs rel" style={{ left: 200, top: 597, width: 44, height: 44 }}>
        <div
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 44,
            height: 44,
            background: 'var(--style-126-background-color)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-0)',
          }}
        />
        <div className="abs rel" aria-hidden="true" style={{ left: 10, top: 10, width: 24, height: 24 }}>
          <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, borderRadius: 4, background: 'var(--color-d9d9d9)' }} />
        </div>
      </div>

      {/* Footer text */}
      <p
        id="text-13-67"
        className="abs"
        style={{
          left: 60,
          top: 696,
          width: 255,
          height: 17,
          margin: 0,
          fontFamily: 'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: '11px',
          fontWeight: 500,
          lineHeight: '16.5px',
          textAlign: 'left',
          color: 'var(--color-000000)',
        }}
      >
        Don’t have an account? Sign up
      </p>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root app which currently renders the Sign In screen. */
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
