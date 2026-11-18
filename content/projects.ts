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
  /** Quick-facts bar under the hero (Role, Platform, Domain, Scope…). */
  | { type: "metaBar"; items: { label: string; value: string }[] }
  /** Slim horizontal process flow — credibility, not the main content. */
  | { type: "process"; heading: string; note?: string; steps: string[] }
  /**
   * A narrative beat: a heading + copy paired with real design screens.
   * - "wide": image(s) full-width below the copy (flow map, IA, mobile strip)
   * - "side": copy and image side-by-side; `flip` puts the image on the left
   */
  | {
      type: "feature";
      label?: string;
      title: string;
      body: string[];
      images: string[];
      layout?: "wide" | "side";
      flip?: boolean;
    }
  /** Outcome strip — qualitative result statements. */
  | { type: "impact"; heading: string; items: { stat: string; label: string }[] }
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Lead UX / UI Designer" },
          { label: "Platform", value: "Web · iOS · Android" },
          { label: "Domain", value: "Medical Education" },
          { label: "Scope", value: "Research → UI → Handoff" },
        ],
      },
      {
        type: "prose",
        body: [
          "A web and mobile application for a medical university to streamline classroom activities — empowering staff to prepare and conduct classes more efficiently, and enabling students to join, participate, and digitally track their overall progress.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "Classroom life was scattered across disconnected tools — slides in one place, attendance on paper, quizzes improvised on the spot, and feedback lost the moment class ended. Nothing linked preparation, live teaching, and follow-up, and students had no single view of where they stood.",
          "The brief: design one system that works both online and offline, for two very different users — busy faculty preparing and running sessions, and students trying to keep up and track their progress.",
        ],
      },
      {
        type: "process",
        heading: "Approach",
        note: "A full design-thinking pass — field research through to developer handoff — kept lightweight so the product story, not the process, stays in focus.",
        steps: ["Empathise", "Define", "Ideate", "Prototype", "Test", "Design", "Handoff"],
      },
      {
        type: "meta",
        heading: "Deliverables",
        body: "User Personas, Mind-map, Information Architecture, User Flows, Low-Fidelity Wireframes, High-Fidelity Mockups, Interactive Prototypes, Style Guide.",
      },
      {
        type: "feature",
        label: "Discovery",
        layout: "wide",
        title: "Mapping the whole classroom journey",
        body: [
          "Interviews with staff and students, plus observing live classes, surfaced every task a class actually touches. I captured it as a single mind-map — from preparing lectures to taking attendance, running in-class activities, and evaluating performance — so the team could see the full scope before a single screen was drawn.",
        ],
        images: [oc(1)],
      },
      {
        type: "feature",
        label: "Information Architecture",
        layout: "wide",
        title: "Giving the product a backbone",
        body: [
          "The mind-map became a clear structure: what lives in the web app for preparation and evaluation, what belongs on mobile for in-the-moment actions, and how the staff and student journeys branch from one shared core.",
        ],
        images: [oc(2)],
      },
      {
        type: "prose",
        heading: "The Solution",
        body: [
          "Rather than a feature list, the design is organised around the three moments that matter most in a class — before it starts, while it runs, and after it ends.",
        ],
      },
      {
        type: "feature",
        label: "01 — Before class",
        layout: "side",
        title: "Prepare once, teach anywhere",
        body: [
          "A single dashboard pulls together the next session, course progress, pending documents and announcements. Staff upload lecture materials and set pre-class assessments ahead of time, so students arrive already primed — and so nothing has to be assembled live in the room.",
        ],
        images: [oc(3)],
      },
      {
        type: "feature",
        label: "02 — In the classroom",
        layout: "side",
        flip: true,
        title: "Turn a lecture into a conversation",
        body: [
          "Recorded sessions, attached documents and threaded Q&A all live on one lecture page. Digital attendance and in-class quizzes or polls keep students active and give staff real-time feedback on who is actually following along — online or in the room.",
        ],
        images: [oc(4)],
      },
      {
        type: "feature",
        label: "03 — After class",
        layout: "side",
        title: "Personalised follow-up & progress",
        body: [
          "Assignments are tailored to each student, and live quiz results feed straight into evaluation and performance analysis. The loop closes: both staff and students can see progress build up over time, instead of it vanishing when the bell rings.",
        ],
        images: [oc(5)],
      },
      {
        type: "feature",
        label: "On mobile",
        layout: "wide",
        title: "The classroom in their pocket",
        body: [
          "The companion app keeps the essentials one tap away — joining a session, marking attendance, answering live quizzes, and checking documents and announcements — and holds up whether the connection does or not.",
        ],
        images: [oc(7)],
      },
      {
        type: "feature",
        label: "Validation",
        layout: "wide",
        title: "Tested with the people who'd use it",
        body: [
          "Usability sessions with staff and students shaped the final flows. Structured response analysis flagged exactly where attendance and task instructions were unclear, and the designs were iterated until those paths became obvious.",
        ],
        images: [oc(6)],
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "One system", label: "replaced scattered slides, paper attendance and ad-hoc quizzes with a single connected flow." },
          { stat: "Web + 2 apps", label: "designed and handed off for web, iOS and Android from one source of truth." },
          { stat: "Online + offline", label: "the same curriculum runs either way, so a dropped connection never stops a class." },
        ],
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
