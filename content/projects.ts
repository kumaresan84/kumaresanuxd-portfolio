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

/**
 * A case study is an ordered list of blocks, so each project can tell its own
 * story (mirrors the Figma structure: Problem → Users → Solution → Deliverables
 * → Differentiators → Outcome → named image galleries).
 *
 * - prose    : one or more paragraphs, optional section heading
 * - bullets  : a headed bullet list
 * - labeled  : a headed set of label + body items (e.g. "The Users", process steps)
 * - meta     : a headed one-line value (e.g. "Deliverables")
 * - gallery  : a named image section. Images resolve from public/projects/<slug>/
 *              at build time: explicit `images` win; else files whose name starts
 *              with `match` (e.g. "wireframe" → wireframe-1.png); else, if it's the
 *              only auto gallery, every non-cover image. Empty → labeled placeholder.
 */
export type CaseBlock =
  | { type: "prose"; heading?: string; body: string[] }
  | { type: "bullets"; heading: string; items: string[] }
  | { type: "labeled"; heading: string; items: { label: string; body: string }[] }
  | { type: "meta"; heading: string; body: string }
  | {
      type: "gallery";
      heading: string;
      note?: string;
      images?: string[];
      /** filename prefix to pull from the folder, for projects with several galleries */
      match?: string;
      layout?: "grid" | "single";
    };

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  /** short domain tag shown on the card, e.g. "EdTech" */
  tag: string;
  summary: string;
  /** placeholder art colors, used on the card until a real cover is added */
  gradient: [string, string];
  /** Real cover image at public/projects/<slug>/cover.* (auto-detected). */
  cover?: string;
  /** The case-study story. */
  blocks?: CaseBlock[];
};

const oc = (n: number) => `/projects/online-classroom/screen-${n}.png`;

export const projects: Project[] = [
  // ─────────────────────────────── Web & Mobile Apps ───────────────────────────────
  {
    slug: "online-classroom",
    category: "web-mobile",
    title: "Digital Classroom",
    tag: "EdTech",
    gradient: ["#2f4b3f", "#7fae94"],
    summary:
      "A web and mobile application for a medical university to build the curriculum and conduct classes, both online and offline.",
    blocks: [
      {
        type: "prose",
        body: [
          "Develop a web and mobile application for a medical university to streamline classroom activities. The application empowers staff to prepare and conduct classes more efficiently, while enabling students to join, participate, and digitally track their overall progress.",
        ],
      },
      {
        type: "labeled",
        heading: "UX Process",
        items: [
          { label: "Empathise", body: "Conducted user interviews with staff & students, and observed current classes to understand needs and pain points." },
          { label: "Define", body: "Refined the problem statement and created user personas for staff and students." },
          { label: "Ideate", body: "Brainstormed features and created low-fidelity prototypes for the core functionalities." },
          { label: "Prototype", body: "Developed mid-fidelity prototypes for usability testing." },
          { label: "Test", body: "Conducted usability testing with staff & students, iterating on the design based on feedback." },
          { label: "Design", body: "Created high-fidelity prototypes and a style guide." },
          { label: "Develop & Launch", body: "Handed off the design, and tested over the developed web and mobile apps." },
        ],
      },
      {
        type: "labeled",
        heading: "Solution",
        items: [
          { label: "Pre-Class Preparation", body: "Prepare and share lecture materials and activities, and run pre-class assessments to enhance student engagement." },
          { label: "Interactive Classroom", body: "Take digital attendance with the mobile app and run in-class quizzes or polls to boost participation and real-time feedback." },
          { label: "Personalised Learning", body: "Assign personalised assignments to students and leverage the app for evaluation and performance analysis to optimise learning outcomes." },
        ],
      },
      { type: "gallery", heading: "Mind-map", images: [oc(1)], layout: "single" },
      { type: "gallery", heading: "Information Architecture", images: [oc(2)], layout: "single" },
      { type: "gallery", heading: "User Test — Response", images: [oc(6)], layout: "single" },
      { type: "gallery", heading: "Design Screens", images: [oc(4), oc(5), oc(3), oc(7)], layout: "grid" },
    ],
  },
  {
    slug: "logistics-app",
    category: "web-mobile",
    title: "App for Logistic Domain",
    tag: "Logistics",
    gradient: ["#1f3a5f", "#7ba2cc"],
    summary:
      "Web and mobile applications for a North-American freight brokerage, connecting shippers and carriers for efficient freight movement.",
    blocks: [
      {
        type: "prose",
        body: [
          "The client is the innovation leader in truck brokerage and less-than-truckload freight transportation — a leading supply chain partner to blue-chip companies across every major industry, with a sole focus on freight transportation. Their global network of 749 locations and approximately 43,000 employees helps shippers manage their supply chains most efficiently, using advanced technology for the movement of goods.",
        ],
      },
      {
        type: "prose",
        heading: "Problem Statement",
        body: [
          "The system needs to provide a comfortable, secure, and easy business-process model for both shippers and carriers — which requires a well-defined, strong fundamental UX to build and run the set of applications that serve best-in-class service for large, medium, and small-scale shippers, carriers, and fleet owners.",
          "The customer service portal wanted a simple, easy-to-use application for its business partners and customers — getting a quick quote, finding the best carrier partner, and placing and tracking the order until the shipment completes. The carrier portal needed a well-designed, intelligently-suggesting load board that keeps carriers engaged and supports the business.",
        ],
      },
      {
        type: "labeled",
        heading: "The Users",
        items: [
          { label: "Shippers", body: "who wanted to ship their commodities from one place to another." },
          { label: "Carriers", body: "who own one or multiple trucks and provide the support to make the shipment happen." },
        ],
      },
      {
        type: "bullets",
        heading: "The Solution",
        items: [
          "Defined a UX solution by conducting research and analysis, creating user personas, defining user journeys, developing information architecture, designing wireframes and prototypes, conducting usability testing, implementing the solution, and iterating as necessary.",
          "Through this process, created a comprehensive UX solution that met the users' needs and delivered a positive experience.",
        ],
      },
      {
        type: "meta",
        heading: "Deliverables",
        body: "User Personas, Information Architecture, User Flow Diagram, Experience Canvas, Low-Fidelity Wireframes, High-Fidelity Mock-up screens, Interactive Prototypes.",
      },
      {
        type: "bullets",
        heading: "Differentiators",
        items: [
          "Customers were able to find the best quote in the market through the improved design solution and experience.",
          "Carriers were able to find the best loads in their geo-location — ones that pay well, without a lot of strain — through the web and mobile applications.",
        ],
      },
      {
        type: "bullets",
        heading: "Outcome",
        items: [
          "Remarkable business impact in terms of revenue shift.",
          "Increased volume of shippers and carriers onboarding.",
          "Top user-ranked carrier mobile application on both iOS and Android.",
        ],
      },
      { type: "gallery", heading: "Design Screens", note: "Drop any images (except cover.*) into public/projects/logistics-app/", layout: "grid" },
    ],
  },
  {
    slug: "mobile-survey-admin-system",
    category: "web-mobile",
    title: "Mobile Survey Admin System",
    tag: "SaaS",
    gradient: ["#5b3a6e", "#b48ec7"],
    summary:
      "A web platform to create and manage mobile surveys, and run them across devices with large groups of users.",
    blocks: [
      {
        type: "prose",
        heading: "Problem Statement",
        body: [
          "Companies need a single platform to create, distribute, and manage mobile surveys — reaching large, distributed groups of respondents across a range of devices, while keeping authoring simple and results easy to analyse.",
        ],
      },
      {
        type: "prose",
        heading: "Design Solution",
        body: [
          "Designed an admin platform that lets teams build surveys visually, push them to targeted device groups, and turn incoming responses into clear, actionable analytics — from questionnaire authoring, through live monitoring, to reporting.",
        ],
      },
      { type: "gallery", heading: "Wireframes", match: "wireframe", note: "Name files wireframe-1.png, wireframe-2.png… in public/projects/mobile-survey-admin-system/", layout: "grid" },
      { type: "gallery", heading: "Visual Designs", match: "visual", note: "Name files visual-1.png… in the same folder", layout: "grid" },
      { type: "gallery", heading: "Mobile Designs", match: "mobile", note: "Name files mobile-1.png… in the same folder", layout: "grid" },
    ],
  },
  {
    slug: "forecasting-in-pharma",
    category: "web-mobile",
    title: "Forecasting web app in Pharma",
    tag: "Pharma",
    gradient: ["#6e2f2f", "#cc8b7b"],
    summary:
      "A web application for the pharmaceutical domain to project the growth and scope of the industry over time, using predefined inputs and formulas.",
    blocks: [
      {
        type: "prose",
        heading: "Problem Statement",
        body: [
          "Design a web application for a pharmaceutical domain to project the growth and scope of the pharma industry over a period of time, using a set of predefined value inputs and formulas.",
        ],
      },
      {
        type: "prose",
        heading: "The Solution",
        body: [
          "Designed the web application by understanding the projection inputs, formulas and expectations. The design focused on simplifying the projection-calculation flow experience and providing better visual suggestions.",
        ],
      },
      {
        type: "meta",
        heading: "Deliverables",
        body: "User Personas, Information Architecture, User Flow Diagram, Low-Fidelity Wireframes, High-Fidelity Mock-up screens, Interactive Prototypes.",
      },
      { type: "gallery", heading: "Paper Sketches", match: "sketch", note: "Name files sketch-1.png… in public/projects/forecasting-in-pharma/", layout: "grid" },
      { type: "gallery", heading: "Wireframes", match: "wireframe", note: "Name files wireframe-1.png… in the same folder", layout: "grid" },
      { type: "gallery", heading: "Design Screens", match: "screen", note: "Name files screen-1.png… in the same folder", layout: "grid" },
    ],
  },
  {
    slug: "stock-market-app",
    category: "web-mobile",
    title: "App for Indian Stock Market",
    tag: "Fintech",
    gradient: ["#8a5a1f", "#d9b36a"],
    summary:
      "A user-friendly web application for the Indian stock market, providing simple, intuitive tools to help investors make informed decisions.",
    blocks: [
      {
        type: "prose",
        heading: "Problem Statement",
        body: [
          "Existing Indian stock-market web applications are often complex and lack features tailored to the Indian investor. This creates a barrier for many users and hinders informed decision-making. The goal: a user-friendly, accessible web application that empowers Indian investors of all experience levels.",
        ],
      },
      {
        type: "labeled",
        heading: "Design Solution",
        items: [
          { label: "Understanding User Needs", body: "Conducted user interviews and surveys with a diverse range of Indian stockholders to understand their goals, challenges, and tech savviness, and analysed behaviour on existing apps to identify pain points and opportunities." },
          { label: "Solid Information Architecture", body: "Developed a clear, logical sitemap and meticulously crafted user flows for common tasks — so users can seamlessly create watchlists, snapshots, portfolios and screeners." },
          { label: "Wireframes and Prototypes", body: "Created low-fidelity wireframes defining the core layout and functionality, then evolved them into interactive prototypes so users could test the interface and flow in a simulated environment." },
          { label: "Usability Testing", body: "Ran usability testing sessions with target users to unearth issues and areas for improvement, ensuring the application is intuitive and user-friendly." },
          { label: "Visual Design", body: "Designed a clean interface prioritising clear information hierarchy and intuitive navigation, with cultural sensitivities considered in visuals and colour." },
          { label: "Design Validation", body: "Transferred the designs to the development team and monitored implementation closely, ensuring the built screens accurately reflect the shared specifications." },
        ],
      },
      { type: "gallery", heading: "Visual Designs", note: "Real screens coming — drop images into public/projects/stock-market-app/", layout: "grid" },
    ],
  },

  // ─────────────────────────────── Icon Designs ───────────────────────────────
  {
    slug: "product-icon-suite",
    category: "icon-designs",
    title: "Product Icon Suite",
    tag: "Iconography",
    gradient: ["#31404f", "#8fb3c9"],
    summary:
      "A 120+ piece icon system for a SaaS product family — a consistent grid, stroke, and metaphor language across web and mobile.",
    blocks: [
      {
        type: "prose",
        body: [
          "A cohesive icon system built on a shared 24px grid with consistent stroke weight and corner treatment, so every glyph reads as part of one family across product surfaces.",
        ],
      },
      { type: "gallery", heading: "The Set", note: "Real icons coming — drop images into public/projects/product-icon-suite/", layout: "grid" },
    ],
  },
  {
    slug: "glyph-line-icon-library",
    category: "icon-designs",
    title: "Glyph & Line Icon Library",
    tag: "Iconography",
    gradient: ["#4a3b2e", "#c9a97f"],
    summary:
      "A dual-style icon library — filled glyphs and 1.5px line — on a 24px grid with pixel-perfect exports for design systems.",
    blocks: [
      {
        type: "prose",
        body: [
          "Two matched styles — solid glyph and 1.5px line — drawn on the same grid so teams can mix weights without breaking visual rhythm, exported pixel-perfect for handoff.",
        ],
      },
      { type: "gallery", heading: "The Library", note: "Real icons coming — drop images into public/projects/glyph-line-icon-library/", layout: "grid" },
    ],
  },

  // ─────────────────────────────── Art & Graphics ───────────────────────────────
  {
    slug: "character-illustrations",
    category: "art-graphics",
    title: "Character Illustrations",
    tag: "Illustration",
    gradient: ["#3f2f4f", "#b78fc9"],
    summary:
      "A personal series of hand-drawn characters — expressive figures and creatures exploring shape language and personality.",
    blocks: [
      {
        type: "prose",
        body: [
          "An ongoing personal practice — character studies exploring expression, silhouette, and personality, from quick sketches to finished pieces.",
        ],
      },
      { type: "gallery", heading: "Gallery", note: "Real artwork coming — drop images into public/projects/character-illustrations/", layout: "grid" },
    ],
  },
  {
    slug: "digital-paintings",
    category: "art-graphics",
    title: "Digital Paintings & Posters",
    tag: "Art",
    gradient: ["#4f2f2f", "#c98f8f"],
    summary:
      "Digital paintings and poster experiments — studies in colour, light, and composition from sketch to final render.",
    blocks: [
      {
        type: "prose",
        body: [
          "Painting studies and poster experiments — playing with colour, light, and mood, from loose underpainting to a finished render.",
        ],
      },
      { type: "gallery", heading: "Gallery", note: "Real artwork coming — drop images into public/projects/digital-paintings/", layout: "grid" },
    ],
  },

  // ─────────────────────────────── Fun Projects ───────────────────────────────
  {
    slug: "ping-pong-game",
    category: "fun-projects",
    title: "Game: Ping-Pong",
    tag: "Figma Prototype",
    gradient: ["#1f4d3a", "#6fbf95"],
    summary:
      "A playable Ping-Pong game designed entirely in Figma using variables and advanced prototyping logic.",
    blocks: [
      {
        type: "prose",
        heading: "Problem Statement",
        body: ["Design a Ping-Pong game in Figma using Variables and advanced prototyping logic."],
      },
      {
        type: "labeled",
        heading: "Solution — Components",
        items: [
          { label: "Ping-Pong Table", body: "The play surface the whole game runs on." },
          { label: "The Ball", body: "Set X and Y number variables to position the ball based on racket response and time." },
          { label: "Racket Bar", body: "Set X and Y number variables to move the bar based on Left/Right keys or arrow-button responses." },
          { label: "Score", body: "Set a number & text variable to count and display the score on the board." },
        ],
      },
      { type: "gallery", heading: "The Prototype", note: "Game mockup coming — drop images into public/projects/ping-pong-game/", layout: "single" },
    ],
  },
  {
    slug: "micro-interaction-experiments",
    category: "fun-projects",
    title: "Micro-interaction Experiments",
    tag: "Motion",
    gradient: ["#39424d", "#93a6b8"],
    summary:
      "A prototype playground for button states, transitions, and delight moments — testing how far small motion can carry an experience.",
    blocks: [
      {
        type: "prose",
        body: [
          "Small, self-contained motion studies — hover states, transitions, and delight moments — exploring how much a little movement can add to an interface.",
        ],
      },
      { type: "gallery", heading: "The Experiments", note: "Clips coming — drop images into public/projects/micro-interaction-experiments/", layout: "grid" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}
