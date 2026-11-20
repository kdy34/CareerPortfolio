import type { Credential, Education, Role, TimelineItem } from "../types";

export const education: Education[] = [
  {
    school: "Bay Atlantic University",
    degree: "M.S. in Artificial Intelligence Engineering",
    place: "Washington, DC",
    period: "Aug 2025 – May 2027 (expected)",
    notes: [
      "GPA 3.95 · President’s List, Fall 2025",
      "Coursework: Applied Statistics, Data Mining, Big Data and Analytics, Database Design Concepts, Introduction to Big Data, Management Information Systems",
      "In progress: Machine Learning and Pattern Recognition, Artificial Intelligence, Cloud Data Storage Management",
    ],
  },
  {
    school: "Bahçeşehir University",
    degree: "B.S. in Software Engineering",
    place: "Istanbul, Türkiye",
    period: "Aug 2020 – Jun 2025",
    notes: [
      "GPA 3.04",
      "Capstone: BECAYIS, a civil servant relocation matching platform where I led the AI work",
      "Exchange student at Bay Atlantic University, Washington, DC, Fall 2024 – Spring 2025",
      "Vice President, IEEE Bahçeşehir University Student Branch (Dec 2020 – Aug 2023)",
    ],
  },
];

export const roles: Role[] = [
  {
    org: "Panasonic",
    title: "Business Analyst Intern",
    place: "Istanbul, Türkiye",
    period: "May 2023 – Nov 2023",
    group: "work",
    highlight: "Automated ERP data validation, saving 10+ hours a week",
    points: [
      "Automated ERP data validation with SQL and Python, saving more than 10 hours of manual work per week and improving reporting accuracy by 30%.",
      "Wrote system documentation and data-flow diagrams that the team used as the main reference for ERP system upgrades.",
      "Analyzed process data to locate workflow bottlenecks between departments and proposed changes to remove them.",
    ],
  },
  {
    org: "Huawei",
    title: "Cloud Engineer Intern",
    place: "Istanbul, Türkiye",
    period: "Jan 2024 – Feb 2024",
    group: "work",
    highlight: "Python log analysis that cut operational overhead 15%",
    points: [
      "Worked with Huawei Cloud services (ECS, EVS, VPC, IAM) to support and tune enterprise cloud infrastructure for large clients.",
      "Wrote Python log-analysis tools that found redundant resources in a high-traffic application, cutting operational overhead by 15%.",
      "Diagnosed and resolved infrastructure bottlenecks, helping maintain 99.9% uptime over the internship.",
    ],
  },
  {
    org: "Bay Atlantic University",
    title: "Student Service Assistant",
    place: "Washington, DC",
    period: "May 2026 – Present",
    group: "work",
    points: ["Help students with campus services and point them to the right office or resource."],
  },
  {
    org: "Bay Atlantic University",
    title: "Vice President, Student Government Association",
    place: "Washington, DC",
    period: "Jan 2026 – Present",
    group: "leadership",
    points: [
      "Represent students in campus governance and coordinate with university leadership.",
      "Support student clubs and engagement, and gather student feedback through a campus satisfaction survey.",
    ],
  },
  {
    org: "IEEE Bahçeşehir University Student Branch",
    title: "Vice President",
    place: "Istanbul, Türkiye",
    period: "Dec 2020 – Aug 2023",
    group: "leadership",
    points: ["Helped organize technical workshops, hackathons, and summits for students."],
  },
  {
    org: "IEEE Türkiye Student Branches Computer Society",
    title: "Coordination Member",
    place: "Türkiye",
    period: "Oct 2021 – Sep 2022",
    group: "leadership",
    points: ["Coordinated Computer Society activities across student branches."],
  },
  {
    org: "Rotaract Club of Zekeriyaköy",
    title: "Member",
    place: "Istanbul, Türkiye",
    period: "Jan 2024 – Present",
    group: "leadership",
    points: ["Took part in club service and community projects."],
  },
  {
    org: "International Spy Museum",
    title: "Guest Experience Volunteer",
    place: "Washington, DC",
    period: "Feb 2026 – Sep 2026",
    group: "community",
    points: ["Welcomed and guided museum visitors."],
  },
  {
    org: "DevFest DC",
    title: "Volunteer",
    place: "George Mason University",
    period: "2025, 2026",
    group: "community",
    points: ["Supported the regional Google Developer Groups conference."],
  },
  {
    org: "DC Startup & Tech Week",
    title: "Volunteer",
    place: "Washington, DC",
    period: "2025, 2026",
    group: "community",
    points: ["Supported event operations, including the closing day at the International Trade Center."],
  },
  {
    org: "Lions Club Palisades",
    title: "Volunteer",
    place: "Washington, DC",
    period: "",
    group: "community",
    points: ["Helped with a community sandwich service and dinner."],
  },
  {
    org: "Cisco and World Wide Technology",
    title: "Career Discovery Week participant",
    place: "Washington, DC",
    period: "Mar 2026",
    group: "development",
    points: ["Completed a four-day career program on enterprise technology and consulting."],
  },
];

export const credentials: Credential[] = [
  { name: "Oracle Cloud Infrastructure Generative AI Certified Professional", issuer: "Oracle", date: "Jul 2024", kind: "Certification" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", date: "Oct 2025", kind: "Course certificate" },
  { name: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI", date: "Aug 2024", kind: "Course certificate" },
  { name: "Huawei Cloud Tech Essentials", issuer: "Huawei", date: "Apr 2024", kind: "Course certificate" },
  { name: "Generative AI: Introduction and Applications", issuer: "IBM", date: "Mar 2024", kind: "Course certificate" },
  { name: "UX Design and Principles", issuer: "University of Michigan", date: "Mar 2024", kind: "Course certificate" },
  { name: "Foundations of Project Management", issuer: "Google", date: "Oct 2023", kind: "Course certificate" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Machine learning", items: ["Python", "pandas", "NumPy", "scikit-learn", "PyTorch", "TensorFlow / Keras", "XGBoost"] },
  { group: "LLM and NLP", items: ["Gemini API", "Prompt engineering", "Structured outputs", "TF–IDF", "Topic modeling (NMF)", "Prompt-injection evaluation"] },
  { group: "Data", items: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "ArangoDB", "Redis", "Tableau", "Power BI"] },
  { group: "Engineering", items: ["FastAPI", "REST APIs", "Microservices", "Next.js", "React", "TypeScript", "Java / Spring Boot"] },
  { group: "MLOps and DevOps", items: ["Docker", "Kubernetes", "CI/CD", "Git / GitHub", "MLflow", "DVC", "Airflow", "Jupyter"] },
  { group: "Cloud", items: ["AWS (EBS, S3)", "Huawei Cloud (ECS, EVS, VPC, IAM)", "Oracle Cloud Infrastructure"] },
];

export const timeline: TimelineItem[] = [
  { year: "2020", place: "Istanbul", title: "B.S. Software Engineering begins", detail: "Bahçeşehir University. Became vice president of the IEEE student branch." },
  { year: "2023", place: "Istanbul", title: "Panasonic", detail: "Business Analyst Intern. Automated ERP data validation with SQL and Python." },
  { year: "2024", place: "Istanbul", title: "Huawei", detail: "Cloud Engineer Intern. Built Python log-analysis tools on Huawei Cloud." },
  { year: "2024", place: "Washington, DC", title: "Exchange year", detail: "Studied at Bay Atlantic University as an exchange student." },
  { year: "2025", place: "Washington, DC", title: "M.S. AI Engineering", detail: "Finished my B.S. in June, began my master’s in August, and made the President’s List that fall." },
  { year: "2026", place: "Washington, DC", title: "SGA Vice President", detail: "Student government, graduate research, and the robotic receptionist project." },
];
