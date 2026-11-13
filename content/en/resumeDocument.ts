/**
 * The web résumé, word for word as in the PDF (public/kutay-deniz-yazicioglu-resume.pdf).
 * Only the phone number is left off the web page. Update both together.
 */
export const resumeDocument = {
  name: "Kutay Deniz Yazicioglu",
  location: "Washington, DC, USA",
  email: "denizbes46@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kutay-deniz-yazicioglu/" },
    { label: "GitHub", href: "https://github.com/kdy34" },
    { label: "Medium", href: "https://medium.com/@DenizYazicioglu1" },
  ],
  headline: "AI Engineer | Data & Cloud-Focused",
  summary:
    "Graduate student in Artificial Intelligence Engineering at Bay Atlantic University with a B.Sc. in Software Engineering from Bahcesehir University. Experience in AI, data science, and cloud computing through internships at Panasonic as a Business Analyst Intern and Huawei as a Cloud Engineer Intern. In addition, projects that span machine learning, LLM-powered applications, and scalable system design include designing a microservice-based architecture and containerized services for modular scalable development. In addition to technical expertise, demonstrated leadership and communication excellence through roles in student government and public-facing volunteerism in Washington, DC. Focused on building practical AI-driven solutions with measurable impact and real business value.",
  experience: [
    {
      title: "Cloud Engineer Intern, Huawei",
      dates: "Jan 2024 – Feb 2024",
      place: "Istanbul, Turkey",
      bullets: [
        "Optimized enterprise cloud infrastructure by leveraging Huawei Cloud services (ECS, EVS, VPC, IAM), enhancing system reliability and performance for high-scale clients.",
        "Reduced operational overhead by 15 percent for a high-traffic application by developing Python-based log analysis tools to identify and eliminate resource redundancies.",
        "Streamlined troubleshooting processes by diagnosing and resolving complex infrastructure bottlenecks, ensuring 99.9 percent uptime during the internship period.",
      ],
    },
    {
      title: "Business Analyst Intern, Panasonic",
      dates: "May 2023 – Nov 2023",
      place: "Istanbul, Turkey",
      bullets: [
        "Accelerated operational efficiency by automating ERP data validation with SQL and Python, saving 10+ manual labor hours per week and improving reporting precision by 30 percent.",
        "Created comprehensive system documentation and data flow diagrams that served as the primary blueprint for ERP system upgrades.",
        "Identified and modeled business process optimizations using data-driven insights to resolve cross-departmental workflow bottlenecks.",
      ],
    },
  ],
  education: [
    { school: "Bay Atlantic University", dates: "Aug 2025 – May 2027", degree: "M.S. in AI Engineering, Washington, DC", note: "GPA: 3.95 | President’s List Academic Honor" },
    { school: "Bahcesehir University", dates: "Aug 2020 – Jun 2025", degree: "B.S. in Software Engineering, Istanbul, Turkey", note: "GPA: 3.04" },
  ],
  projects: [
    {
      title: "Career GENAI - AI-Powered Career Development Platform",
      slug: "careergenai",
      bullets: [
        "Developed an LLM-powered career assistant that analyzes resumes, identifies skill gaps and generates personalized learning roadmaps for targeted roles.",
        "Designed a microservice-based architecture using Python, FastAPI, Docker and LLM APIs to support modular and scalable AI application development.",
      ],
    },
    {
      title: "BECAYIS - Biomimetic AI Supported Permutation Application",
      slug: "becayis",
      bullets: [
        "Built an AI-supported relocation matching platform concept for civil servants, focusing on intelligent matching, backend logic and system usability.",
        "Integrated nature-inspired AI concepts (Biomimetic) with database planning and API-based system design to improve matching accuracy and platform scalability.",
      ],
    },
  ],
  technicalSkills: "Python, Data Science, AI, Machine Learning, SQL, LLM, Cloud Computing, AWS, Docker, CI/CD, Prompt Engineering, Tableau, Business Intelligence",
  coreCompetencies: "Public Speaking, Problem Solving, Communication, Leadership, Time Management, Teamwork",
  certifications: [
    "AWS Cloud Practitioner Essentials – (Oct 2025)",
    "Neural Networks and Deep Learning – (Aug 2024)",
    "Oracle Cloud Infrastructure Generative AI Certified Professional – (Jul 2024)",
    "Huawei Cloud Tech Essentials – (Apr 2024)",
    "IBM Generative AI Introduction and Applications – (Mar 2024)",
    "UX Design and Principles – (Mar 2024)",
    "Google Foundations of Project Management – (Oct 2023)",
  ],
  volunteering: [
    "Vice President, Student Government Association – (Jan 2026 – Present)",
    "Guest Experience Volunteer, International Spy Museum – (Feb 2026 – Present)",
    "Member, Zekeriyakoy Rotaract Club – (Jan 2024 – Present)",
    "Coordination Member, IEEE Turkey Student Branches Computer Society – (Oct 2021 – Sep 2022)",
    "Vice President, IEEE Bahcesehir University – (Dec 2020 – Aug 2023)",
  ],
  languages: "English, Turkish, Spanish (Beginner)",
};
