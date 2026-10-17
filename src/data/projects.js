/**
 * FORM / FIELD — Projects Data
 *
 * Detailed project architectures, specifications, and deep-dive technical documentation.
 * Preserves strict technical credibility without exaggerated claims.
 */

export const projects = [
  {
    id: "flexwalk",
    number: "01",
    code: "PRJ-01",
    title: "FLEXWALK",
    category: "Robotics / Mechanical Design",
    subtitle: "Bipedal Humanoid Lower-Body Architecture & Actuation",
    summary: "A humanoid bipedal robotics project exploring mechanical architecture, joint actuation, spur-gear transmissions, and kinematic simulation.",
    status: "PROTOTYPE TESTING & SIMULATION",
    timeline: "JUN 26 – AUG 26",
    primaryImage: "./images/projects/flexwalk/Flexwalk.webp",
    secondaryImage: "./images/projects/flexwalk/Flexwalk_v1_assembly.jpg",
    simulationGif: "./images/projects/flexwalk/Flexwalk_v2_sim.gif",
    repoUrl: "https://github.com/Dhruva245/Flexwalk",
    videos: [
      {
        title: "Hip Pitch & Roll Test During Assembly",
        src: "./videos/flexwalk/flex1.mp4"
      },
      {
        title: "Bipedal Leg Joint Articulation Demo",
        src: "./videos/flexwalk/flex2.mp4"
      },
      {
        title: "Actuated Foot Lift & Swing Phase Verification",
        src: "./videos/flexwalk/flex3.mp4"
      }
    ],
    tags: [
      "Robotics",
      "Mechanical Design",
      "Onshape CAD",
      "MuJoCo Simulation",
      "Spur Gear Transmission",
      "Inverse Kinematics",
      "STS3215 Servos",
      "Rapid Prototyping"
    ],
    specs: [
      { label: "CAD System", value: "Onshape" },
      { label: "Nominal Height", value: "~50 cm" },
      { label: "Total Mass", value: "1.30 kg" },
      { label: "Degrees of Freedom", value: "8 DoF (4 per leg)" },
      { label: "Hip Kinematics", value: "Roll + Pitch (1.5:1 ratio)" },
      { label: "Knee Kinematics", value: "Pitch (1.5:1 ratio)" },
      { label: "Ankle Kinematics", value: "Pitch (2.0:1 torque ratio)" },
      { label: "Actuators", value: "STS3215 Serial Bus Servos" },
      { label: "Compute / Drivers", value: "Waveshare Bus Servo Driver Board" },
      { label: "Primary Structure", value: "FDM Printed PLA / PETG" },
      { label: "Physics Engine", value: "MuJoCo 3.x with Python IK" }
    ],
    sections: {
      overview: `FlexWalk is an open-source lower-body humanoid robotics platform built from the ground up, featuring hip pitch, hip roll, knee pitch, and ankle pitch joints. CAD-modeled exclusively in Onshape and physically fabricated through additive manufacturing, the mechanism utilizes closed-loop control to coordinate lower-body bipedal locomotion. Standing at approximately 50 cm with a total structural mass of 1.3 kg, FlexWalk integrates mechanical transmission design, embedded electronics, multi-body kinematics, and control software into one unified platform.`,
      
      problemStatement: `Direct-drive servos in compact humanoid legs frequently fail to deliver sufficient stall torque during single-support stance phases without overheating or demanding prohibitively heavy motors. Conversely, standard planetary gearheads add axial length and mass at distal link locations, degrading the leg's natural pendulum dynamics. The challenge was engineering a compact, lightweight mechanical transmission that multiplies servo torque locally while maintaining low link inertia and stable ankle pivot support.`,

      objectives: [
        "Develop an open-source, reproducible 50 cm bipedal lower-body structure under 1.5 kg.",
        "Implement a custom spur-gear transmission providing a 2:1 reduction at the ankle and 1.5:1 at the hip and knee.",
        "Design a robust ankle pivot joint capable of supporting single-leg stance loads during swing-phase transitions.",
        "Model the complete kinematic chain in MuJoCo physics simulation to validate inverse kinematics (IK) trajectories prior to hardware deployment."
      ],

      designApproach: `The mechanical design philosophy balances structural compliance, torque multiplication, and ease of manufacturing. Rather than concentrating actuator weight at the extremities, servos are packaged close to the proximal link axes. The ankle incorporates an integrated pivot mechanism providing rotational stability across the sagittal plane while transferring ground reaction forces into the rigid lower leg structure. Gear housings are designed with integrated bearing pockets to prevent shaft deflection under cyclic cantilevered loads.`,

      systemArchitecture: `The robotic architecture is organized across three integrated layers:
1. Physical Subsystem: Modular 3D printed chassis (V1 and refined V2 revisions) featuring custom spur-gear meshes (0.8 module) for torque amplification.
2. Electrical & Power Subsystem: Waveshare Serial Bus Driver Board communicating over daisy-chained UART at high baud rates to addressable STS3215 bus servos with onboard position feedback.
3. Computational & Kinematic Pipeline: Offline and hardware-in-the-loop Python scripts computing inverse kinematics (IK) trajectories, simulated within MuJoCo 3.x to examine contact friction, ground reaction impulses, and joint limits.`,

      implementationDetails: [
        "Ankle Transmission: 2.0:1 ratio where the servo-side pinion drives an output gear with double the tooth count, effectively halving angular velocity while doubling available joint holding torque during stance.",
        "Hip & Knee Reduction: 1.5:1 spur reduction stages delivering a 50% torque increase to counteract knee buckle during dynamic squat and swing phases.",
        "Pivot Geometry: Dual-shear pivot arrangement with flanged stainless steel miniature ball bearings to eliminate lateral wobble in the foot plate.",
        "Iterative Refinement: Evolution from V1 (monolithic printed links with higher compliance) to V2 (gusseted box-sections, standardized M3 socket hardware, and brass heat-set inserts)."
      ],

      challengesAndTradeoffs: `A major engineering trade-off centered on 3D printed gear longevity versus manufacturing accessibility. While commercial metal gears require long lead times, custom 3D printed gears enabled rapid overnight iteration on tooth profile geometries and center-to-center distances. Ensuring exact gear mesh without excessive backlash or binding required factoring in printer slicer horizontal expansion tolerances (±0.08 mm).`,

      testingAndOutcomes: `The mechanical structure and gearboxes were empirically tested on a test fixture to evaluate torque transfer and tooth wear over extended cyclic loading. Joint ranges of motion were verified: Hip Pitch (±45°), Knee Pitch (0° to 90°), and Ankle Pitch (±35°). Simulation models in MuJoCo successfully reproduced stable trajectory execution for seated-to-standing and leg-lift routines. Note: Dynamic autonomous walking in unconstrained physical environments remains an active area of research and gait stabilization tuning.`,

      technologiesUsed: [
        "Onshape",
        "MuJoCo 3.7.0 Physics Engine",
        "Python (NumPy, SciPy)",
        "Waveshare Serial Bus Protocol",
        "STS3215 Smart Servos",
        "FDM Additive Manufacturing",
        "Kinematic Analysis"
      ]
    }
  }
];

/**
 * ARCHIVED / DRAFT PROJECTS
 * Kept here to be re-added once sufficient documentation is compiled.
 */
export const draftProjects = [
  {
    id: "actuator-studies",
    number: "02",
    code: "PRJ-02",
    title: "ACTUATOR STUDIES",
    category: "Mechanisms / Electromechanical Systems",
    subtitle: "Torque Density, Reduction Geometries & Closed-Loop Control",
    summary: "Exploration of motor-driven actuators, transmission mechanisms, torque curves, thermal behavior, and electromechanical integration.",
    status: "TEST RIG CHARACTERIZATION",
    timeline: "2024",
    primaryImage: "./images/projects/actuators/actuator_study_diagram.svg",
    secondaryImage: null,
    tags: [
      "Electromechanical",
      "Actuator Design",
      "Gear Reduction",
      "Motor Control",
      "PID Tuning",
      "Thermal Analysis",
      "Test Bench"
    ],
    specs: [
      { label: "Target Actuation", value: "Quasi-Direct vs Geared" },
      { label: "Reduction Types", value: "Planetary, Spur & Belt" },
      { label: "Control Protocol", value: "PWM / CAN / UART" },
      { label: "Feedback Sensors", value: "12-bit Magnetic Encoders (AS5600)" },
      { label: "Motor Categories", value: "Brushless Gimbal & Coreless DC" },
      { label: "Current Profiling", value: "Low-Side Shunt Resistor Sensing" },
      { label: "Test Rig Metrics", value: "Holding Torque, Backlash, Temp" }
    ],
    sections: {
      overview: `Robotic actuation sits at the intersection of electrical power, thermal dynamics, and mechanical force transmission. This series of experimental studies examined actuator configurations—comparing high-speed low-torque motors coupled with multi-stage gear reductions against larger diameter brushless motors with low reduction ratios (quasi-direct drive).`,
      
      problemStatement: `Selecting an actuator for dynamic robotic joints requires navigating contradictory requirements: high peak torque density, low reflected inertia, minimal backlash, and backdrivability for impedance control. Commercial robotic actuators are often cost-prohibitive for rapid prototyping, necessitating custom test fixtures to characterize torque, thermal degradation, and transmission efficiency.`,

      objectives: [
        "Construct an instrumentation test bench to measure dynamic torque and angular velocity.",
        "Compare gear reduction topologies (multi-stage spur vs compact planetary stages) under continuous stall conditions.",
        "Implement closed-loop magnetic encoder feedback to evaluate positioning accuracy and backlash.",
        "Characterize thermal rise and torque decay under varying current limits."
      ],

      designApproach: `A modular test rig was fabricated featuring an aluminum extrusion spine, 3D printed motor adapter plates, and a calibrated lever arm with a digital load cell for static torque measurement. Optical and magnetic encoders were evaluated for position feedback resolution across electrical noise generated by PWM switching.`,

      systemArchitecture: `The electromechanical test architecture comprises:
1. Actuation Stage: Brushless DC and high-torque coreless motors driven by half-bridge inverter stages with adjustable current limits.
2. Sensory Instrumentation: 12-bit magnetic absolute encoders mounted co-axially on output shafts to measure true mechanical deflection and backlash.
3. Controller & DAQ: Microcontroller-based data acquisition running 1 kHz control loops, streaming current, voltage, velocity, and temperature telemetry over serial logging tools.`,

      implementationDetails: [
        "Backlash Characterization: Output shafts were clamped under known counter-torques while reading sub-degree encoder fluctuations to quantify gear mesh play.",
        "Thermal Dissipation: Monitored temperature rise across motor stator coils using thermistor probes, identifying thermal throttling thresholds under duty-cycle loads.",
        "Firmware Control Loop: Implemented cascaded PID loops (inner current loop, intermediate velocity loop, outer position loop) for responsive position tracking."
      ],

      challengesAndTradeoffs: `High gear ratios (e.g. >10:1) provide immense holding torque but drastically increase reflected rotor inertia (proportional to the square of the gear ratio), rendering joints stiff and prone to gear tooth shearing during unexpected ground impacts. Low-ratio configurations preserve backdrivability but demand continuous current to hold static postures, generating rapid ohmic heating.`,

      testingAndOutcomes: `Data collected from the bench clarified the practical operating envelope for robotic joint actuation: high-ratio spur setups proved optimal for quasi-static holding tasks (such as ankle adjustments), whereas moderate reductions (under 3:1) are essential for joints requiring shock absorption and passive compliance.`,

      lessonsLearned: `Backlash in multi-stage gear trains compounds rapidly with each additional mesh. Designing eccentric motor mounting slots allows precise center-distance tuning, eliminating backlash while preventing binding caused by manufacturing runout.`,

      technologiesUsed: [
        "Embedded C / Microcontroller Control",
        "PID Control Loops",
        "Magnetic Encoders (AS5600 / MT6701)",
        "Oscilloscope & Logic Analyzer",
        "Current Sensing Shunts",
        "CAD Test Rig Design",
        "Python Telemetry Plotting"
      ]
    }
  },
  {
    id: "product-cad-design",
    number: "03",
    code: "PRJ-03",
    title: "PRODUCT & CAD DESIGN",
    category: "Product Development / Manufacturing",
    subtitle: "Precision Enclosures, Structural DFM & Assembly Systems",
    summary: "Mechanical concepts developed through parametric CAD, material selection, design iteration, tolerance stackups, and manufacturing considerations.",
    status: "PROTOTYPING & DFM REVIEW",
    timeline: "2023 – 2024",
    primaryImage: "./images/projects/cad/cad_design_diagram.svg",
    secondaryImage: null,
    tags: [
      "Parametric CAD",
      "DFM / DFA",
      "Additive Manufacturing",
      "Tolerance Stackup",
      "Enclosure Design",
      "Hardware Standardization",
      "Structural Ribbing"
    ],
    specs: [
      { label: "CAD System", value: "Parametric Feature Tree Modeling" },
      { label: "Manufacturing Processes", value: "FDM & SLA 3D Printing" },
      { label: "Fastener Standard", value: "Metric ISO Standard (M2.5, M3, M4)" },
      { label: "Insert Technology", value: "Ultrasonic / Heat-Set Brass Inserts" },
      { label: "Bearing Retention", value: "Flanged Seats with Snap-Ring Grooves" },
      { label: "Draft & Chamfer Rules", value: "Standard 45° chamfers & 1-2° drafts" },
      { label: "Wall Thickness Strategy", value: "Uniform 2.4 - 3.2 mm with Corrugation" }
    ],
    sections: {
      overview: `A portfolio of mechanical design studies emphasizing design for manufacturing (DFM), structural ribbing, fastener accessibility, and ergonomic packaging. From rugged electronics housings to robotic structural links, this work demonstrates how disciplined CAD methodology translates design concepts into reliable physical hardware.`,
      
      problemStatement: `Prototyping mechanical components frequently suffers from poor design-for-assembly choices: hard-to-reach screw locations, reliance on tapping weak plastic threads, unmanaged thermal warping in additive parts, and unconstrained tolerance stackups that prevent assemblies from fitting cleanly together without manual post-machining.`,

      objectives: [
        "Establish standardized mechanical design rules for rapid prototyping and low-volume production.",
        "Implement robust hardware fastening using heat-set brass threaded inserts rather than direct tapping in thermoplastics.",
        "Design structural enclosures with optimized internal air channels for passive electronics cooling.",
        "Apply geometric dimensioning and tolerancing (GD&T) principles to multi-part mechanical assemblies."
      ],

      designApproach: `Every model begins with a top-down master skeleton sketch defining key coordinate datums, mounting hole centers, and clearance envelopes. Wall thicknesses are kept uniform to minimize thermal shrinkage and sink marks. Strategic ribbing and gussets are deployed to stiffen thin-walled shells against bending without inflating mass. Fasteners are standardized across assemblies to minimize required tooling during field servicing.`,

      systemArchitecture: `The mechanical design workflow consists of:
1. Master Assembly Layout: Skeletal modeling ensuring associative updates when core kinematic or envelope parameters shift.
2. Component Detailing: Application of fillet radii (r > 1.5 mm) at internal corners to eliminate sharp stress concentrations; incorporation of lead-in chamfers for bearing press-fits.
3. Fastener & Hardware Integration: Counterbored pockets sized for ISO 4762 socket head cap screws and clearance holes conforming to standard H13 fits.`,

      implementationDetails: [
        "Threaded Retention: Replaced self-tapping screws with knurled brass heat-set inserts (M3 x 4 mm), increasing pull-out retention strength by over 300%.",
        "Bearing Alignment: Designed dual-bearing carrier blocks with line-to-line bore tolerances, ensuring shaft concentricity without preloading ball races.",
        "Cable Ingress & Strain Relief: Integrated interlocking labyrinth cable channels and zip-tie anchor bridges to prevent vibration fatigue on electrical wire harnesses."
      ],

      challengesAndTradeoffs: `Balancing aesthetic enclosure lines with functional manufacturing constraints is a constant negotiation. Deep undercuts require complex multi-piece molds in injection molding or extensive support material in 3D printing. Dividing complex housings along parting planes with tongue-and-groove alignment joints resolved both support removal and light/dust infiltration challenges.`,

      testingAndOutcomes: `Assemblies were physically printed, fitted, and subjected to drop and fit-check inspections. Fastener torque limits were validated with torque screwdrivers. All subassemblies demonstrated zero interference across full operational ranges of motion, confirming the accuracy of the CAD clearance envelopes.`,

      lessonsLearned: `Designing for assembly (DFA) begins with fastener selection: minimizing distinct bolt lengths down to two standards (M3x8 and M3x16) reduces assembly errors and simplifies bill of materials (BOM) management.`,

      technologiesUsed: [
        "Parametric CAD Modeling",
        "Tolerance Stackup Analysis",
        "DFM / DFA Principles",
        "Additive Manufacturing Preparation",
        "GD&T Fundamentals",
        "Hardware Bill of Materials (BOM)"
      ]
    }
  }
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id) || null;
}
