export type ProjectCategory =
  | "web-mobile"
  | "icon-designs"
  | "art-graphics"
  | "fun-projects";

export const categories: { id: ProjectCategory; label: string }[] = [
  { id: "web-mobile", label: "Web & Mobile Apps" },
  { id: "icon-designs", label: "Icon Designs" },
  { id: "art-graphics", label: "Art & Graphics" },
  { id: "fun-projects", label: "Fun Projects" },
];

export type UxProcessStep = { label: string; body: string };
export type SolutionPoint = { title: string; body: string };

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  summary: string;
  /** short domain tag shown on the card, e.g. "EdTech" */
  tag: string;
  /** placeholder art colors, used until real images are added */
  gradient: [string, string];
  /**
   * Real cover image — put the file in public/projects/<slug>/ and set
   * e.g. "/projects/online-classroom/cover.png". Replaces the gradient art.
   */
  cover?: string;
  /** Extra screens shown in a gallery at the end of the case study. */
  screens?: string[];
  overview?: string;
  uxProcess?: UxProcessStep[];
  solution?: SolutionPoint[];
};

export const projects: Project[] = [
  // ——— Web & Mobile Apps ———
  {
    slug: "online-classroom",
    category: "web-mobile",
    title: "Online classroom",
    tag: "EdTech",
    gradient: ["#2f4b3f", "#7fae94"],
    summary:
      "A web and mobile application for an medical university to create the curricular and conduct the classes both online and offline",
    overview:
      "Develop a web and mobile application for a medical university to streamline classroom activities. This application will empower staff to prepare and conduct classes more efficiently, while enabling students to join, participate, and digitally track their overall progress.",
    uxProcess: [
      {
        label: "Empathise",
        body: "Conducted user interviews with staff & students, observed current classes to understand needs & pain points.",
      },
      { label: "Define", body: "Refined problem statement & created user personas (staff & students)." },
      { label: "Ideate", body: "Brainstormed features, created low-fidelity prototypes for core functionalities." },
      { label: "Prototype", body: "Developed mid-fidelity prototypes for usability testing." },
      { label: "Test", body: "Conducted usability testing with staff & students, iterated on design based on feedback." },
      { label: "Design", body: "Created high-fidelity prototypes & a style guide." },
      { label: "Develop & Launch", body: "Done design handoff, and tested over developed web and mobile apps." },
    ],
    solution: [
      {
        title: "Pre-Class Preparation",
        body: "Prepare and share lecture materials, activities, and conduct pre-class assessments to enhance student engagement.",
      },
      {
        title: "Interactive Classroom",
        body: "Take digital attendance with the mobile app and conduct in-class quizzes or polls to boost participation and real-time feedback.",
      },
      {
        title: "Personalised Learning",
        body: "Assign personalised assignments to students and leverage the app for evaluation and performance analysis to optimise learning outcomes.",
      },
    ],
  },
  {
    slug: "logistics-app",
    category: "web-mobile",
    title: "App for Logistic Domain",
    tag: "Logistics",
    gradient: ["#1f3a5f", "#7ba2cc"],
    summary:
      "Web application for a leading freight brokerage in North America, specialising in efficient freight movement for shippers and carriers.",
    // Placeholder case study — replace with the real story from Figma/notes.
    overview:
      "A web platform for a leading North American freight brokerage that connects shippers with carriers. The goal: cut the manual coordination behind every load and give both sides live visibility over freight movement, pricing, and paperwork.",
    uxProcess: [
      { label: "Discover", body: "Shadowed brokers and dispatchers to map how loads were matched, priced, and tracked across phone calls and spreadsheets." },
      { label: "Define", body: "Framed the core problem — fragmented load visibility — and prioritised broker, shipper, and carrier journeys." },
      { label: "Ideate", body: "Sketched load-board concepts and negotiation flows, validating them in weekly working sessions with operations teams." },
      { label: "Prototype & Test", body: "Built interactive prototypes of the booking flow and ran task-based usability tests with active brokers." },
      { label: "Design & Handoff", body: "Delivered a high-fidelity design system covering dashboards, tables, and status timelines for the engineering team." },
    ],
    solution: [
      { title: "Smart Load Board", body: "A filterable, real-time board that matches available carriers to open loads and surfaces the best-fit options first." },
      { title: "Live Shipment Tracking", body: "End-to-end status timeline for every shipment, replacing check-in phone calls with proactive notifications." },
      { title: "Carrier Onboarding", body: "A guided, document-aware onboarding flow that reduced carrier setup from days to hours." },
    ],
  },
  {
    slug: "mobile-survey-admin-system",
    category: "web-mobile",
    title: "Mobile Survey Admin System",
    tag: "SaaS",
    gradient: ["#5b3a6e", "#b48ec7"],
    summary:
      "A web application for a mobile survey admin system, to create and manage mobile surveys to run on the various mobile and conduct the survey on large group of users.",
    // Placeholder case study — replace with the real story from Figma/notes.
    overview:
      "An admin platform for building, distributing, and analysing mobile surveys at scale. Research teams needed to author complex questionnaires once and run them reliably across thousands of devices in the field.",
    uxProcess: [
      { label: "Discover", body: "Interviewed research admins and field agents to understand how surveys were authored, deployed, and monitored." },
      { label: "Define", body: "Identified the friction points: error-prone authoring, no deployment visibility, and slow response analysis." },
      { label: "Ideate", body: "Explored builder patterns — drag-and-drop vs. form-based — and tested paper prototypes with admin users." },
      { label: "Prototype & Test", body: "Ran usability rounds on the survey builder and logic editor, iterating on branching and validation flows." },
      { label: "Design & Handoff", body: "Shipped a component library for question types, logic rules, and analytics widgets." },
    ],
    solution: [
      { title: "Visual Survey Builder", body: "Drag-and-drop authoring with question logic, branching, and validation — no technical setup required." },
      { title: "Fleet Deployment", body: "Push surveys to targeted device groups and monitor completion status across the field in real time." },
      { title: "Response Analytics", body: "Live dashboards that turn incoming responses into charts, cross-tabs, and exportable reports." },
    ],
  },
  {
    slug: "forecasting-in-pharma",
    category: "web-mobile",
    title: "Forecasting in Pharma",
    tag: "Pharma",
    gradient: ["#6e2f2f", "#cc8b7b"],
    summary:
      "A web application for a pharmaceutical industry to analyse, calculate and forecast the disease and medicine needs for the specified period of time.",
    // Placeholder case study — replace with the real story from Figma/notes.
    overview:
      "A forecasting workspace for pharmaceutical planners to analyse disease trends and predict medicine demand over a chosen horizon. The design challenge: make dense statistical models legible and actionable for non-statisticians.",
    uxProcess: [
      { label: "Discover", body: "Worked with demand planners and analysts to understand existing spreadsheet-driven forecasting rituals." },
      { label: "Define", body: "Defined personas across planning, procurement, and leadership, each needing different altitude on the same data." },
      { label: "Ideate", body: "Concepted dashboard layouts and scenario-comparison patterns, pressure-testing them against real planning cycles." },
      { label: "Prototype & Test", body: "Tested chart comprehension and scenario workflows with planners; simplified terminology and defaults based on findings." },
      { label: "Design & Handoff", body: "Delivered a data-visualisation style guide with chart types, states, and thresholds for consistent reporting." },
    ],
    solution: [
      { title: "Forecast Dashboard", body: "A single view of projected disease incidence and medicine demand with confidence ranges, by region and period." },
      { title: "Scenario Modelling", body: "Compare best/expected/worst-case scenarios side by side and see supply implications instantly." },
      { title: "Smart Alerts", body: "Threshold-based alerts that flag demand spikes and stock risks before they become shortages." },
    ],
  },
  {
    slug: "stock-market-app",
    category: "web-mobile",
    title: "Stock Market app",
    tag: "Fintech",
    gradient: ["#8a5a1f", "#d9b36a"],
    summary:
      "A web application for Indian stock market that facilitates the share holders and investors to analyse, calculate, predict, and purchase the stocks with the help of insightful suggestions.",
    // Placeholder case study — replace with the real story from Figma/notes.
    overview:
      "A trading and analysis platform for Indian retail investors that blends market data, prediction signals, and purchasing into one flow. The aim: help everyday investors act on insight, not noise.",
    uxProcess: [
      { label: "Discover", body: "Interviewed retail investors across experience levels to map how they research, decide, and execute trades." },
      { label: "Define", body: "Prioritised the novice-to-intermediate investor journey where insight-to-action friction was highest." },
      { label: "Ideate", body: "Explored watchlist, signal, and buy-flow concepts, balancing information density with confidence-building cues." },
      { label: "Prototype & Test", body: "Ran moderated tests on the analysis-to-purchase flow; reduced steps and clarified risk messaging." },
      { label: "Design & Handoff", body: "Delivered a dark-friendly data UI kit — charts, tickers, and order forms — for the build team." },
    ],
    solution: [
      { title: "Insight Engine", body: "Curated buy/hold/sell suggestions with the reasoning behind each signal, in plain language." },
      { title: "Portfolio Pulse", body: "A live portfolio view with performance breakdowns, sector exposure, and risk indicators." },
      { title: "Confident Ordering", body: "A streamlined purchase flow with previews, cost breakdowns, and guardrails against common mistakes." },
    ],
  },

  // ——— Icon Designs (placeholders — swap in your real icon work) ———
  {
    slug: "product-icon-suite",
    category: "icon-designs",
    title: "Product Icon Suite",
    tag: "Iconography",
    gradient: ["#31404f", "#8fb3c9"],
    summary:
      "A 120+ piece icon system designed for a SaaS product family — consistent grid, stroke, and metaphor language across web and mobile.",
  },
  {
    slug: "glyph-line-icon-library",
    category: "icon-designs",
    title: "Glyph & Line Icon Library",
    tag: "Iconography",
    gradient: ["#4a3b2e", "#c9a97f"],
    summary:
      "Dual-style icon library (filled glyphs + 1.5px line) built on a 24px grid with pixel-perfect exports for design systems.",
  },

  // ——— Art & Graphics (placeholders — swap in your real artwork) ———
  {
    slug: "character-illustrations",
    category: "art-graphics",
    title: "Character Illustrations",
    tag: "Illustration",
    gradient: ["#3f2f4f", "#b78fc9"],
    summary:
      "A personal series of hand-drawn characters — expressive figures and creatures exploring shape language and personality.",
  },
  {
    slug: "digital-paintings",
    category: "art-graphics",
    title: "Digital Paintings & Posters",
    tag: "Art",
    gradient: ["#4f2f2f", "#c98f8f"],
    summary:
      "Digital paintings and poster experiments — studies in colour, light, and composition from sketch to final render.",
  },

  // ——— Fun Projects (placeholders — swap in your real experiments) ———
  {
    slug: "daily-ui-challenges",
    category: "fun-projects",
    title: "Daily UI Challenges",
    tag: "Practice",
    gradient: ["#2f4f3f", "#8fc9a9"],
    summary:
      "A running collection of daily UI shots — small, self-contained interface ideas designed against the clock.",
  },
  {
    slug: "micro-interaction-experiments",
    category: "fun-projects",
    title: "Micro-interaction Experiments",
    tag: "Motion",
    gradient: ["#39424d", "#93a6b8"],
    summary:
      "Prototype playground for button states, transitions, and delight moments — testing how far small motion can carry an experience.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}
