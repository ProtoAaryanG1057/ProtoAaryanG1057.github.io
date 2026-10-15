/**
 * FORM / FIELD — Central Portfolio Configuration
 *
 * All personal information, brand names, navigation links, and social URLs
 * are centralized here. Edit this file to customize the portfolio identity.
 */

export const siteConfig = {
  // Identity & Branding
  brand: {
    title: "PROTO",
    tagline: "Engineering is the art of turning abstract ideas into physical systems.",
    subbrand: "AARYAN GAIKWAD / ENGINEERING",
    name: "Aaryan Gaikwad",
    role: "Robotics & Mechanical Systems Engineer",
    location: "Mumbai, India",
    availability: "Available for engineering roles & technical collaboration",
  },

  // Hero Section
  hero: {
    eyebrow: "I create therefore I am",
    headlinePart1: "I",
    headlinePart2: "PROTOTYPE",
    headlinePart3: "",
    supportingText: "I'm Aaryan Gaikwad a 19 year old engineering student exploring the intersection of robotics, mechanical design, manufacturing, and code.",
    primaryCtaText: "EXPLORE MY WORK ↘",
    primaryCtaTarget: "#work",
    secondaryCtaText: "ABOUT & PHILOSOPHY →",
    secondaryCtaTarget: "#about",
    materialsLabel: "MECHANICS · ELECTRONICS · CONTROL",
    sculptureSpecs: {
      renderMode: "PBR / CAD SURFACE MESH",
      geometry: "FLEXWALK V2 (ONSHAPE 3D CAD EXPORT)",
      primaryAlloy: "FDM THERMOPLASTIC & STAINLESS STEEL HARDWARE",
      roughness: "0.30 RA",
      lightingScheme: "STUDIO KEY (4500K) + ICE RIM (9500K)",
    }
  },

  // About Section
  about: {
    headline: "Thinking through purpose, learning through testing.",
    subheading: "",
    paragraphs: [
      "I’m an engineering student curious about how things work, from mechanical systems and CAD to robotics, actuation, and control software. I enjoy exploring ideas, understanding the principles behind them, and turning concepts into working prototypes.",
      "My work mainly revolves around CAD modeling and mechanical design, with a growing interest in simulation, manufacturing, embedded systems, and motion control. I’m always looking to learn across disciplines and connect theory with practical applications.",
      "I believe good engineering comes from curiosity, thoughtful design, and a willingness to experiment, question, and improve."
    ],
    disciplines: [
      {
        title: "Mechanical Architecture & CAD",
        desc: "Parametric 3D modeling, joint clearances, structural stress distribution, and mechanical packaging."
      },
      {
        title: "Robotics & Kinematics",
        desc: "Forward and inverse kinematics, bipedal leg dynamics, trajectory generation, and simulation."
      },
      {
        title: "Actuation & Transmission",
        desc: "Custom spur, planetary, and belt reductions; torque-speed curves; backlash minimization."
      },
      {
        title: "3D Printing & Rapid Prototyping",
        desc: "FDM & SLA rapid additive fabrication, fast design-iteration cycles, and mechanical assemblies."
      },
      {
        title: "Embedded & Control Systems",
        desc: "Serial bus servos, microcontroller firmware, sensor integration (IMU, encoders), and feedback loops."
      },
      {
        title: "Software & Simulation",
        desc: "Physics simulation in MuJoCo, Python kinematics scripting, and algorithmic motion testing."
      }
    ]
  },

  // Capabilities / Skills Section
  capabilities: [
    {
      category: "MECHANICAL",
      code: "CAP-01",
      description: "Physical architecture, spatial packaging, and manufacturing feasibility.",
      skills: [
        "Parametric 3D CAD & Mechanical Packaging",
        "Mechanism & Transmission Design",
        "3D printing"
      ]
    },
    {
      category: "ROBOTICS",
      code: "CAP-02",
      description: "Multi-body dynamics, kinematic chains, and physical locomotion.",
      skills: [
        "Forward & Inverse Kinematics (FK / IK)",
        "Multi-Body Physics Simulation (MuJoCo)",
        "Bipedal Dynamics & Gait Trajectory Planning"
      ]
    },
    {
      category: "ELECTRONICS & CONTROL",
      code: "CAP-03",
      description: "Actuation drivers, sensory feedback, and real-time execution.",
      skills: [
        "Microcontroller Firmware & Serial Bus Protocols",
        "Sensor Integration & Fusion (IMU / Encoders)"
      ]
    },
    {
      category: "COMPUTATION & CODE",
      code: "CAP-04",
      description: "Computation, automation scripts, and simulation tools.",
      skills: [
        "Python",
        "C++",
        "Embedded C Programming"
      ]
    }
  ],

  // Contact & Social Links
  contact: {
    headline: "LET'S BUILD SOMETHING.",
    subheading: "Open to engineering conversations, technical discussions, and full-time opportunities in robotics and mechanical systems.",
    email: "aaryangaikwad1057@gmail.com",
    githubUrl: "https://github.com/ProtoAaryanG1057",
    locationString: "Mumbai, Maharashtra, India",
    copyrightYear: "2026",
    license: "MIT LICENSE — OPEN HARDWARE & CODE"
  },

  // Navigation Links
  navigation: [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" }
  ]
};
