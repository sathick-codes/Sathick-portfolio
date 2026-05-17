const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Mobile Menu Drawer Update
html = html.replace(
  /\.nav-links\{display:flex;flex-direction:column;position:fixed;top:64px;right:0;width:70%;bottom:0;background:rgba\(12,12,14,0\.95\);backdrop-filter:blur\(10px\);z-index:99;padding:2rem;gap:1\.5rem;transform:translateX\(100%\);pointer-events:none;transition:transform \.4s cubic-bezier\(\.4,0,\.2,1\);border-left:1px solid var\(--line\)\}/,
  '.nav-links{display:flex;flex-direction:column;align-items:flex-end;text-align:right;position:fixed;top:64px;right:0;width:65%;bottom:0;background:rgba(15,15,18,0.98);backdrop-filter:blur(10px);z-index:99;padding:2rem;gap:1.5rem;transform:translateX(100%);pointer-events:none;transition:transform .4s cubic-bezier(.4,0,.2,1);border-left:1px solid var(--line)}'
);

html = html.replace(
  /\.dropdown\{position:static;opacity:1;pointer-events:all;transform:none;border:none;background:transparent;padding-left:1rem;border-left:1px solid var\(--line\);border-radius:0;margin-top:\.5rem;display:none\}/,
  '.dropdown{position:static;opacity:1;pointer-events:all;transform:none;border:none;background:transparent;padding-right:1rem;border-right:1px solid var(--line);border-left:none;border-radius:0;margin-top:.5rem;display:none;align-items:flex-end;text-align:right}'
);

html = html.replace(
  /\.has-dropdown\.open \.dropdown\{display:flex\}/,
  '.has-dropdown.open .dropdown{display:flex;flex-direction:column}'
);

// 2. Mobile Typography and Stats Update
html = html.replace(
  /@media\(max-width:560px\)\{\s*\.proj-grid\{grid-template-columns:1fr\}/,
  '@media(max-width:560px){\n  #hero{padding-top:20px}\n  .proj-grid{grid-template-columns:1fr}'
);

html = html.replace(
  /\.hero-tagline\{font-size:0\.55rem !important;white-space:nowrap;letter-spacing:0\.02em !important\}/,
  '.hero-tagline{font-size:0.65rem !important;white-space:nowrap;letter-spacing:0.02em !important;width:100%}'
);

html = html.replace(
  /\.hero-sub\{font-size:0\.6rem;white-space:nowrap\}/,
  '.hero-sub{font-size:0.7rem;white-space:nowrap;width:100%}'
);

html = html.replace(
  /\.stat-num\{font-size:1\.1rem\}/,
  '.stat-num{font-size:1.4rem}'
);

html = html.replace(
  /\.stat-label\{font-size:0\.55rem;white-space:nowrap\}/,
  '.stat-label{font-size:0.7rem;white-space:nowrap}'
);

html = html.replace(
  /\.hero-stats\{gap:1rem;justify-content:space-between\}/,
  '.hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;justify-content:space-between;width:100%}'
);

// Add 'till sem 5' to CGPA
html = html.replace(
  /<div class="stat-label">CGPA<\/div>/,
  '<div class="stat-label">CGPA<br>till sem-5</div>'
);

// 3. Replace Projects Grid
const newProjGrid = `
    <div class="proj-grid">
      <div class="proj-card" data-cat="competition" onclick="openDrawer('proj0')">
        <img src="https://drive.google.com/thumbnail?id=1T4IoTHMzytihrC6_J1Ifsr__QU3S4bcF&sz=w800" alt="M.A.R.S Hackathon" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Competition &middot; 2nd Place 🥈</div>
          <h3 class="proj-title">M.A.R.S Hackathon (Habitat &amp; Shelter Design)</h3>
          <p class="proj-desc">Participated in a habitat site selection and shelter design challenge for the lunar/Mars surface, securing 2nd place with Team Beyonders.</p>
          <div class="proj-tags">
            <span class="proj-tag">Habitat Design</span><span class="proj-tag">Site Selection</span><span class="proj-tag">Shelter Design</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="hobby" onclick="openDrawer('proj1')">
        <img src="https://drive.google.com/thumbnail?id=1KWYrGWFK3f0faACHedMnhKrbWGpGbq1F&sz=w800" alt="Tesla Turbine Hobby" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Hobby / Innovation</div>
          <h3 class="proj-title">Fabrication &amp; Efficiency Analysis of Tesla Bladeless Turbine</h3>
          <p class="proj-desc">Designed, fabricated, and analyzed a physical prototype of a Tesla Bladeless Turbine to understand boundary layer effect and fluid-rotor adhesion.</p>
          <div class="proj-tags">
            <span class="proj-tag">Fabrication</span><span class="proj-tag">Prototyping</span><span class="proj-tag">Testing</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="academic" onclick="openDrawer('proj2')">
        <img src="https://drive.google.com/thumbnail?id=1aSfpTqa83zwpi_3Jwt5aiS-JzyVHnVPZ&sz=w800" alt="Tesla Turbine PBL" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Academic Project &middot; PBL (MEDX37)</div>
          <h3 class="proj-title">Usage of Tesla Turbine for Domestic Wind Energy</h3>
          <p class="proj-desc">A project-based learning initiative focused on optimizing boundary-layer turbines for domestic renewable wind energy extraction.</p>
          <div class="proj-tags">
            <span class="proj-tag">PBL</span><span class="proj-tag">Renewable Energy</span><span class="proj-tag">Fluid Mechanics</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="competition" onclick="openDrawer('proj3')">
        <img src="https://drive.google.com/thumbnail?id=1UUBo49-5dQ0ArXf0G9Pla3VHX2GKHWzT&sz=w800" alt="SIH Challenge" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Competition</div>
          <h3 class="proj-title">Smart India Hackathon (SIH) Project</h3>
          <p class="proj-desc">Developed an innovative, problem-solving mechanism addressing real-world industrial challenges through optimized design and automated solutions.</p>
          <div class="proj-tags">
            <span class="proj-tag">Innovation</span><span class="proj-tag">Problem Solving</span><span class="proj-tag">Design</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="academic" onclick="openDrawer('proj4')">
        <img src="https://drive.google.com/thumbnail?id=1g00Ooq5X_4NAfa_Z_TP9ZOi4Uq62bVN9&sz=w800" alt="Automatic Door" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Academic Project &middot; PBL</div>
          <h3 class="proj-title">Design of Mechatronic System: Automatic Door</h3>
          <p class="proj-desc">Engineered an automated door system integrating mechatronic principles, sensors, and actuators for seamless and responsive operation.</p>
          <div class="proj-tags">
            <span class="proj-tag">Mechatronics</span><span class="proj-tag">Sensors</span><span class="proj-tag">Automation</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="academic" onclick="openDrawer('proj5')">
        <img src="https://drive.google.com/thumbnail?id=1T46xW-KgUL1UxwnnD8eaSy6xeoHbyVlA&sz=w800" alt="RideFar" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Academic &middot; Business Model</div>
          <h3 class="proj-title">RideFar</h3>
          <p class="proj-desc">Entrepreneurial business model focusing on long-distance, optimized transit solutions leveraging engineering logistics and efficiency.</p>
          <div class="proj-tags">
            <span class="proj-tag">Business Model</span><span class="proj-tag">Logistics</span><span class="proj-tag">Entrepreneurship</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="academic" onclick="openDrawer('proj6')">
        <img src="https://drive.google.com/thumbnail?id=1vE0gZ1UCQbP6YASufA6EPbrbOaKx9eD1&sz=w800" alt="Comfeasy" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Academic &middot; Business Model</div>
          <h3 class="proj-title">Comfeasy</h3>
          <p class="proj-desc">Developed a comprehensive business strategy for ergonomic and comfortable daily utility products designed for modern lifestyles.</p>
          <div class="proj-tags">
            <span class="proj-tag">Business Model</span><span class="proj-tag">Ergonomics</span><span class="proj-tag">Entrepreneurship</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>

      <div class="proj-card" data-cat="internship" onclick="openDrawer('proj7')">
        <img src="https://drive.google.com/thumbnail?id=1z6Atx0MX_J6w-k4C6MMN0qoAP6IX9l6k&sz=w800" alt="Internship HMIL" loading="lazy">
        <div class="proj-body">
          <div class="proj-cat">Internship</div>
          <h3 class="proj-title">Hyundai Motors India Ltd. Internship</h3>
          <p class="proj-desc">Hands-on automotive manufacturing experience, analyzing assembly line efficiency and operational workflow at the HMIL facility.</p>
          <div class="proj-tags">
            <span class="proj-tag">Automotive</span><span class="proj-tag">Manufacturing</span><span class="proj-tag">Analysis</span>
          </div>
          <span class="proj-arrow">↗</span>
        </div>
      </div>
    </div>`;

html = html.replace(/<div class="proj-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, newProjGrid + '\n  </div>\n</section>');

// 4. Replace projects Object
const newProjectsObj = `const projects = {
  proj0: {
    cat: 'Competition &middot; 2nd Place 🥈',
    content: \`
      <h2>M.A.R.S Hackathon (Habitat & Shelter Design)</h2>
      <h3>Overview</h3>
      <p>Participated in the M.A.R.S (Mechanical Aerospace Robotics Systems) Hackathon — a competitive event requiring teams to develop solutions for habitat site selection and shelter design on the lunar/Mars surface. The team "Beyonders" secured 2nd place.</p>
      <img src="https://drive.google.com/thumbnail?id=1T4IoTHMzytihrC6_J1Ifsr__QU3S4bcF&sz=w1000" alt="Space">
      <h3>Technical Work</h3>
      <ul>
        <li>Analysed terrain and site conditions for optimal habitat placement using DTM data.</li>
        <li>Designed robust shelter structures tailored for harsh lunar/Mars environments using CAD tools.</li>
        <li>Performed terrain analysis using MATLAB — analysing slope gradients, surface roughness, and traversability indices for a 10km &times; 10km sector.</li>
        <li>Evaluated interior layout for life support, electronics, and power systems.</li>
      </ul>
      <h3>Outcome</h3>
      <p>Team Beyonders' Phase 1 submission was selected as a finalist. The design demonstrated strong technical depth in terrain adaptation, structural integrity and systems integration — earning 2nd place at the hackathon.</p>
    \`
  },
  proj1: {
    cat: 'Hobby / Innovation',
    content: \`
      <h2>Fabrication & Analysis of Efficiency of Tesla Bladeless Turbine</h2>
      <h3>Overview</h3>
      <p>A personal hobby project focused on the hands-on fabrication and efficiency analysis of a Tesla bladeless turbine prototype. This project involved practical engineering, building a functional prototype from scratch, and rigorously testing its output.</p>
      <img src="https://drive.google.com/thumbnail?id=1KWYrGWFK3f0faACHedMnhKrbWGpGbq1F&sz=w1000" alt="Turbine Fabrication">
      <h3>Fabrication Process</h3>
      <ul>
        <li>Built using a "best out of waste" approach — repurposed materials, casing, and shaft — making it highly low-cost.</li>
        <li>Custom components designed for housing the generator and maintaining precise disc spacing for optimal fluid boundary-layer adhesion.</li>
        <li>Assembly of the internal rotor mechanism focusing on minimizing friction and kinetic losses.</li>
      </ul>
      <h3>Testing and Efficiency</h3>
      <p>Conducted rigorous speed tests to determine the optimal wind velocity for maximum RPM. Testing involved output measurement, verifying the real-world efficiency against theoretical calculations of boundary layer principles.</p>
    \`
  },
  proj2: {
    cat: 'Academic Project &middot; PBL (MEDX37)',
    content: \`
      <h2>Usage of Tesla Turbine for Domestic Wind Energy Generation</h2>
      <h3>Concept & Analysis</h3>
      <p>An academic research project (MEDX37) exploring the feasibility of using Nikola Tesla's bladeless turbine design for domestic wind energy generation. The study analyzes how wind energy can be harnessed through aerodynamic flow and vortex shedding instead of traditional blades.</p>
      <img src="https://drive.google.com/thumbnail?id=1aSfpTqa83zwpi_3Jwt5aiS-JzyVHnVPZ&sz=w1000" alt="Turbine">
      <h3>Design Features</h3>
      <ul>
        <li>Enlarged inlet port: designed to capture low-velocity urban winds more efficiently.</li>
        <li>Aerodynamic shell: auto-aligns with wind direction for maximum intake.</li>
        <li>Discs array: interacts with wind forces via drag and vortex shedding &rarr; converted to electricity via induction.</li>
        <li>Modular design: Multiple units in-line can produce sufficient power for lighting or device charging.</li>
      </ul>
      <h3>Technical Analysis</h3>
      <p>Evaluated aerodynamic efficiency and power output metrics based on standard fluid mechanics formulas. Explored methods to optimize torque generation under varying wind load conditions, bridging theoretical physics with mechanical design.</p>
    \`
  },
  proj3: {
    cat: 'Competition',
    content: \`
      <h2>Smart India Hackathon (SIH) Challenge</h2>
      <h3>Overview</h3>
      <p>A comprehensive team project for the Smart India Hackathon involving the identification of critical industrial or infrastructural problems and the proposition of an innovative, scalable engineering solution.</p>
      <img src="https://drive.google.com/thumbnail?id=1UUBo49-5dQ0ArXf0G9Pla3VHX2GKHWzT&sz=w1000" alt="SIH Concept">
      <h3>Problem Statement & Strategy</h3>
      <ul>
        <li>Analyzed complex problem domains to formulate structured, actionable engineering challenges.</li>
        <li>Developed a conceptual framework integrating mechanical design with modern technology stacks.</li>
        <li>Designed a system architecture focused on efficiency, cost-effectiveness, and real-world applicability.</li>
        <li>Created a compelling pitch detailing technical feasibility, implementation roadmap, and impact metrics.</li>
      </ul>
      <h3>Outcome</h3>
      <p>Successfully delivered a well-structured technical proposal demonstrating strong analytical thinking, structured problem framing, and team-based engineering communication.</p>
    \`
  },
  proj4: {
    cat: 'Academic Project &middot; PBL (MED3102)',
    content: \`
      <h2>Design of Mechatronic System: Automatic Door</h2>
      <h3>Overview</h3>
      <p>A compact microcontroller-based system designed to enhance convenience, safety, and independence for users who struggle with manually operating doors. Allows users to close and lock doors effortlessly via automated commands.</p>
      <img src="https://drive.google.com/thumbnail?id=1g00Ooq5X_4NAfa_Z_TP9ZOi4Uq62bVN9&sz=w1000" alt="Mechatronics">
      <h3>System Architecture</h3>
      <p>Input Command &rarr; Microcontroller (Arduino/ESP32) &rarr; Motor Driver &rarr; Actuator &rarr; Locking Mechanism. Includes a sensor loop (Reed Switch or IR Sensor) to check the door state before triggering the actuation sequence.</p>
      <h3>Key Components & Logic</h3>
      <ul>
        <li><strong>Microcontroller:</strong> Arduino Uno / ESP32.</li>
        <li><strong>Sensors:</strong> Push Button, Magnetic Reed Switch, or IR Sensor.</li>
        <li><strong>Actuators:</strong> Servo Motor, Linear Actuator, or Solenoid Lock.</li>
        <li><strong>Logic:</strong> On receiving input, the system checks the door state via sensor. If open, it activates the motor to close, then triggers the solenoid lock to engage.</li>
      </ul>
    \`
  },
  proj5: {
    cat: 'Academic &middot; Business Model',
    content: \`
      <h2>RideFar Business Model</h2>
      <h3>Overview</h3>
      <p>Developed as an entrepreneurial pitch, RideFar is an optimized transit business model focusing on bridging gaps in long-distance urban and intercity mobility. The project blends mechanical efficiency concepts with strategic business planning.</p>
      <img src="https://drive.google.com/thumbnail?id=1T46xW-KgUL1UxwnnD8eaSy6xeoHbyVlA&sz=w1000" alt="RideFar">
      <h3>Scope of Work</h3>
      <ul>
        <li><strong>Market Analysis:</strong> Identified pain points in urban mobility, commuting trends, and vehicle utilization rates.</li>
        <li><strong>Product Rationale:</strong> Engineered the conceptual logistics focusing on fleet efficiency and operational cost reduction.</li>
        <li><strong>Financials & Strategy:</strong> Developed a comprehensive B2B/B2C business model including unit economics, capital expenditure, and go-to-market strategies.</li>
      </ul>
      <h3>Outcome</h3>
      <p>Produced a structured business case that effectively translates complex operational and technical logistics into a viable commercial venture.</p>
    \`
  },
  proj6: {
    cat: 'Academic &middot; Business Model',
    content: \`
      <h2>Comfeasy Business Project</h2>
      <h3>Overview</h3>
      <p>Developed during the Wadhwani Foundation Entrepreneurship Skills course, Comfeasy is a business-driven ergonomic project focused on designing and marketing products that alleviate physical strain in modern lifestyles.</p>
      <img src="https://drive.google.com/thumbnail?id=1vE0gZ1UCQbP6YASufA6EPbrbOaKx9eD1&sz=w1000" alt="Comfeasy">
      <h3>Key Contributions</h3>
      <ul>
        <li>Ergonomic product design conceptualization targeting workplace and lifestyle comfort.</li>
        <li>Comprehensive business model and competitive market analysis.</li>
        <li>Prototyping strategy and financial viability projections.</li>
      </ul>
      <h3>Outcome</h3>
      <p>Demonstrated the ability to merge mechanical design principles with actionable entrepreneurial strategies, bridging the gap between human comfort and commercial viability.</p>
    \`
  },
  proj7: {
    cat: 'Internship &middot; HMIL',
    content: \`
      <h2>Hyundai Motors India Ltd. Internship</h2>
      <h3>Overview</h3>
      <p>A comprehensive industrial internship at Hyundai Motor India Limited (HMIL) Assembly Shop, gaining hands-on exposure to high-volume automotive manufacturing, assembly line efficiency, and operational workflows.</p>
      <img src="https://drive.google.com/thumbnail?id=1z6Atx0MX_J6w-k4C6MMN0qoAP6IX9l6k&sz=w1000" alt="Manufacturing">
      <h3>Key Learnings & Activities</h3>
      <ul>
        <li>Observed the full production workflow spanning Trim, Chassis, Engine Sub, Door Sub, and Final assembly lines.</li>
        <li>Analyzed repetitive tasks and line efficiency within a high UPH (Units Per Hour) manufacturing environment.</li>
        <li>Explored practical applications of Industrial Ergonomics and process flow optimization.</li>
        <li>Gained insights into the real-world execution of lean manufacturing and quality control standards.</li>
      </ul>
      <h3>Outcome</h3>
      <p>Acquired practical, shop-floor experience linking academic engineering principles to large-scale, automated industrial production processes.</p>
    \`
  }
};`;

html = html.replace(/const projects = \{[\s\S]*?\n\};\n\n\/\/ Canvas Background/, newProjectsObj + '\n\n// Canvas Background');

fs.writeFileSync('index.html', html);
console.log('Update completed');
