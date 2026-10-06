import type { Localized } from "./types"

export const SITE_URL = "https://tiebe.vercel.app"

export const profile = {
  name: "Tiebe Vaes",
  role: { nl: "Full-stack developer", en: "Full-stack developer" } satisfies Localized,
  // Non-breaking space before each dot so a wrapped line never starts with "·".
  stackLine: "TypeScript · React · Next.js · Java · Spring Boot",
  email: "tiebevaes@gmail.com",
  phone: "+32 468 54 71 53",
  phoneHref: "tel:+32468547153",
  location: "2660 Hoboken, Belgium",
  timeZone: "Europe/Brussels",
  cv: "/CV Tiebe Vaes.pdf",
  links: {
    github: "https://github.com/Tiebe-Vaes",
    githubUser: "Tiebe-Vaes",
    linkedin: "https://www.linkedin.com/in/tiebevaes",
  },
}

export const education: { title: Localized; period: string; place: string }[] = [
  {
    title: {
      nl: "Toegepaste Informatica (software), AP Hogeschool",
      en: "Applied Computer Science (software), AP University of Applied Sciences",
    },
    period: "2024 – 2027",
    place: "Antwerpen",
  },
  {
    title: {
      nl: "Erasmus-uitwisseling, OsloMet",
      en: "Erasmus exchange, OsloMet",
    },
    period: "jan – jun 2027",
    place: "Oslo",
  },
  {
    title: {
      nl: "Boekhouden-Informatica, H. Pius X-Instituut",
      en: "Accounting & IT, H. Pius X Institute",
    },
    period: "2022 – 2024",
    place: "Wilrijk",
  },
  {
    title: {
      nl: "Wetenschappen, H. Pius X-Instituut",
      en: "Sciences, H. Pius X Institute",
    },
    period: "2018 – 2022",
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

export const spokenLanguages: Localized[] = [
  { nl: "Nederlands (moedertaal)", en: "Dutch (native)" },
  { nl: "Engels", en: "English" },
]
