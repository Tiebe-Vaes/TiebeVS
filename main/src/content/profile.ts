import type { Localized } from "./types"

export const SITE_URL = "https://tiebe.vercel.app"

export const profile = {
  name: "Tiebe Vaes",
  role: { nl: "Full-stack developer", en: "Full-stack developer" } satisfies Localized,
  stack: ["TypeScript", "React", "Next.js", "Java", "Spring Boot"],
  email: "tiebevaes@gmail.com",
  location: { nl: "2660 Hoboken, België", en: "2660 Hoboken, Belgium" } satisfies Localized,
  links: {
    github: "https://github.com/Tiebe-Vaes",
    githubUser: "Tiebe-Vaes",
    linkedin: "https://www.linkedin.com/in/tiebevaes",
  },
}

// Newest first: the degree is completed in Oslo after the semesters at AP.
export const education: { title: Localized; detail?: Localized; period: Localized; place: string }[] = [
  {
    title: {
      nl: "Toegepaste Informatica (software), OsloMet",
      en: "Applied Computer Science (software), OsloMet",
    },
    detail: {
      nl: "Laatste semester via Erasmus, diploma in juni 2027.",
      en: "Final semester through Erasmus, degree in June 2027.",
    },
    period: { nl: "jan – jun 2027", en: "Jan – Jun 2027" },
    place: "Oslo",
  },
  {
    title: {
      nl: "Toegepaste Informatica (software), AP Hogeschool",
      en: "Applied Computer Science (software), AP University of Applied Sciences",
    },
    period: { nl: "sep 2024 – dec 2026", en: "Sep 2024 – Dec 2026" },
    place: "Antwerpen",
  },
  {
    title: {
      nl: "Boekhouden-Informatica, H. Pius X-Instituut",
      en: "Accounting & IT, H. Pius X Institute",
    },
    period: { nl: "2022 – 2024", en: "2022 – 2024" },
    place: "Wilrijk",
  },
  {
    title: {
      nl: "Wetenschappen, H. Pius X-Instituut",
      en: "Sciences, H. Pius X Institute",
    },
    period: { nl: "2018 – 2022", en: "2018 – 2022" },
    place: "Wilrijk",
  },
]

export const skillGroups: { label: Localized; items: string[] }[] = [
  {
    label: { nl: "Talen", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Java", "C#", "Dart", "SQL", "HTML", "CSS"],
  },
  {
    label: { nl: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: { nl: "Mobiel", en: "Mobile" },
    items: ["React Native", "Expo", "Flutter"],
  },
  {
    label: { nl: "Backend", en: "Backend" },
    items: ["Spring Boot", "Node.js", "Express", ".NET"],
  },
  {
    label: { nl: "Data", en: "Data" },
    items: ["MySQL", "PostgreSQL", "Firebase"],
  },
  {
    label: { nl: "DevOps en tools", en: "DevOps and tools" },
    items: ["Docker", "Traefik", "Git", "GitHub", "GitLab", "Vercel"],
  },
  {
    label: { nl: "Testen", en: "Testing" },
    items: ["JUnit 5", "Jest", "Vitest"],
  },
]

// CEFR level; share is the bar fill (C2 is the top of the scale).
export const spokenLanguages: { name: Localized; level: "C2" | "C1"; share: number }[] = [
  { name: { nl: "Nederlands", en: "Dutch" }, level: "C2", share: 100 },
  { name: { nl: "Engels", en: "English" }, level: "C1", share: 84 },
]
