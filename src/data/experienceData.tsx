export type ExperienceCategory = "Work" | "Teaching" | "Organization" | "Research";

export type ExperienceItem = {
  id: string;
  category: ExperienceCategory;
  title: string; // Position, Role, or Project Title
  subtitle: string; // Organization, Company, Course, or Laboratory
  duration: string;
  description?: string; // Short description or Project overview
  responsibilities?: string[]; // Key responsibilities
  skills?: string[]; // Technologies, Skills used, or Skills developed
  achievements?: string[]; // Key achievements or Outcomes
  requirements?: string[]; // Requirements (for Research)
};

export const EXPERIENCE_CATEGORIES: ExperienceCategory[] = [
  "Work",
  "Teaching",
  "Organization",
  "Research",
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  // --- WORK EXPERIENCE ---
  {
    id: "work-1",
    category: "Work",
    title: "UI/UX Intern",
    subtitle: "Tarumanagara Enterprise",
    duration: "Apr 2025 — Jul 2025",
    description: "Contributed to the redesign of the enterprise portal, improving usability and modernizing the visual language.",
    responsibilities: [
      "Designed wireframes and interactive prototypes using Figma.",
      "Collaborated with developers to ensure accurate implementation.",
      "Conducted usability testing with real users.",
    ],
    skills: ["Figma", "UI/UX Design", "Usability Testing", "Tailwind CSS"],
    achievements: ["Increased user satisfaction score by 20%."],
  },
  {
    id: "work-2",
    category: "Work",
    title: "Frontend Developer (Freelance)",
    subtitle: "Creative Agency X",
    duration: "Jan 2024 — Mar 2024",
    description: "Developed responsive landing pages for various client campaigns.",
    responsibilities: [
      "Translated Figma designs into pixel-perfect Next.js components.",
      "Optimized web performance and accessibility.",
    ],
    skills: ["Next.js", "React", "TypeScript", "Framer Motion"],
  },

  // --- TEACHING EXPERIENCE ---
  {
    id: "teach-1",
    category: "Teaching",
    title: "Teaching Assistant",
    subtitle: "Web Development Course",
    duration: "Aug 2024 — Dec 2024",
    description: "Assisted professors in teaching foundational web technologies to a class of 40+ students.",
    responsibilities: [
      "Graded assignments and provided constructive feedback.",
      "Held weekly mentoring sessions for struggling students.",
      "Developed supplementary learning materials.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Mentoring", "Public Speaking"],
  },
  {
    id: "teach-2",
    category: "Teaching",
    title: "Laboratory Assistant",
    subtitle: "Computer Graphics Lab",
    duration: "Feb 2025 — Jun 2025",
    description: "Guided students through practical lab sessions focusing on rendering and modeling.",
    responsibilities: [
      "Prepared lab equipment and software environments.",
      "Demonstrated complex graphical concepts.",
    ],
    skills: ["Computer Graphics", "Leadership", "Technical Troubleshooting"],
  },

  // --- ORGANIZATION EXPERIENCE ---
  {
    id: "org-1",
    category: "Organization",
    title: "Junior Member (Publications & PR)",
    subtitle: "DPM-FTI UNTAR",
    duration: "Nov 2024 — May 2025",
    description: "Managed the organization's public image and social media presence.",
    responsibilities: [
      "Designed social media posts and event posters.",
      "Drafted press releases and managed external communications.",
    ],
    achievements: ["Grew Instagram following by 15% in 6 months."],
    skills: ["Graphic Design", "Social Media Management", "Copywriting"],
  },
  {
    id: "org-2",
    category: "Organization",
    title: "Event Coordinator",
    subtitle: "Tech Innovation Summit 2024",
    duration: "Jul 2024 — Oct 2024",
    description: "Core team member responsible for planning a university-wide tech summit.",
    responsibilities: [
      "Coordinated with guest speakers and sponsors.",
      "Managed event logistics and scheduling.",
    ],
    skills: ["Event Planning", "Team Collaboration", "Time Management"],
  },

  // --- RESEARCH & INNOVATION ---
  {
    id: "res-1",
    category: "Research",
    title: "EduBuddy - PKM Implementation",
    subtitle: "Universitas Tarumanagara",
    duration: "Apr 2025 — Present",
    description: "An innovative platform designed to connect students with peer mentors.",
    responsibilities: [
      "Developed the frontend interface for the MVP.",
      "Researched user engagement strategies.",
    ],
    skills: ["React", "UX Research", "Data Analysis"],
    achievements: ["Successfully deployed MVP for internal testing."],
    requirements: ["Must be highly accessible.", "Mobile-first approach."],
  },
  {
    id: "res-2",
    category: "Research",
    title: "NLP Sentiment Analysis Model",
    subtitle: "Independent Research Project",
    duration: "Sep 2024 — Dec 2024",
    description: "Created a sentiment analysis model to evaluate public opinion on tech trends.",
    responsibilities: [
      "Scraped data from Twitter using Python.",
      "Trained a machine learning model using TensorFlow.",
    ],
    skills: ["Python", "TensorFlow", "NLP", "Data Scraping"],
    achievements: ["Achieved 85% accuracy on the test dataset."],
  },
];
