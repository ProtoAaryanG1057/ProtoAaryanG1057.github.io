import React, { useState, useEffect } from 'react';

/**
 * PROTO — Dark Basketball Court Background with Floor-Level Courtside Perspective
 *
 * The camera is seated near the court at floor level, looking slightly upward
 * such that the 10-foot regulation hoop towers high above the viewer in the upper right.
 * The ball is launched in a soaring cross-court arc from the far end (left)
 * towards the towering hoop, descending cleanly through the rim and net right above the viewer.
 */
export function BasketballCourtBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trajectory Waypoints (viewBox 1920 x 1080):
  // P0: Shot release point at the other end of the half-court near floor level (left)
  // P1: Shot apex soaring high into the upper arena
  // P2: Towering right rim entry (high above viewer at y=265)
  // P3: Swish exit through bottom of net
  const p0 = { x: 180, y: 740 };
  const p1 = { x: 780, y: -180 };
  const p2 = { x: 1450, y: 265 };
  const p3 = { x: 1450, y: 415 };

  let ballX, ballY, ballScale, netStretch = 0;

  if (scrollProgress <= 0.85) {
    // Flight trajectory skyward to the towering rim (0.0 to 0.85 normalized to 0.0 to 1.0)
    const t = scrollProgress / 0.85;
    // Quadratic Bezier interpolation: B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
    ballX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    ballY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    // Depth scaling: starts at 0.82x on the court floor, swells to ~1.35x at apex, tapers to 0.88x at high rim
    ballScale = 0.82 + 0.45 * Math.sin(t * Math.PI) - 0.02 * t;
  } else {
    // Swish descent through the high hoop and net (0.85 to 1.0 normalized to 0.0 to 1.0)
    const t = (scrollProgress - 0.85) / 0.15;
    ballX = p2.x;
    ballY = p2.y + t * (p3.y - p2.y);
    ballScale = 0.88 - t * 0.08;
    netStretch = Math.sin(t * Math.PI) * 18; // Net expands as ball pushes through
  }

  // Realistic counter-clockwise backspin in side view
  const ballRotation = -scrollProgress * 1080;

  // Vertical downward offset for the entire basketball setup (court, hoop stanchion, trajectory, and ball)
  // Shifted up to 90px to keep the setup well-proportioned while ensuring the ball stays within the frame
  const SETUP_OFFSET_Y = 90;

  return (
    <div
      className="basketball-bg-container"
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="basketball-court-svg"
      >
        <defs>
          {/* Dark Arena Floor Radial Glow */}
          <radialGradient id="courtGlow" cx="50%" cy="80%" r="75%">
            <stop offset="0%" stopColor="#251E17" stopOpacity="0.96" />
            <stop offset="40%" stopColor="#171920" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#08090C" stopOpacity="0.99" />
          </radialGradient>

          {/* Hardwood Flooring Linear Undertone */}
          <linearGradient id="hardwoodBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14171D" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#292019" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#201813" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#2B211A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14171D" stopOpacity="0.85" />
          </linearGradient>

          {/* Paint Area (Key) Tint Gradient */}
          <linearGradient id="paintGlow" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E85D04" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#E85D04" stopOpacity="0.05" />
          </linearGradient>

          {/* Basketball 3D Texture & Shading */}
          <radialGradient id="ballShading" cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#FFB35C" />
            <stop offset="25%" stopColor="#FA7921" />
            <stop offset="60%" stopColor="#D84A00" />
            <stop offset="88%" stopColor="#962A00" />
            <stop offset="100%" stopColor="#4A1200" />
          </radialGradient>

          {/* Rim Metallic Gradient */}
          <linearGradient id="rimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFAA00" />
            <stop offset="45%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#CC2200" />
          </linearGradient>

          {/* Net String Gradient */}
          <linearGradient id="netGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#8C96A4" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Base Full Viewport Floor Fill */}
        <rect x="-100" y="-100" width="2120" height="1280" fill="url(#courtGlow)" />

        {/* ========================================================================= */}
        {/* SHIFTED BASKETBALL SETUP: COURT, HOOP ASSEMBLY, BALL & RIM                */}
        {/* ========================================================================= */}
        <g id="basketball-setup" transform={`translate(0, ${SETUP_OFFSET_Y})`}>
          <g id="court-geometry">
            {/* Out-of-bounds Apron Perimeter at Floor Level */}
            <polygon
              points="230,570 1740,570 1900,1050 0,1050"
              fill="#0D0F13"
              stroke="rgba(158, 220, 255, 0.12)"
              strokeWidth="1.5"
            />

          {/* Hardwood Half-Court Playing Surface (Floor Level View) */}
          <polygon
            points="280,620 1680,620 1840,1000 60,1000"
            fill="url(#hardwoodBase)"
          />

          {/* Hardwood Plank Lines (Floor level perspective with steep foreshortening) */}
          <g stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1">
            {Array.from({ length: 14 }).map((_, i) => {
              const prog = i / 13;
              // Non-linear power spacing for realistic floor-level perspective
              const p = Math.pow(prog, 1.4);
              const yLeft = 620 + p * (1000 - 620);
              const xLeft = 280 - p * (280 - 60);
              const xRight = 1680 + p * (1840 - 1680);
              return (
                <line
                  key={`plank-${i}`}
                  x1={xLeft}
                  y1={yLeft}
                  x2={xRight}
                  y2={yLeft}
                />
              );
            })}
          </g>

          {/* ========================================================= */}
          {/* FLOOR COURT MARKINGS (Low Perspective on Ground Level)    */}
          {/* ========================================================= */}

          {/* 1. Playing Boundary Lines (Sidelines, Baseline, Half-Court Line) */}
          <polygon
            points="280,620 1680,620 1840,1000 60,1000"
            fill="none"
            stroke="rgba(158, 220, 255, 0.3)"
            strokeWidth="3.5"
          />

          {/* 2. Half-Court Line (Far Left on Floor) */}
          <line
            x1="280"
            y1="620"
            x2="60"
            y2="1000"
            stroke="rgba(158, 220, 255, 0.38)"
            strokeWidth="4"
          />

          {/* 3. Center Court Restraining Circle (Extending into the Half Court) */}
          <g>
            {/* Center Circle Outer Arc */}
            <ellipse
              cx="170"
              cy="810"
              rx="140"
              ry="32"
              fill="none"
              stroke="rgba(158, 220, 255, 0.3)"
              strokeWidth="3"
            />
            {/* Center Circle Inner Jump Arc */}
            <ellipse
              cx="170"
              cy="810"
              rx="48"
              ry="11"
              fill="rgba(244, 140, 6, 0.08)"
              stroke="rgba(244, 140, 6, 0.35)"
              strokeWidth="2.2"
            />
          </g>

          {/* 4. The Key / Paint (Lane) on the Floor */}
          <polygon
            points="1810,890 1040,865 1040,715 1710,680"
            fill="url(#paintGlow)"
            stroke="rgba(244, 140, 6, 0.38)"
            strokeWidth="3.2"
          />

          {/* Free Throw Line */}
          <line
            x1="1040"
            y1="715"
            x2="1040"
            y2="865"
            stroke="rgba(244, 140, 6, 0.5)"
            strokeWidth="3.8"
          />

          {/* Free Throw Circle (Top of the Key) */}
          {/* Outer Solid Arc (Facing toward half-court) */}
          <path
            d="M 1040 715 A 130 30 0 0 0 1040 865"
            fill="none"
            stroke="rgba(244, 140, 6, 0.38)"
            strokeWidth="3"
          />
          {/* Inner Dashed Arc (Inside paint) */}
          <path
            d="M 1040 715 A 130 30 0 0 1 1040 865"
            fill="none"
            stroke="rgba(244, 140, 6, 0.22)"
            strokeWidth="2.2"
            strokeDasharray="9,7"
          />

          {/* Key Lane Hash Marks */}
          <line x1="1540" y1="688" x2="1540" y2="676" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1410" y1="696" x2="1410" y2="684" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1280" y1="704" x2="1280" y2="692" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1150" y1="710" x2="1150" y2="698" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />

          <line x1="1540" y1="882" x2="1540" y2="894" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1410" y1="878" x2="1410" y2="890" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1280" y1="874" x2="1280" y2="886" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />
          <line x1="1150" y1="869" x2="1150" y2="881" stroke="rgba(244, 140, 6, 0.4)" strokeWidth="3" />

          {/* Restricted Area Arc directly under the hoop projection */}
          <path
            d="M 1520 778 A 50 12 0 0 0 1520 802"
            fill="none"
            stroke="rgba(244, 140, 6, 0.35)"
            strokeWidth="2.5"
          />

          {/* 5. 3-POINT LINE (Concentric with basket, wrapping around key & free throw circle) */}
          <path
            d="M 1700 645 L 1420 645 C 960 645, 680 700, 680 790 C 680 880, 960 960, 1470 960 L 1830 960"
            fill="none"
            stroke="rgba(244, 140, 6, 0.45)"
            strokeWidth="3.6"
          />

          {/* ========================================================= */}
          {/* ULTRA-STURDY HEAVY-DUTY ARENA HOOP STANCHION (TOWERING)   */}
          {/* ========================================================= */}
          <g id="towering-hoop-assembly">
            {/* 1. Heavy Counterweighted Base Chassis with Thick Safety Impact Padding */}
            {/* Main Ballast Body */}
            <polygon
              points="1740,865 1920,865 1920,705 1780,705"
              fill="#11141A"
              stroke="#222B38"
              strokeWidth="2.5"
            />
            {/* Beveled Front Crash Padding facing baseline */}
            <polygon
              points="1730,865 1775,865 1810,705 1765,705"
              fill="#181D26"
              stroke="#2B3648"
              strokeWidth="2.5"
            />
            {/* High-Vis Arena Safety Line along base footing */}
            <line x1="1735" y1="863" x2="1900" y2="863" stroke="rgba(244, 140, 6, 0.75)" strokeWidth="4" />
            {/* Heavy Base Anchor Clamps / Outrigger Feet */}
            <rect x="1745" y="860" width="30" height="10" fill="#090C10" stroke="#374358" strokeWidth="1.5" rx="1.5" />
            <rect x="1840" y="860" width="35" height="10" fill="#090C10" stroke="#374358" strokeWidth="1.5" rx="1.5" />

            {/* 2. Reinforced Dual-Mast Upright Pylons (Steel Box-Columns with Lattice Bracing) */}
            {/* Rear Heavy Mast Pylon */}
            <line x1="1875" y1="735" x2="1825" y2="155" stroke="#13171F" strokeWidth="18" strokeLinecap="round" />
            {/* Front Heavy Mast Pylon */}
            <line x1="1820" y1="735" x2="1760" y2="155" stroke="#1D232E" strokeWidth="22" strokeLinecap="round" />

            {/* Internal Heavy Steel Cross-Lattice & Gusset Plates */}
            <g stroke="#262E3D" strokeWidth="5" strokeLinecap="round">
              <line x1="1820" y1="670" x2="1870" y2="610" />
              <line x1="1870" y1="670" x2="1815" y2="610" />
              <line x1="1810" y1="550" x2="1860" y2="490" />
              <line x1="1860" y1="550" x2="1805" y2="490" />
              <line x1="1800" y1="430" x2="1850" y2="370" />
              <line x1="1850" y1="430" x2="1795" y2="370" />
              <line x1="1790" y1="310" x2="1840" y2="250" />
              <line x1="1840" y1="310" x2="1785" y2="250" />
              {/* Horizontal tie bars */}
              <line x1="1810" y1="610" x2="1870" y2="610" strokeWidth="6" stroke="#2D374A" />
              <line x1="1800" y1="490" x2="1860" y2="490" strokeWidth="6" stroke="#2D374A" />
              <line x1="1790" y1="370" x2="1850" y2="370" strokeWidth="6" stroke="#2D374A" />
              <line x1="1780" y1="250" x2="1840" y2="250" strokeWidth="6" stroke="#2D374A" />
            </g>

            {/* Heavy-Duty Welded Knuckle Joint Plate at Elbow */}
            <polygon
              points="1745,175 1835,145 1845,190 1755,200"
              fill="#181D26"
              stroke="#333E52"
              strokeWidth="3"
            />
            {/* Industrial Pivot Pin Bosses */}
            <circle cx="1760" cy="165" r="7" fill="#2E3747" stroke="#9EDCFF" strokeWidth="1.5" />
            <circle cx="1820" cy="155" r="6" fill="#2E3747" stroke="#7A8699" strokeWidth="1.5" />

            {/* 3. Four-Bar Parallelogram Cantilever Extension Boom */}
            {/* Lower Parallel Stabilizer Arm */}
            <line x1="1775" y1="230" x2="1530" y2="280" stroke="#161B24" strokeWidth="14" strokeLinecap="round" />
            {/* Upper Main Box-Beam Boom */}
            <line x1="1760" y1="165" x2="1530" y2="215" stroke="#202734" strokeWidth="20" strokeLinecap="round" />
            {/* Boom Internal Truss Bracing */}
            <line x1="1710" y1="180" x2="1670" y2="250" stroke="#2A3344" strokeWidth="6" strokeLinecap="round" />
            <line x1="1640" y1="195" x2="1600" y2="265" stroke="#2A3344" strokeWidth="6" strokeLinecap="round" />
            <line x1="1570" y1="210" x2="1535" y2="275" stroke="#2A3344" strokeWidth="6" strokeLinecap="round" />

            {/* 4. Massive Hydraulic Lifting Cylinder with Chrome Piston */}
            {/* Hydraulic Cylinder Barrel in Gunmetal */}
            <line x1="1845" y1="670" x2="1730" y2="350" stroke="#1D232E" strokeWidth="18" strokeLinecap="round" />
            {/* End Cap Collar */}
            <line x1="1738" y1="370" x2="1722" y2="330" stroke="#354054" strokeWidth="22" strokeLinecap="butt" />
            {/* Gleaming Chrome-Plated Piston Rod */}
            <line x1="1730" y1="350" x2="1660" y2="215" stroke="#E2E7EE" strokeWidth="11" strokeLinecap="round" />
            {/* Clevis Mount Anchor Pins */}
            <circle cx="1845" cy="670" r="8" fill="#2E3747" stroke="#7A8699" strokeWidth="2" />
            <circle cx="1660" cy="215" r="7" fill="#2E3747" stroke="#9EDCFF" strokeWidth="1.5" />

            {/* 5. Overhead Diagonal Corner Sway Braces (Stabilizer Guy Struts) */}
            <line x1="1740" y1="165" x2="1530" y2="115" stroke="#2E3747" strokeWidth="5" strokeLinecap="round" />
            <line x1="1740" y1="175" x2="1530" y2="140" stroke="#222936" strokeWidth="4" strokeLinecap="round" />

            {/* 6. Heavy Backboard Subframe & Shot Clock Housing */}
            {/* Steel Backboard Frame Structure */}
            <line
              x1="1534"
              y1="105"
              x2="1534"
              y2="315"
              stroke="#1A1F29"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Bottom & Side High-Density Safety Padding */}
            <line
              x1="1534"
              y1="275"
              x2="1534"
              y2="318"
              stroke="#2E3544"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <line
              x1="1534"
              y1="314"
              x2="1534"
              y2="318"
              stroke="#CC2200"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Digital Arena Shot Clock Console mounted on top of backboard */}
            <g id="shot-clock">
              <rect x="1518" y="70" width="30" height="34" rx="3" fill="#0A0C10" stroke="#2F384A" strokeWidth="2" />
              {/* LED Display Screen */}
              <rect x="1522" y="75" width="22" height="24" rx="1.5" fill="#140805" />
              {/* Glowing Red/Orange Shot Clock Digits "24" */}
              <text
                x="1533"
                y="92"
                fill="#FF3B00"
                fontSize="14"
                fontFamily="var(--font-mono)"
                fontWeight="bold"
                textAnchor="middle"
                style={{ filter: 'drop-shadow(0 0 4px #FF3B00)' }}
              >
                24
              </text>
            </g>

            {/* Heavy-Duty Glass Backboard Face */}
            <line
              x1="1530"
              y1="110"
              x2="1530"
              y2="310"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Backboard Inner Target Box in Orange */}
            <line
              x1="1527"
              y1="180"
              x2="1527"
              y2="265"
              stroke="#FF5500"
              strokeWidth="4.5"
            />

            {/* Heavy-Duty Cast Steel Rim Direct-Mount Bracket */}
            <rect x="1510" y="256" width="20" height="14" fill="#1A1F29" stroke="#CC2200" strokeWidth="2" rx="2" />
            <circle cx="1515" cy="263" r="3" fill="#D4DAD6" />
            <circle cx="1524" cy="263" r="3" fill="#D4DAD6" />

            {/* Nylon Net (Hanging down from the high rim toward the viewer) */}
            <g id="target-net" stroke="url(#netGradient)" strokeWidth="2.5" fill="none">
              <path
                d={`
                  M 1406 267
                  Q ${1412 - netStretch} 320 1426 395
                `}
              />
              <path
                d={`
                  M 1434 267
                  Q ${1440 - netStretch * 0.4} 325 1445 400
                `}
              />
              <path
                d={`
                  M 1466 267
                  Q ${1460 + netStretch * 0.4} 325 1455 400
                `}
              />
              <path
                d={`
                  M 1494 267
                  Q ${1488 + netStretch} 320 1474 395
                `}
              />

              {/* Net horizontal woven loop rings */}
              <ellipse cx="1450" cy="300" rx={38 + netStretch * 0.5} ry="11" strokeDasharray="6,4" />
              <ellipse cx="1450" cy="340" rx={28 + netStretch * 0.8} ry="8" strokeDasharray="5,4" />
              <ellipse cx="1450" cy="380" rx={18 + netStretch * 0.4} ry="6" strokeDasharray="4,3" />
            </g>

            {/* Orange Rim (High above, viewed from below with perspective depth) */}
            <ellipse
              cx="1450"
              cy="265"
              rx="46"
              ry="14"
              fill="none"
              stroke="url(#rimGradient)"
              strokeWidth="6.5"
            />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* LAYER 2: BASKETBALL (HEAVED SKYWARD TO TOWERING HOOP, BLURRED ATMOSPHERE) */}
        {/* ========================================================================= */}
        <g
          id="animated-basketball"
          transform={`translate(${ballX}, ${ballY}) scale(${ballScale * 1.15})`}
        >
          {/* Rotating Basketball Body & Leather Seams */}
          <g transform={`rotate(${ballRotation})`}>
            {/* Leather Sphere Base with Precision 3D Radial Shading */}
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="url(#ballShading)"
              stroke="#260A00"
              strokeWidth="1.5"
            />

            {/* Standard 8-Panel Rib Seams */}
            <line x1="-34" y1="0" x2="34" y2="0" stroke="#1A0600" strokeWidth="2.4" />
            <line x1="0" y1="-34" x2="0" y2="34" stroke="#1A0600" strokeWidth="2.4" />
            <path
              d="M -24 -24 Q 5 0 -24 24"
              fill="none"
              stroke="#1A0600"
              strokeWidth="2.2"
            />
            <path
              d="M 24 -24 Q -5 0 24 24"
              fill="none"
              stroke="#1A0600"
              strokeWidth="2.2"
            />

            {/* Specular Light Highlight */}
            <circle cx="-12" cy="-14" r="14" fill="rgba(255, 255, 255, 0.22)" />
          </g>
        </g>

        {/* Front Rim Arc (Renders in front of ball when ball enters the hoop during swish) */}
        {scrollProgress > 0.85 && (
          <path
            d="M 1404 265 A 46 14 0 0 0 1496 265"
            fill="none"
            stroke="url(#rimGradient)"
            strokeWidth="6.5"
          />
        )}
        </g>
      </svg>
    </div>
  );
}
