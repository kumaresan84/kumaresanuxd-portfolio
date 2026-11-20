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
  /** Prominent call-to-action button (e.g. a playable prototype link). */
  | { type: "cta"; label: string; href: string; note?: string }
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Lead UX / UI Designer" },
          { label: "Platform", value: "Web · iOS · Android" },
          { label: "Domain", value: "Freight & Logistics" },
          { label: "Scope", value: "Research → UI → Handoff" },
        ],
      },
      {
        type: "prose",
        body: [
          "A freight marketplace that connects shippers and carriers across North America. The client is an innovation leader in truck brokerage and less-than-truckload transportation — a supply-chain partner to blue-chip companies, with a network of roughly 749 locations and 43,000 employees moving goods through advanced technology.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "Two very different audiences lived on the same platform and needed completely different things. Shippers wanted a fast, secure way to get a quote, find the right carrier, and track an order to delivery. Carriers wanted an intelligent load board that surfaced well-paying loads near them and kept them coming back.",
          "The job was a strong, shared UX foundation that could serve large, medium and small shippers, carriers and fleet owners — consistently across web and mobile.",
        ],
      },
      {
        type: "labeled",
        heading: "Two sides of one marketplace",
        items: [
          { label: "Shippers", body: "Businesses moving commodities from one place to another — after a quick quote, the right carrier, and visibility until the shipment lands." },
          { label: "Carriers", body: "Owner-operators and fleets providing the trucks — after high-paying loads in their area, booked with as little friction as possible." },
        ],
      },
      {
        type: "process",
        heading: "Approach",
        note: "Grounded in research, then carried from personas and journeys all the way to a tested, developer-ready UI.",
        steps: ["Research", "Personas", "Journeys", "IA", "Wireframes", "Prototype", "Usability Test", "Handoff"],
      },
      {
        type: "meta",
        heading: "Deliverables",
        body: "User Personas, Information Architecture, User Flow Diagrams, Experience Canvas, Low-Fidelity Wireframes, High-Fidelity Mockups, Interactive Prototypes.",
      },
      {
        type: "feature",
        label: "The Solution",
        layout: "wide",
        title: "One platform, from desk to cab",
        body: [
          "Shippers get a clean web portal to re-order in a tap, compare truckload rates, and watch shipments move on a live map. Carriers get a mobile load board that ranks loads by pay and proximity, books in a couple of taps, and tracks every active haul — so the best work is always the easiest to find.",
        ],
        images: ["/projects/logistics-app/screen-1.png"],
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "~749 locations", label: "designed for a brokerage network of roughly 749 locations and 43,000 employees moving freight daily." },
          { stat: "3 platforms", label: "one connected experience delivered across web, iOS and Android from a shared foundation." },
          { stat: "#1 carrier app", label: "the carrier mobile app ranked top by users on both iOS and Android — driving a clear shift in revenue and onboarding." },
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Lead UX / UI Designer" },
          { label: "Platform", value: "Web Admin · Mobile App" },
          { label: "Domain", value: "SaaS · Survey Tech" },
          { label: "Scope", value: "Flows → UI → Handoff" },
        ],
      },
      {
        type: "prose",
        body: [
          "A web platform to create, distribute and manage mobile surveys at scale — authoring questionnaires, pushing them to targeted device groups, and turning incoming responses into clear, actionable analytics.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "One platform had to do three jobs well for very different moments: let a team build a survey without touching code, reach large and widely-distributed groups of respondents across a range of devices, and make the results that flood back easy to read and act on.",
          "The hard part was keeping authoring genuinely simple while the system underneath stayed powerful — logic, targeting, device groups and analytics all in reach without overwhelming the person building a questionnaire.",
        ],
      },
      {
        type: "process",
        heading: "Approach",
        note: "From flows and grayscale wireframes through to a full visual system and developer handoff.",
        steps: ["Flows", "Wireframes", "Visual Design", "Prototype", "Handoff"],
      },
      {
        type: "gallery",
        heading: "Wireframes",
        images: [
          "/projects/mobile-survey-admin-system/wireframe-1.png",
          "/projects/mobile-survey-admin-system/wireframe-2.png",
          "/projects/mobile-survey-admin-system/wireframe-4.png",
          "/projects/mobile-survey-admin-system/wireframe-5.png",
        ],
        layout: "grid",
      },
      {
        type: "prose",
        heading: "The Solution",
        body: [
          "The platform is organised around the lifecycle of a survey — build it, manage it, send it, and answer it — each step designed so the complex part stays out of the way until it's needed.",
        ],
      },
      {
        type: "feature",
        label: "Author",
        layout: "side",
        title: "Build a survey, visually",
        body: [
          "A visual questionnaire builder lets teams assemble questions, set response types and add branching logic directly on the canvas — no code, no spreadsheets. Empty states guide the first question, so a blank project never feels intimidating.",
        ],
        images: ["/projects/mobile-survey-admin-system/visual-2.png"],
      },
      {
        type: "feature",
        label: "Manage",
        layout: "side",
        flip: true,
        title: "Every project in one place",
        body: [
          "A clear project workspace keeps surveys, status and ownership legible at a glance — so teams running many studies at once always know what's live, what's draft, and what needs attention.",
        ],
        images: ["/projects/mobile-survey-admin-system/visual-4.png"],
      },
      {
        type: "feature",
        label: "Distribute",
        layout: "side",
        title: "Publish to the right devices",
        body: [
          "Surveys are pushed to targeted device groups, so the right respondents get the right questionnaire — the moment where a tool for a handful of testers becomes a platform for large, distributed audiences.",
        ],
        images: ["/projects/mobile-survey-admin-system/visual-9.png"],
      },
      {
        type: "feature",
        label: "Respond",
        layout: "wide",
        title: "In the respondent's hands",
        body: [
          "On the other end, the companion mobile app makes answering effortless — a focused, one-question-at-a-time flow that works for large groups out in the field, not just at a desk.",
        ],
        images: ["/projects/mobile-survey-admin-system/Mobile-1.png"],
      },
      {
        type: "gallery",
        heading: "More of the system",
        images: [
          "/projects/mobile-survey-admin-system/visual-1.png",
          "/projects/mobile-survey-admin-system/visual-6.png",
          "/projects/mobile-survey-admin-system/visual-8.png",
          "/projects/mobile-survey-admin-system/visual-10.png",
        ],
        layout: "grid",
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "1 platform", label: "authoring, distribution and analytics unified instead of stitched across separate tools." },
          { stat: "2 surfaces", label: "a web admin for teams and a mobile app for respondents, designed as one system." },
          { stat: "Built to scale", label: "surveys reach large, widely-distributed respondent groups across a range of devices." },
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Lead UX / UI Designer" },
          { label: "Platform", value: "Web Application" },
          { label: "Domain", value: "Pharma · Forecasting" },
          { label: "Scope", value: "Paper → UI → Prototype" },
        ],
      },
      {
        type: "prose",
        body: [
          "A web application for the pharmaceutical domain that projects the growth and scope of the industry over time — turning a set of predefined inputs and formulas into forecasts teams can actually reason about.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "Forecasting here isn't one number — it's datasets, reconciliation, segmentation and formula-heavy projections, each feeding the next. Done wrong, that becomes an intimidating wall of tables and fields.",
          "The goal was to simplify the projection-calculation flow and give it a clear visual language, so analysts could move from raw data to a defensible forecast without losing the thread.",
        ],
      },
      {
        type: "meta",
        heading: "Deliverables",
        body: "User Personas, Information Architecture, User Flow Diagrams, Paper Sketches, Low-Fidelity Wireframes, High-Fidelity Mockups, Interactive Prototypes.",
      },
      {
        type: "feature",
        label: "Process · 01 Paper",
        layout: "wide",
        title: "Thinking it through on paper",
        body: [
          "A formula-driven product lives or dies on its structure, so the work started in a notebook — sketching how datasets, segments and projections connect before a pixel was placed. Cheap to draw, cheap to throw away.",
        ],
        images: ["/projects/forecasting-in-pharma/sketch-1.png"],
      },
      {
        type: "feature",
        label: "Process · 02 Wireframe",
        layout: "wide",
        title: "Pressure-testing the flow in grayscale",
        body: [
          "The sketches became mid-fidelity wireframes to settle the hard parts — data filtering, the dataset structure, the segmentation tree and inline commenting — in black and white, where layout and logic could be judged without colour getting a vote.",
        ],
        images: [
          "/projects/forecasting-in-pharma/wireframe-1.png",
          "/projects/forecasting-in-pharma/wireframe-4.png",
        ],
      },
      {
        type: "prose",
        heading: "The Solution — FORESIGHT",
        body: [
          "The final product, FORESIGHT, walks analysts through a clear workflow: define the data, reconcile it with context, then forecast and report — each stage a distinct, calm step rather than one overwhelming screen.",
        ],
      },
      {
        type: "feature",
        label: "01 — Define",
        layout: "side",
        title: "Start with clean data",
        body: [
          "Analysts import or define a dataset up front, with the structure laid out in a readable table. Getting the inputs right here is what makes every downstream projection trustworthy.",
        ],
        images: ["/projects/forecasting-in-pharma/Screen-1.png"],
      },
      {
        type: "feature",
        label: "02 — Reconcile",
        layout: "side",
        flip: true,
        title: "Reconcile with context, not guesswork",
        body: [
          "Data reconciliation sits alongside threaded comments and an activity trail, so the reasoning behind every adjustment stays attached to the numbers — essential when a forecast has to be defended later.",
        ],
        images: ["/projects/forecasting-in-pharma/Screen-3.png"],
      },
      {
        type: "feature",
        label: "03 — Forecast",
        layout: "side",
        title: "One home for every forecast",
        body: [
          "A module dashboard brings forecasts, portfolios, reports and consolidation together — so an analyst always knows where they are in the process and what's left to do.",
        ],
        images: ["/projects/forecasting-in-pharma/Screen-5.png"],
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "4-stage flow", label: "define → reconcile → forecast → report, unified in one guided application." },
          { stat: "3 fidelities", label: "pressure-tested on paper and in grayscale wireframes before the hi-fi UI shipped." },
          { stat: "1 source of truth", label: "every projection traces back to one reconciled dataset, with reasoning attached." },
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "UI / Icon Designer" },
          { label: "Discipline", value: "Iconography" },
          { label: "System", value: "24px grid · single stroke" },
          { label: "Scale", value: "120+ icons" },
        ],
      },
      {
        type: "prose",
        body: [
          "A cohesive icon system built on a shared 24px grid with consistent stroke weight and corner treatment, so every glyph reads as part of one family across product surfaces.",
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "UI / Icon Designer" },
          { label: "Discipline", value: "Iconography" },
          { label: "System", value: "24px grid · dual-style" },
          { label: "Output", value: "Pixel-perfect SVG" },
        ],
      },
      {
        type: "prose",
        body: [
          "Two matched styles — solid glyph and 1.5px line — drawn on the same grid so teams can mix weights without breaking visual rhythm, exported pixel-perfect for handoff.",
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Illustrator" },
          { label: "Discipline", value: "Character Design" },
          { label: "Medium", value: "Hand-drawn" },
          { label: "Status", value: "Ongoing series" },
        ],
      },
      {
        type: "prose",
        body: [
          "An ongoing personal practice — character studies exploring expression, silhouette, and personality, from quick sketches to finished pieces.",
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Illustrator" },
          { label: "Discipline", value: "Digital Painting" },
          { label: "Medium", value: "Digital" },
          { label: "Focus", value: "Colour · light · composition" },
        ],
      },
      {
        type: "prose",
        body: [
          "Painting studies and poster experiments — playing with colour, light, and mood, from loose underpainting to a finished render.",
        ],
      },
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
        type: "metaBar",
        items: [
          { label: "Role", value: "Designer / Prototyper" },
          { label: "Tool", value: "Figma — no code" },
          { label: "Technique", value: "Variables · conditional logic" },
          { label: "Type", value: "Playable prototype" },
        ],
      },
      {
        type: "cta",
        label: "Play the prototype",
        href: "https://www.figma.com/proto/s8GT4SRB45uQsTI59rjknG/Portfolio-2024?node-id=590-717&page-id=105%3A68&starting-point-node-id=590%3A683&scaling=contain&content-scaling=fixed",
        note: "Opens in Figma · use ← / → keys or the on-screen buttons to move the paddle",
      },
      {
        type: "prose",
        body: [
          "A fully playable Ping-Pong game built entirely in Figma — no code, no plugins. Variables and conditional prototyping drive real-time ball motion, wall and paddle collisions, live scoring, and a game-over state.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "Could Figma's prototyping engine — made for screen-to-screen flows — actually run a real-time game? One where a ball moves every frame, bounces off the walls and the paddle, keeps score, and ends the round on a miss, with nothing but variables and conditional interactions.",
        ],
      },
      {
        type: "feature",
        label: "The game",
        layout: "wide",
        title: "Simple to play, tricky to build",
        body: [
          "The ball drops and rallies off a paddle you slide left and right — with the arrow keys or the on-screen buttons. Every clean hit adds to the score; miss, and it's game over. All of it runs live inside a Figma prototype.",
        ],
        images: ["/projects/ping-pong-game/gameplay.webp"],
      },
      {
        type: "labeled",
        heading: "Built on variables",
        items: [
          { label: "Xval · Yval", body: "The ball's live position, nudged 8px on every tick to animate motion." },
          { label: "fw", body: "Horizontal direction flag — flips the ball back when it reaches the left or right wall." },
          { label: "Up", body: "Vertical direction flag — flips when the ball hits the ceiling or the paddle." },
          { label: "left", body: "The paddle's X position, moved in steps and clamped so it can't leave the table." },
          { label: "Scoreval", body: "The score — adds 10 on every successful paddle hit and updates the board." },
          { label: "C2 · Game over", body: "Ball colour switches on a hit for feedback; a boolean ends the round on a miss." },
        ],
      },
      {
        type: "prose",
        heading: "The game loop",
        body: [
          "The trick is a one-millisecond \"after delay → navigate to the same frame\" interaction, which turns the prototype into a game loop. Each tick re-evaluates a stack of conditional rules — move the ball, test the walls, test the paddle, update the score — then loops back and runs again, dozens of times a second.",
        ],
      },
      {
        type: "gallery",
        heading: "Under the hood",
        images: [
          "/projects/ping-pong-game/logic-motion.webp",
          "/projects/ping-pong-game/logic-score.webp",
          "/projects/ping-pong-game/logic-controls.webp",
        ],
        layout: "grid",
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "0 lines of code", label: "a real-time game running purely on Figma variables and conditional prototyping." },
          { stat: "8 variables", label: "position, direction, paddle, score, colour and state — the whole engine in a handful of values." },
          { stat: "1ms loop", label: "a self-navigating frame delay doubles as a game loop ticking many times a second." },
        ],
      },
      {
        type: "cta",
        label: "Play the prototype",
        href: "https://www.figma.com/proto/s8GT4SRB45uQsTI59rjknG/Portfolio-2024?node-id=590-717&page-id=105%3A68&starting-point-node-id=590%3A683&scaling=contain&content-scaling=fixed",
      },
    ],
  },
  {
    slug: "analog-clock",
    category: "fun-projects",
    title: "Analog Clock",
    tag: "Figma + Variables",
    gradient: ["#1c2a3a", "#7f8fa6"],
    summary:
      "A live analog clock that keeps real time — built with nothing but Figma design, variables, conditional logic, and a plugin loop.",
    blocks: [
      {
        type: "metaBar",
        items: [
          { label: "Role", value: "Designer / Prototyper" },
          { label: "Tool", value: "Figma + plugin" },
          { label: "Technique", value: "Variables · conditional logic" },
          { label: "Type", value: "Live demo" },
        ],
      },
      {
        type: "prose",
        body: [
          "A working analog clock, built entirely inside Figma — no front-end code. Three time variables, a stack of conditional rules, and a small plugin that ticks once a second keep the hour, minute, and second hands pointing at the real time.",
        ],
      },
      {
        type: "prose",
        heading: "The Challenge",
        body: [
          "Figma draws static pictures. Could it instead run a clock — hands that sweep to the correct angle, roll a full minute into the next, carry an hour at midnight, and keep doing it indefinitely — using only variables and the kind of logic meant for screen-to-screen prototypes?",
        ],
      },
      {
        type: "feature",
        label: "The result",
        layout: "side",
        title: "A clock that actually ticks",
        body: [
          "Every second, the hands move. The orange second hand sweeps the face, the minute hand steps forward, and the hour hand drifts along with it. The digital readout below mirrors the same variables, so the two never disagree.",
        ],
        images: ["/projects/analog-clock/clock.webp"],
      },
      {
        type: "labeled",
        heading: "Built on variables",
        items: [
          { label: "Hour · Minute · Second", body: "Three number variables hold the live time — the single source of truth the whole clock reads from." },
          { label: "Carry logic", body: "When Second hits 60 it resets and bumps Minute; when Minute hits 60 it resets and bumps Hour; Hour wraps at 12." },
          { label: "Hand position", body: "Each variable maps to a hand angle — the minute value nudges the hour hand forward in steps, so it never jumps." },
          { label: "Component variants", body: "The hands are component sets with a variant for every position; the time variables simply select the matching one." },
        ],
      },
      {
        type: "prose",
        heading: "The time engine",
        body: [
          "A small plugin — \"Update Time Variables\" — runs a one-second loop. On every tick it re-evaluates the conditional chain: add a second, carry into minutes, carry into hours, wrap at twelve. The updated values flow straight into the hands and the digital display, so the clock advances on its own without a single line of app code.",
        ],
      },
      {
        type: "gallery",
        heading: "Under the hood",
        images: [
          "/projects/analog-clock/logic-time.webp",
          "/projects/analog-clock/ticks-hours.webp",
          "/projects/analog-clock/ticks-minutes.webp",
        ],
        layout: "grid",
      },
      {
        type: "impact",
        heading: "Outcome",
        items: [
          { stat: "Ticks every second", label: "a plugin-driven loop keeps the clock live and self-updating, hands and digits in sync." },
          { stat: "Pure Figma", label: "design, variables, conditional logic and one plugin — no front-end code anywhere." },
          { stat: "Every angle pre-built", label: "hour, minute and second hands are variant sets; the time just picks the right position." },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}
