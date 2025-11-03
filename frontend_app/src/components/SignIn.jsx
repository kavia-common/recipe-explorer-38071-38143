import React, { useEffect } from 'react';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * Render a pixel-accurate Sign In screen adapted from assets/sign-in-11-235.html.
 * Loads shared and screen-specific CSS from /assets and binds minimal interactions
 * equivalent to assets/sign-in-11-235.js (console log on Sign In click/enter/space).
 */
export default function SignIn() {
  useEffect(() => {
    // Helper to inject stylesheet link if not already present
    const ensureLink = (href) => {
      let link = document.querySelector(`link[data-dynamic-style="${href}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.setAttribute('data-dynamic-style', href);
        link.href = href;
        document.head.appendChild(link);
      }
    };

    // Inject common and screen styles (kept persistent; no cleanup to avoid flicker)
    ensureLink('/assets/common.css');
    ensureLink('/assets/sign-in-11-235.css');

    // Minimal interaction from assets/sign-in-11-235.js
    const btn = document.getElementById('big-button-54-668');
    const onAction = () => {
      // eslint-disable-next-line no-console
      console.log('Sign In clicked');
    };
    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onAction();
      }
    };

    if (btn) {
      btn.addEventListener('click', onAction);
      btn.addEventListener('keydown', keyHandler);
    }

    // Cleanup listeners on unmount
    return () => {
      if (btn) {
        btn.removeEventListener('click', onAction);
        btn.removeEventListener('keydown', keyHandler);
      }
    };
  }, []);

  return (
    <div
      id="screen-sign-in-11-235"
      className="figma-screen"
      style={{
        width: 375,
        height: 812,
        background: 'var(--style-10-background-color)',
        margin: '0 auto',
      }}
    >
      {/* Group: Title */}
      <div id="group-13-110" className="abs rel" style={{ left: 30, top: 94, width: 155, height: 75 }}>
        {/* Text: Hello, */}
        <p
          className="abs text-12-29"
          style={{
            left: 0,
            top: 0,
            width: 84,
            height: 45,
            margin: 0,
            fontFamily: 'var(--typo-60-family)',
            fontSize: 'var(--typo-60-size)',
            fontWeight: 'var(--typo-60-weight)',
            lineHeight: 'var(--typo-60-line-height)',
            letterSpacing: 'var(--typo-60-letter-spacing)',
            textAlign: 'var(--typo-60-text-align)',
            color: 'var(--typo-60-color)',
          }}
        >
          Hello,
        </p>
        {/* Text: Welcome Back! */}
        <p
          className="abs text-12-30"
          style={{
            left: 0,
            top: 45,
            width: 155,
            height: 30,
            margin: 0,
            fontFamily: 'var(--typo-61-family)',
            fontSize: 'var(--typo-61-size)',
            fontWeight: 'var(--typo-61-weight)',
            lineHeight: 'var(--typo-61-line-height)',
            letterSpacing: 'var(--typo-61-letter-spacing)',
            textAlign: 'var(--typo-61-text-align)',
            color: 'var(--typo-61-color)',
          }}
        >
          Welcome Back!
        </p>
      </div>

      {/* Input field (Email) */}
      <div id="component-30-585" className="abs rel" style={{ left: 30, top: 226, width: 315, height: 81 }}>
        {/* Label */}
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 38,
            height: 21,
            margin: 0,
            fontFamily: 'var(--typo-66-family)',
            fontSize: 'var(--typo-66-size)',
            fontWeight: 'var(--typo-66-weight)',
            lineHeight: 'var(--typo-66-line-height)',
            letterSpacing: 'var(--typo-66-letter-spacing)',
            textAlign: 'var(--typo-66-text-align)',
            color: 'var(--typo-66-color)',
          }}
        >
          Email
        </p>
        {/* Rectangle */}
        <div
          className="abs"
          style={{
            left: 0,
            top: 26,
            width: 315,
            height: 55,
            background: 'var(--color-ffffff)',
            border: 'var(--style-30-border-width) solid var(--style-30-border-color)',
            borderRadius: 'var(--style-30-border-radius)',
          }}
        />
        {/* Placeholder using input for accessibility, matching position */}
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
            fontFamily: 'var(--typo-65-family)',
            fontSize: 'var(--typo-65-size)',
            fontWeight: 'var(--typo-65-weight)',
            lineHeight: 'var(--typo-65-line-height)',
            letterSpacing: 'var(--typo-65-letter-spacing)',
            textAlign: 'var(--typo-65-text-align)',
            color: 'var(--typo-65-color)',
            background: 'transparent',
          }}
        />
      </div>

      {/* Input field (Password) */}
      <div id="component-30-590" className="abs rel" style={{ left: 30, top: 337, width: 315, height: 81 }}>
        {/* Label */}
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 107,
            height: 21,
            margin: 0,
            fontFamily: 'var(--typo-66-family)',
            fontSize: 'var(--typo-66-size)',
            fontWeight: 'var(--typo-66-weight)',
            lineHeight: 'var(--typo-66-line-height)',
            letterSpacing: 'var(--typo-66-letter-spacing)',
            textAlign: 'var(--typo-66-text-align)',
            color: 'var(--typo-66-color)',
          }}
        >
          Enter Password
        </p>
        {/* Rectangle */}
        <div
          className="abs"
          style={{
            left: 0,
            top: 26,
            width: 315,
            height: 55,
            background: 'var(--color-ffffff)',
            border: 'var(--style-30-border-width) solid var(--style-30-border-color)',
            borderRadius: 'var(--style-30-border-radius)',
          }}
        />
        {/* Placeholder using input for accessibility */}
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
            fontFamily: 'var(--typo-65-family)',
            fontSize: 'var(--typo-65-size)',
            fontWeight: 'var(--typo-65-weight)',
            lineHeight: 'var(--typo-65-line-height)',
            letterSpacing: 'var(--typo-65-letter-spacing)',
            textAlign: 'var(--typo-65-text-align)',
            color: 'var(--typo-65-color)',
            background: 'transparent',
          }}
        />
      </div>

      {/* Forgot Password */}
      <div id="group-12-91" className="abs rel" style={{ left: 40, top: 438, width: 97, height: 17 }}>
        <p
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 97,
            height: 17,
            margin: 0,
            fontFamily: 'var(--typo-62-family)',
            fontSize: 'var(--typo-62-size)',
            fontWeight: 'var(--typo-62-weight)',
            lineHeight: 'var(--typo-62-line-height)',
            letterSpacing: 'var(--typo-62-letter-spacing)',
            textAlign: 'var(--typo-62-text-align)',
            color: 'var(--typo-62-color)',
            cursor: 'pointer',
          }}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('Forgot Password? clicked');
          }}
        >
          Forgot Password?
        </p>
      </div>

      {/* Or Sign in With line */}
      <div id="group-12-139" className="abs rel" style={{ left: 90, top: 560, width: 195, height: 17 }}>
        {/* Left line */}
        <div
          className="abs"
          style={{
            left: 0,
            top: 9,
            width: 50,
            height: 0,
            borderTop: 'var(--style-28-border-width) solid var(--style-28-border-color)',
          }}
        />
        {/* Right line */}
        <div
          className="abs"
          style={{
            left: 145,
            top: 9,
            width: 50,
            height: 0,
            borderTop: 'var(--style-28-border-width) solid var(--style-28-border-color)',
          }}
        />
        {/* Text */}
        <p
          className="abs"
          style={{
            left: 57,
            top: 0,
            width: 81,
            height: 17,
            margin: 0,
            fontFamily: 'var(--typo-64-family)',
            fontSize: 'var(--typo-64-size)',
            fontWeight: 'var(--typo-64-weight)',
            lineHeight: 'var(--typo-64-line-height)',
            letterSpacing: 'var(--typo-64-letter-spacing)',
            textAlign: 'var(--typo-64-text-align)',
            color: 'var(--typo-64-color)',
          }}
        >
          Or Sign in With
        </p>
      </div>

      {/* Social Button: Google */}
      <div id="button-13-35" className="abs rel" style={{ left: 131, top: 597, width: 44, height: 44 }}>
        <div
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 44,
            height: 44,
            background: 'var(--style-126-background-color)',
            borderRadius: 'var(--style-126-border-radius)',
            boxShadow: 'var(--style-126-shadow)',
          }}
        />
        {/* Google icon placeholder from simplified HTML; original references SVGs not present in assets/figmaimages */}
        <div className="abs rel" aria-hidden="true" style={{ left: 10, top: 10, width: 24, height: 24 }}>
          <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, borderRadius: 4, background: 'var(--color-d9d9d9)' }} />
        </div>
      </div>

      {/* Social Button: Facebook */}
      <div id="button-13-49" className="abs rel" style={{ left: 200, top: 597, width: 44, height: 44 }}>
        <div
          className="abs"
          style={{
            left: 0,
            top: 0,
            width: 44,
            height: 44,
            background: 'var(--style-126-background-color)',
            borderRadius: 'var(--style-126-border-radius)',
            boxShadow: 'var(--style-126-shadow)',
          }}
        />
        {/* Facebook placeholder */}
        <div className="abs rel" aria-hidden="true" style={{ left: 10, top: 10, width: 24, height: 24 }}>
          <div style={{ position: 'absolute', left: 2, top: 2, width: 20, height: 20, borderRadius: 4, background: 'var(--color-d9d9d9)' }} />
        </div>
      </div>

      {/* CTA Big Button */}
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
          borderRadius: 'var(--style-11-border-radius)',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--typo-58-family)',
            fontSize: 'var(--typo-58-size)',
            fontWeight: 'var(--typo-58-weight)',
            lineHeight: 'var(--typo-58-line-height)',
            color: 'var(--typo-58-color)',
          }}
        >
          Sign In
        </span>
        {/* Right arrow icon placeholder */}
        <span aria-hidden="true" style={{ display: 'inline-block', width: 20, height: 20, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 3, top: 9, width: 14, height: 2, background: '#ffffff' }} />
          <span style={{ position: 'absolute', left: 9, top: 4, width: 2, height: 12, background: '#ffffff', transform: 'skewX(-30deg)' }} />
        </span>
      </button>

      {/* Don't have account */}
      <p
        id="text-13-67"
        className="abs"
        style={{
          left: 99,
          top: 696,
          width: 177,
          height: 17,
          margin: 0,
          fontFamily: 'var(--typo-63-family)',
          fontSize: 'var(--typo-63-size)',
          fontWeight: 'var(--typo-63-weight)',
          lineHeight: 'var(--typo-63-line-height)',
          letterSpacing: 'var(--typo-63-letter-spacing)',
          textAlign: 'var(--typo-63-text-align)',
          color: 'var(--typo-63-color)',
        }}
      >
        Don’t have an account? Sign up
      </p>

      {/* Status Bar */}
      <div id="component-13-71" className="abs rel" style={{ left: 0, top: 0, width: 375, height: 44 }}>
        {/* Time */}
        <div className="abs rel" style={{ left: 0, top: 12, width: 180, height: 22 }}>
          <p
            className="abs"
            style={{
              left: 29.5,
              top: 2,
              width: 37,
              height: 18,
              margin: 0,
              fontFamily: 'var(--typo-67-family)',
              fontSize: 'var(--typo-67-size)',
              fontWeight: 'var(--typo-67-weight)',
              lineHeight: 'var(--typo-67-line-height)',
              letterSpacing: 'var(--typo-67-letter-spacing)',
              textAlign: 'var(--typo-67-text-align)',
              color: 'var(--typo-67-color)',
            }}
          >
            19:27
          </p>
        </div>

        {/* Right side symbols simplified */}
        <div className="abs rel" style={{ left: 293.5, top: 16.6, width: 68, height: 13 }}>
          {/* Battery container */}
          <div className="abs rel" style={{ left: 42.5, top: 0.76, width: 24.5, height: 11.5 }}>
            <div className="abs" style={{ left: 0, top: 0, width: 24.5, height: 11.5, background: 'rgba(48,48,48,0.4)' }} />
            <div className="abs" style={{ left: 0, top: 0, width: 22, height: 11.5, background: 'var(--color-dadada)' }} />
            <div className="abs" style={{ left: 2, top: 1, width: 20, height: 9.5, background: 'var(--color-000000)' }} />
            <div className="abs" style={{ left: 23, top: 3.69, width: 1.5, height: 4, background: 'var(--color-000000)' }} />
          </div>
          {/* Cell signal bars */}
          <div className="abs rel" style={{ left: 0, top: 1.6, width: 17.1, height: 10.7 }}>
            <div className="abs" style={{ left: 0, top: 6.7, width: 3, height: 4, background: 'var(--color-000000)', borderRadius: 1.2 }} />
            <div className="abs" style={{ left: 4.8, top: 4.7, width: 3, height: 6, background: 'var(--color-000000)', borderRadius: 1.2 }} />
            <div className="abs" style={{ left: 9.4, top: 2.4, width: 3, height: 8.3, background: 'var(--color-000000)', borderRadius: 1.2 }} />
            <div className="abs" style={{ left: 14.1, top: 0, width: 3, height: 10.7, background: 'var(--color-000000)', borderRadius: 1.2 }} />
          </div>
          {/* Wi-Fi arcs simplified */}
          <div className="abs rel" style={{ left: 22.1, top: 1.4, width: 15.4, height: 11.06 }}>
            <div className="abs" style={{ left: 0, top: 0, width: 15.4, height: 4.783, background: 'var(--color-000000)', opacity: 0.6 }} />
            <div className="abs" style={{ left: 2.685, top: 3.826, width: 10.032, height: 3.664, background: 'var(--color-000000)', opacity: 0.6 }} />
            <div className="abs" style={{ left: 5.368, top: 7.655, width: 4.665, height: 3.403, background: 'var(--color-000000)', opacity: 0.6 }} />
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div id="component-42-614" className="abs rel" style={{ left: 0, top: 778, width: 375, height: 34 }}>
        <div
          className="abs"
          style={{
            left: 120,
            top: 21,
            width: 135,
            height: 5,
            background: 'var(--style-32-background-color)',
            borderRadius: 'var(--style-32-border-radius)',
          }}
        />
      </div>
    </div>
  );
}
