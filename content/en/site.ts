import type { SiteProfile } from "../types";

export const profile: SiteProfile = {
  name: "Kutay Deniz Yazicioglu",
  shortMark: "KD",
  role: "AI Engineering graduate student",
  location: "Washington, DC area",
  eyebrow: "AI Engineering · Data Science · Cloud Computing · Washington, DC area",
  headline: "From raw data to working AI systems.",
  intro:
    "I am an AI Engineering graduate student at Bay Atlantic University. I build machine learning and LLM applications and bring them to life with data pipelines, APIs, and cloud software.",
  proof: [
    { label: "M.S. AI Engineering", value: "Bay Atlantic University" },
    { label: "Experience", value: "Panasonic and Huawei" },
    { label: "Campus leadership", value: "Student Government Association" },
    { label: "Graduate GPA 3.95", value: "President’s List, Fall 2025" },
  ],
  languages: ["English", "Turkish", "Spanish (beginner)"],
  links: {
    linkedin: "https://www.linkedin.com/in/kutay-deniz-yazicioglu/",
    github: "https://github.com/kdy34",
    email: "denizbes46@gmail.com",
    medium: "https://medium.com/@DenizYazicioglu1",
    resumePdf: "/kutay-deniz-yazicioglu-resume.pdf",
  },
  headshot: "/images/headshot.jpg",
  availability: "",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
] as const;

export const capabilities = [
  {
    title: "Applied AI and LLM applications",
    body: "I build prototypes that turn model outputs into features people can use, from structured recommendations to application workflows.",
    signal: "cyan",
  },
  {
    title: "Data science and analytics",
    body: "I use Python and SQL to prepare data, evaluate models, and explain the results behind a decision.",
    signal: "iris",
  },
  {
    title: "Cloud and software engineering",
    body: "I connect the model or data workflow to the rest of the product through APIs, databases, and containerized services.",
    signal: "mint",
  },
] as const;

export const hobbies = [
  { title: "Travel", body: "I travel solo and on a student budget, usually two to four nights per city, and go for local food and everyday life over landmarks. I have been to more than a dozen countries so far, and I write about budget travel on Medium.", signal: "cyan" },
  { title: "Kiteboarding", body: "I kiteboard whenever I can get to wind and water. It is a sport of reading conditions and adjusting quickly.", signal: "mint" },
  { title: "Swimming", body: "Swimming is how I reset and stay active during busy semesters.", signal: "iris" },
  { title: "Road trips", body: "Short, efficient drives with time for small towns, local spots, and whatever is worth a detour.", signal: "cyan" },
  { title: "Reading", body: "I read a bit of everything, from technical books to novels.", signal: "iris" },
  { title: "Writing", body: "Articles on software engineering, AI, cloud, and data science, alongside the travel pieces.", signal: "mint" },
] as const;

/** Photos in /public/images. Width/height are the real pixel sizes. */
export const photos = [
  {
    src: "/images/career-discovery-week.jpg",
    width: 720,
    height: 900,
    alt: "Kutay in a suit at a conference table during a business session",
    caption: "Cisco and World Wide Technology Career Discovery Week, Washington, DC, 2026",
  },
  {
    src: "/images/bay-atlantic-university.jpg",
    width: 427,
    height: 640,
    alt: "Kutay standing in front of the Bay Atlantic University crest",
    caption: "Bay Atlantic University, Washington, DC",
  },
  {
    src: "/images/rotaract-istanbul.jpg",
    width: 410,
    height: 351,
    alt: "Kutay in a suit in front of a wall listing Istanbul Rotaract clubs",
    caption: "Rotaract, Istanbul",
  },
] as const;
