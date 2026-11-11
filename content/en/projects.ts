import type { Experiment, Project } from "../types";

export const projects: Project[] = [
  {
    slug: "careergenai",
    title: "CareerGENAI",
    subtitle: "LLM Career Mentor",
    type: "Personal project",
    status: "Working prototype",
    period: "2025",
    role: "Solo: product, backend, frontend, and LLM integration",
    card: "A full-stack AI career mentor that reads résumé inputs, identifies skill gaps, and turns them into a learning roadmap.",
    problem:
      "Career advice is usually generic. A student can name a target role but rarely knows which gaps matter most or what to build next.",
    tech: ["Next.js", "FastAPI", "Gemini 2.5 Flash", "PostgreSQL", "Docker Compose", "Recharts"],
    visual: "careergenai",
    accent: "cyan",
    overview: [
      "CareerGENAI takes a résumé and a target direction and returns a skill profile, the gaps between that profile and the role, a learning roadmap, and project ideas that would close those gaps.",
      "I built it to see how far an LLM could go as a mentor when its output is treated like data, so the app can render it, store it, and come back to it, instead of as a block of chat text.",
    ],
    constraints: [
      "The model’s answer had to be machine-readable so the frontend could draw charts and roadmap steps from it.",
      "A résumé is personal data, so the pipeline should keep only what the results view needs.",
      "The whole stack needed to start with one command on a laptop for development and demos.",
    ],
    myRole: [
      "Designed a microservice-based architecture and the API surface.",
      "Built the FastAPI backend with separate parsing and recommendation services and mentor and health routers.",
      "Built the Next.js frontend and the results view with Recharts.",
      "Integrated Gemini 2.5 Flash with structured JSON responses and set up PostgreSQL and Docker Compose.",
    ],
    systemDesign: {
      intro:
        "Each stage does one job and hands a typed result to the next. That keeps prompts small and lets me test or replace a stage without touching the others.",
      steps: [
        { name: "Parse", detail: "Normalize résumé text into sections the later stages can read." },
        { name: "Extract skills", detail: "Ask the model for skills as structured JSON, not prose." },
        { name: "Analyze gaps", detail: "Compare the extracted profile with the target direction." },
        { name: "Plan roadmap", detail: "Turn gaps into ordered learning steps." },
        { name: "Suggest projects", detail: "Propose portfolio projects that exercise the missing skills." },
        { name: "Persist run", detail: "Store the result in PostgreSQL under a run ID that the results endpoint reads." },
      ],
      textEquivalent:
        "Text version of the diagram: the Next.js client sends a résumé to the FastAPI mentor router. The backend runs parsing, skill extraction, gap analysis, roadmap generation, and project suggestion in order, calling Gemini 2.5 Flash for structured JSON. The combined result is saved in PostgreSQL with a run ID, and the frontend loads it from a results endpoint to render charts and the roadmap.",
    },
    tradeoffs: [
      {
        title: "Structured output instead of free text",
        chose:
          "Each model call returns JSON that matches a schema, so the backend can validate it and the UI can render it directly.",
        cost: "Schemas constrain the model, and a malformed response has to be caught and handled instead of shown as-is.",
      },
      {
        title: "Persisted runs with a run ID",
        chose:
          "Generation and display are decoupled. The results page can be reloaded or revisited without calling the model again.",
        cost: "Storing runs means storing derived personal data, so retention and deletion become design questions.",
      },
    ],
    canShow: [
      {
        title: "Illustrative walkthrough",
        body: "The sample below uses a fictional résumé to show the shape of the output: input, skill analysis, and roadmap. It is not real model output.",
      },
      {
        title: "Architecture",
        body: "The pipeline diagram above reflects the services, routers, and storage in the codebase.",
      },
    ],
    next: [
      "Build a small labeled résumé set to measure skill-extraction accuracy instead of judging it by eye.",
      "Add run deletion and a retention window before any public deployment.",
      "Finish the AWS-ready deployment path.",
    ],
    links: [{ label: "View code", href: "https://github.com/kdy34/CareerGENAI-LLM" }],
  },
  {
    slug: "becayis",
    title: "BECAYIS",
    subtitle: "Civil Servant Relocation Matching",
    type: "Team capstone",
    status: "Completed capstone · platform concept",
    period: "2025",
    role: "Intelligent matching, backend logic, and API integration",
    card: "A software engineering capstone exploring how optimization could support relocation matching for Turkish civil servants.",
    problem:
      "In Türkiye, civil servants can relocate by swapping posts with a colleague who wants the reverse move, a process called becayiş. Finding a compatible partner by hand is slow, and the search gets harder once preferences and constraints stack up.",
    tech: ["React", "Spring Boot", "PostgreSQL", "Python", "PSO", "ACO"],
    visual: "becayis",
    accent: "iris",
    overview: [
      "BECAYIS (Biomimetic AI Supported Permutation Application) was my undergraduate capstone at Bahçeşehir University. Our team designed a relocation matching platform concept where civil servants describe where they are, where they want to go, and what they need, and the system proposes swap candidates.",
      "We explored nature-inspired (biomimetic) optimization, particle swarm and ant colony optimization, as ways to search for good matches when preferences and constraints make a simple lookup insufficient.",
    ],
    constraints: [
      "Matches had to respect hard constraints as well as softer preferences.",
      "The product and its documentation needed to work in Turkish and English.",
      "As a capstone, the work was scoped to a prototype and its design documentation, not a production service.",
    ],
    myRole: [
      "Focused on the intelligent matching approach and the biomimetic optimization behind it.",
      "Worked on backend logic and database planning for the matching flow.",
      "Integrated the matching logic with the rest of the system through APIs, with system usability in mind.",
    ],
    teamNote:
      "The React frontend, Spring Boot services, database design, and the project documentation (PDD, SDD, and UML) were team efforts.",
    systemDesign: {
      intro:
        "The optimization work ran as a Python component behind an API, so the Java backend could request matches without owning the search logic.",
      steps: [
        { name: "Collect", detail: "Users enter current post, desired locations, and constraints in the React app." },
        { name: "Store", detail: "Spring Boot validates requests and stores them in PostgreSQL." },
        { name: "Search", detail: "The Python service explores candidate matches with PSO and ACO." },
        { name: "Return", detail: "Ranked candidates go back through the API to the user." },
      ],
      textEquivalent:
        "Text version of the diagram: users submit their current post, desired locations, and constraints in a React app. A Spring Boot API stores the requests in PostgreSQL. A Python optimization service searches for compatible swap candidates using particle swarm and ant colony optimization and returns ranked candidates through the API.",
    },
    tradeoffs: [
      {
        title: "Metaheuristics instead of exact matching",
        chose:
          "Two-person swaps are easy to find directly, but preference scoring across many constraints grows quickly. PSO and ACO let us explore good candidates within a time budget.",
        cost: "Neither method guarantees the best possible match, so results need to be presented as suggestions.",
      },
      {
        title: "A separate Python optimization service",
        chose: "Python’s numeric tooling made it faster to experiment with search methods.",
        cost: "A second runtime adds an integration boundary, which is the part I worked on through APIs.",
      },
    ],
    canShow: [
      {
        title: "Synthetic illustration",
        body: "The visual uses made-up cities and requests to show how preferences and constraints shape a match. It does not represent real people or records.",
      },
      {
        title: "Design documentation",
        body: "The team produced a project definition document, a software design document, and UML models.",
      },
    ],
    next: [
      "Benchmark PSO and ACO against an exact baseline on the same synthetic dataset.",
      "Extend matching from pairs to multi-person swap chains.",
    ],
    links: [],
  },
  {
    slug: "robotic-receptionist",
    title: "Robotic Receptionist",
    subtitle: "Campus Human–Robot Interaction",
    type: "Team course project",
    status: "In progress · Fall 2026",
    period: "2026",
    role: "Computer vision and human–robot interaction requirements and scenarios",
    card: "A campus receptionist prototype that explores how people interact with a robot when asking for directions or student services.",
    problem:
      "Visitors to a university lobby ask the same questions again and again: where an office is, which floor a department is on, who can help with a student service. Staff are not always at the desk.",
    tech: ["Computer vision", "HRI", "Python", "scikit-learn"],
    visual: "receptionist",
    accent: "mint",
    overview: [
      "Our graduate team is prototyping a lobby receptionist for Bay Atlantic University that can greet visitors, answer common questions, give directions, identify the right department, and hand off to staff when it should.",
      "The project sits between AI and service design. Most of the hard questions are about when the robot should answer, when it should ask, and when it should step back.",
    ],
    constraints: [
      "Facts such as office locations must always be correct, so they cannot depend on a model’s guess.",
      "Visitors should be able to reach a human whenever the robot is unsure.",
      "Course scope: prototype demos and requirements, not a permanent installation.",
    ],
    myRole: [
      "Own the computer vision and human–robot interaction area of the project.",
      "Wrote the vision-related functional requirements (FR-V) and the interaction scenarios used in demos.",
    ],
    teamNote:
      "Teammates lead testing, UX, and documentation and data. Faculty and a mentor advise the project.",
    systemDesign: {
      intro:
        "The interaction loop separates what the robot notices, what it decides, and what it says, so each part can be tested on its own.",
      steps: [
        { name: "Notice", detail: "Vision detects that a visitor is approaching and ready to interact." },
        { name: "Understand", detail: "The visitor’s question is mapped to an intent such as directions or a service request." },
        { name: "Decide", detail: "Fixed rules answer factual questions; uncertain cases go to clarification." },
        { name: "Respond or escalate", detail: "The robot answers, asks a follow-up, or hands off to staff." },
      ],
      textEquivalent:
        "Text version of the diagram: a visitor approaches and asks a question. Vision detects the interaction, the question is mapped to an intent, and the decision layer either answers from fixed campus information, asks a clarifying question, or escalates to staff.",
    },
    tradeoffs: [
      {
        title: "Fixed rules for facts, learning for intent",
        chose:
          "Office locations and procedures are stored as fixed rules. Only intent recognition is learned, so a model error leads to a clarifying question rather than a wrong room number.",
        cost: "Every campus change has to be updated in the rules by hand.",
      },
    ],
    canShow: [
      {
        title: "Related course experiment",
        body: "In a separate Applied AI lab, I trained a small decision tree intent classifier on synthetic receptionist questions, tuned max_depth, read the learned rules, and compared it with an SVM. It is a classroom experiment, not the team prototype.",
      },
      {
        title: "Requirements and scenarios",
        body: "My vision requirements and interaction scenarios guide the prototype demos.",
      },
    ],
    next: [
      "Measure how often visitors need escalation in demo sessions.",
      "Test how wording affects whether people trust the robot’s directions.",
    ],
    links: [],
  },
];

export const moreProjects: Experiment[] = [
  {
    title: "Urban Risk DC",
    type: "Personal project",
    methods: "XGBoost · FastAPI · React · Mapbox",
    summary:
      "An analysis of Washington, DC traffic crash records with a gradient-boosted model, served through a FastAPI backend and explored on a Mapbox map.",
    tags: ["ML", "Geospatial", "Full stack"],
  },
];

export const publicCode: Experiment[] = [
  {
    title: "World Happiness Report analysis",
    href: "https://github.com/kdy34/World-Happiness-Report",
    type: "Personal project",
    methods: "Jupyter · preprocessing · modeling",
    summary: "Visualizes World Happiness Report data, prepares it for modeling, and builds and evaluates models.",
    tags: ["Data science"],
  },
  {
    title: "House price prediction",
    href: "https://github.com/kdy34/House-Price-Prediction-with-Tensorflow",
    type: "Personal project",
    methods: "TensorFlow · regression",
    summary: "A neural network regression model for house prices built while learning TensorFlow and Keras.",
    tags: ["Deep learning"],
  },
  {
    title: "Kaggle Titanic competition",
    href: "https://github.com/kdy34/Kaggle-Titanic-Competition",
    type: "Personal project",
    methods: "Feature engineering · classification",
    summary: "A Kaggle competition entry predicting passenger survival, from feature engineering through model evaluation.",
    tags: ["ML"],
  },
  {
    title: "Course management system",
    href: "https://github.com/kdy34/CourseManagementSystem",
    type: "Course project",
    methods: "Java · object-oriented design",
    summary: "A simple course management system written in Java.",
    tags: ["Software engineering"],
  },
];

export const experiments: Experiment[] = [
  {
    title: "Quora question topic modeling",
    type: "Course project",
    methods: "TF–IDF · NMF",
    summary: "Extracted 20 interpretable topics from a large Quora question corpus with TF–IDF features and non-negative matrix factorization.",
    tags: ["NLP"],
  },
  {
    title: "FRED time-series forecasting",
    type: "Course project",
    methods: "LSTM · sliding windows",
    summary: "Trained an LSTM on economic series from FRED using 12-step input windows to forecast the next value.",
    tags: ["Deep learning"],
  },
  {
    title: "Supervised model comparison",
    type: "Course project",
    methods: "Logistic regression · KNN · SVM · tree ensembles",
    summary: "Compared a logistic regression baseline with KNN, SVM, decision trees, random forests, and boosting, using macro F1 so minority classes counted.",
    tags: ["Evaluation"],
  },
  {
    title: "MySQL partitioning and fragmentation",
    type: "Course project",
    methods: "RANGE · LIST · HASH · EXPLAIN",
    summary: "Partitioned a synthetic 100,000-row table three ways, checked partition pruning with EXPLAIN, and designed vertical fragmentation across two AWS Regions.",
    tags: ["Databases"],
  },
  {
    title: "Graph queries in ArangoDB",
    type: "Course project",
    methods: "AQL traversal · shortest path",
    summary: "Wrote graph traversals for recommendations and shortest paths, and compared the model with a document store in MongoDB.",
    tags: ["Databases"],
  },
  {
    title: "AWS storage lab",
    type: "Course project",
    methods: "EBS · snapshots · S3 versioning",
    summary: "Resized an EBS volume and its filesystem, used incremental snapshots, restored S3 object versions, and set lifecycle rules with cost estimates.",
    tags: ["Cloud"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
