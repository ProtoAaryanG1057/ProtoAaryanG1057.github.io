import React from 'react';

/**
 * FORM / FIELD — WebGL Fallback View
 * High-precision vector schematic rendered when WebGL is unavailable or disabled.
 */
export function WebGLFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121519',
        border: '1px solid var(--color-border)',
        position: 'relative',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      {/* Background CAD crosshairs */}
      <svg
        viewBox="0 0 500 500"
        style={{
          width: '80%',
          maxWidth: '380px',
          height: 'auto',
          filter: 'drop-shadow(0 0 20px rgba(158, 220, 255, 0.15))'
        }}
      >
        <circle cx="250" cy="250" r="180" fill="none" stroke="#24272B" strokeWidth="2" strokeDasharray="6,4" />
        <ellipse cx="250" cy="250" rx="140" ry="80" fill="none" stroke="#B7B8B5" strokeWidth="2.5" transform="rotate(-30 250 250)" />
        <ellipse cx="250" cy="250" rx="140" ry="80" fill="none" stroke="#9EDCFF" strokeWidth="2" transform="rotate(45 250 250)" />
        <path d="M 120 180 Q 250 340 380 200" fill="none" stroke="#F2F0EA" strokeWidth="3" />
        <circle cx="250" cy="250" r="16" fill="#181B20" stroke="#9EDCFF" strokeWidth="2" />
        <circle cx="250" cy="250" r="6" fill="#9EDCFF" />
        <line x1="50" y1="250" x2="450" y2="250" stroke="#24272B" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="250" y1="50" x2="250" y2="450" stroke="#24272B" strokeWidth="1" strokeDasharray="4,4" />
      </svg>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p className="mono-label" style={{ color: 'var(--color-ice-blue)' }}>
          SCHEMATIC FALLBACK · HARDWARE ACCELERATION STANDBY
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.4rem' }}>
          Interactive 3D viewport paused or WebGL unavailable. All engineering content is accessible below.
        </p>
      </div>
    </div>
  );
}
