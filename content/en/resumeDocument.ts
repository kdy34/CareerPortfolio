/**
 * The web résumé, word for word as in the PDF (public/kutay-deniz-yazicioglu-resume.pdf).
 * Only the phone number is left off the web page. Update both together.
 * Source: KutayDenizYazicioglu_Resume_2.pdf (Nov 2026).
 */
export const resumeDocument = {
  name: "Kutay Deniz Yazicioglu",
  location: "Alexandria, VA",
  email: "denizbes46@gmail.com",
  links: [
    { label: "kutayyazicioglu.com", href: "https://www.kutayyazicioglu.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kutay-deniz-yazicioglu/" },
    { label: "GitHub", href: "https://github.com/kdy34" },
    { label: "Medium", href: "https://medium.com/@DenizYazicioglu1" },
  ],
  headline: "AI Engineer | Machine Learning, LLM Applications & Cloud",
  summary:
    "Graduate student in Artificial Intelligence Engineering at Bay Atlantic University with a B.S. in Software Engineering from Bahcesehir University. Experience in AI, data science, and cloud computing through internships at Panasonic as a Business Analyst Intern and Huawei as a Cloud Engineer Intern. Projects span machine learning, LLM applications, and scalable system design, including a microservice architecture built on containerized services. Demonstrated leadership and communication through student government and public-facing volunteer work in Washington, DC. Focused on building practical AI solutions with measurable impact and real business value.",
  experience: [
    {
      title: "Cloud Engineer Intern | Huawei",
      dates: "Jan 2024 - Feb 2024",
      place: "Istanbul, Turkey",
      bullets: [
        "Worked with Huawei Cloud services (ECS, EVS, VPC, IAM) to support and tune enterprise cloud infrastructure for large clients.",
        "Wrote Python log analysis tools that found redundant resources in a high-traffic application, cutting operational overhead by 15%.",
        "Diagnosed and resolved infrastructure bottlenecks, helping maintain 99.9% uptime over the internship period.",
      ],
    },
    {
      title: "Business Analyst Intern | Panasonic",
      dates: "May 2023 - Nov 2023",
      place: "Istanbul, Turkey",
      bullets: [
        "Automated ERP data validation with SQL and Python, saving 10+ hours of manual work per week and improving reporting accuracy by 30%.",
        "Wrote system documentation and data flow diagrams that the team used as the main reference for ERP system upgrades.",
        "Analyzed process data to locate workflow bottlenecks between departments and proposed changes to remove them.",
      ],
    },
  ],
  education: [
    {
      school: "Bay Atlantic University, Washington, DC",
      dates: "Aug 2025 - May 2027 (Expected)",
      degree: "M.S. in Artificial Intelligence Engineering | GPA: 3.95 | President’s List",
    },
    {
      school: "Bahcesehir University, Istanbul, Turkey",
      dates: "Aug 2020 - Jun 2025",
      degree: "B.S. in Software Engineering | GPA: 3.04",
    },
  ],
  projects: [
    {
      title: "CareerGENAI",
      subtitle: "LLM Career Mentor",
      tech: "Next.js, FastAPI, Gemini 2.5 Flash, PostgreSQL, Docker",
      slug: "careergenai",
      bullets: [
        "Built a solo LLM application that reads a resume, extracts skills, identifies gaps for a target role, and recommends projects and a learning roadmap.",
        "Split the FastAPI backend into separate parsing and recommendation services, used Gemini structured JSON output, stored each analysis run in PostgreSQL, and packaged the stack with Docker Compose.",
      ],
    },
    {
      title: "BECAYIS",
      subtitle: "Capstone, Civil Servant Relocation Matching",
      tech: "React, Spring Boot, PostgreSQL, Python",
      slug: "becayis",
      bullets: [
        "Led the AI work on a platform that matches Turkish civil servants who want to swap job locations, using a dataset of about 480 records.",
        "Implemented matching in Python with particle swarm and ant colony optimization and connected it to the Spring Boot and React application through REST APIs.",
      ],
    },
  ],
  research: [
    {
      title: "Prompt Injection in Cloud-Deployed LLM Applications",
      org: "Bay Atlantic University",
      dates: "2026 - Present",
      note: "Research paper, in progress",
      href: "/research",
      bullets: [
        "Investigating how vulnerable cloud-deployed LLM applications are to prompt injection, and which defense-in-depth strategies reduce attack success with minimal performance overhead.",
        "Covers threat detection, load balancing, and latency overhead in cloud deployments across a five-chapter paper, from problem statement and literature review through evaluation.",
      ],
    },
  ],
  technicalSkills: [
    { label: "Languages", items: "Python, SQL, Java, TypeScript" },
    {
      label: "Machine Learning & AI",
      items: "scikit-learn, PyTorch, TensorFlow/Keras, NumPy, pandas, NLP, LLM applications, Gemini API, Prompt Engineering",
    },
    {
      label: "Cloud & DevOps",
      items: "AWS, Oracle Cloud Infrastructure, Huawei Cloud, Docker, Kubernetes, CI/CD, Git/GitHub",
    },
    { label: "MLOps & Data", items: "MLflow, DVC, Airflow, Jupyter, Tableau, Power BI" },
    { label: "Backend & Web", items: "FastAPI, REST APIs, Microservices, Spring Boot, React, Next.js" },
    { label: "Databases", items: "PostgreSQL, MySQL, MongoDB" },
  ],
  certifications: [
    "AWS Cloud Practitioner Essentials, Amazon Web Services (Oct 2025)",
    "Neural Networks and Deep Learning (Aug 2024)",
    "Oracle Cloud Infrastructure Generative AI Certified Professional, Oracle (Jul 2024)",
    "Huawei Cloud Tech Essentials, Huawei (Apr 2024)",
    "IBM Generative AI: Introduction and Applications, IBM (Mar 2024)",
    "UX Design and Principles (Mar 2024)",
    "Foundations of Project Management, Google (Oct 2023)",
  ],
  leadership: [
    { role: "Vice President, Student Government Association, Bay Atlantic University", dates: "Jan 2026 - Present" },
    { role: "Student Service Assistant, Bay Atlantic University", dates: "May 2026 - Present" },
    { role: "Guest Experience Volunteer, International Spy Museum", dates: "Feb 2026 - Sep 2026" },
    { role: "Volunteer, DC Startup & Tech Week", dates: "2025, 2026" },
    { role: "Member, Zekeriyakoy Rotaract Club", dates: "Jan 2024 - Present" },
    { role: "Coordination Member, IEEE Turkey Student Branches Computer Society", dates: "Oct 2021 - Sep 2022" },
    { role: "Vice President, IEEE Bahcesehir University Student Branch", dates: "Dec 2020 - Aug 2023" },
  ],
  languages: "Turkish (Native), English (Fluent), Spanish (Beginner)",
};
