import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const PLANE_SIZE = 32
const PLANE_HALF = PLANE_SIZE / 2
const NOSE_OFFSET = 12.7
const TRAIL_POINT_COUNT = 16

function rotateVector(x, y, degrees) {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  }
}

function normalizeAngle(angle) {
  let next = angle
  while (next > 180) next -= 360
  while (next < -180) next += 360
  return next
}

function buildCurvedTrailPath(points) {
  if (!points.length) {
    return ''
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`
  }

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index]
    const next = points[index + 1]
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }

  const last = points[points.length - 1]
  path += ` T ${last.x} ${last.y}`

  return path
}

const PROFILE = {
  name: 'Tiebe Vaes',
  age: 19,
  email: 'tiebevaes@gmail.com',
  phone: '+32 468 54 71 53',
  location: '2660 Hoboken, Belgium',
  githubUsernames: ['Tiebe-Vaes', 'TiebeVaes'],
  githubPrimaryUsername: 'Tiebe-Vaes',
  gitlabUsername: 'tiebevaes',
}

const EDUCATION = [
  {
    title: 'IT & Software, AP Hogeschool',
    period: '2024 - heden',
    place: 'Antwerpen',
  },
  {
    title: 'Boekhouden-Informatica, H. Pius X - Instituut',
    period: '2022 - 2024',
    place: 'Wilrijk',
  },
  {
    title: 'Wetenschappen, H. Pius X - Instituut',
    period: '2018 - 2022',
    place: 'Wilrijk',
  },
]

const CONTENT = {
  nl: {
    tagline: 'Building smart digital solutions',
    description:
      'Gemotiveerde student die zelfstandig en stipt werkt. Buiten code geef ik scoutsleiding, train ik in de fitness en bouw ik graag webprojecten met focus op kwaliteit.',
    ctaProjects: 'Bekijk Projecten',
    ctaContact: 'Contacteer Mij',
    aboutTitle: 'Over mij',
    aboutText:
      'Ik ben 19 jaar en studeer Toegepaste Informatica in Antwerpen. Mijn focus ligt op groeien als developer door constant bij te leren, echte problemen op te lossen en projecten af te werken met een hoge standaard.',
    languagesTitle: 'Talen',
    educationTitle: 'Opleiding',
    skillsTitle: 'Skills',
    projectsTitle: 'Projecten',
    projectsSubtitle:
      'Automatisch ingeladen vanuit GitHub/GitLab met extra gepinde projecten.',
    filterType: 'Type',
    filterLanguage: 'Taal',
    loadingProjects: 'Projecten worden geladen...',
    repo: 'Repo',
    liveDemo: 'Live Demo',
    contactTitle: 'Contact',
    programming: 'Programming',
    tools: 'Tools',
    all: 'All',
  },
  en: {
    tagline: 'Building smart digital solutions',
    description:
      'Motivated student who works independently and punctually. Outside coding, I lead scouts activities, train in the gym, and build web projects with a quality-first mindset.',
    ctaProjects: 'View Projects',
    ctaContact: 'Contact Me',
    aboutTitle: 'About me',
    aboutText:
      'I am 19 years old and study Applied Computer Science in Antwerp. My focus is on growing as a developer by continuously learning, solving real problems, and finishing projects to a high standard.',
    languagesTitle: 'Languages',
    educationTitle: 'Education',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    projectsSubtitle:
      'Automatically loaded from GitHub/GitLab with additional pinned projects.',
    filterType: 'Type',
    filterLanguage: 'Language',
    loadingProjects: 'Loading projects...',
    repo: 'Repo',
    liveDemo: 'Live Demo',
    contactTitle: 'Contact',
    programming: 'Programming',
    tools: 'Tools',
    all: 'All',
  },
}

const SKILLS = {
  programming: ['C#', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML', 'CSS'],
  tools: ['Git', 'GitHub', 'GitLab', 'MySQL', 'VS Code', 'React', 'Tailwind'],
  languages: ['Nederlands', 'Engels'],
}

const MANUAL_PROJECTS = [
  {
    id: 'manual-petalpurrs',
    source: 'WordPress',
    name: 'PetalPurrs',
    description:
      'Creatieve WordPress website met sterke visual identity en content-first aanpak.',
    language: 'CMS',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design'],
    repoUrl: 'https://petalpurrs.wordpress.com/',
    liveUrl: 'https://petalpurrs.wordpress.com/',
    updatedAt: '2026-04-02T00:00:00Z',
  },
  {
    id: 'manual-gosmartlib',
    source: 'GitLab',
    name: 'GoSmartLib',
    description:
      'Full-stack bibliotheekplatform voor multi-campus scholen met Next.js 16, Spring Boot 3.5, MySQL, Docker en Traefik. Deze AP GitLab repository is afgeschermd en wordt daarom handmatig gepind.',
    language: 'Full Stack',
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Tailwind CSS 4',
      'Spring Boot 3.5',
      'Java 21',
      'MySQL 8',
      'Docker',
      'Traefik',
    ],
    repoUrl:
      'https://gitlab.apstudent.be/bachelor-it/software-project/25-26/team-06/gosmartlib',
    liveUrl: '',
    updatedAt: '2026-04-02T00:00:00Z',
  },
]

const GITHUB_DESCRIPTION_OVERRIDES = {
  'Tiebe-Vaes/intro-mobile-react':
    'React oefenproject met mobiele focus en component-based UI, uitgewerkt als introductie in frontend development.',
  'Tiebe-Vaes/LocalLend':
    'Conceptproject rond lokaal uitlenen en delen, met focus op een heldere gebruikersflow en samenwerking.',
  'Tiebe-Vaes/Mono':
    'C#/.NET solution (Mono.sln) met gestructureerde projectopbouw en basis voor verdere featureontwikkeling.',
}

function getGithubDescription(repo) {
  if (repo.description) {
    return repo.description
  }

  return (
    GITHUB_DESCRIPTION_OVERRIDES[repo.full_name] ||
    `${repo.name} is een ${repo.language || 'software'} project dat ik heb opgebouwd als onderdeel van mijn leer- en projecttraject.`
  )
}

function normalizeGithubProject(repo) {
  return {
    id: `gh-${repo.id}`,
    source: 'GitHub',
    name: repo.name,
    description: getGithubDescription(repo),
    language: repo.language || 'Other',
    tech: [repo.language, ...(repo.topics || [])].filter(Boolean),
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || '',
    updatedAt: repo.updated_at,
  }
}

function normalizeGitlabProject(project) {
  return {
    id: `gl-${project.id}`,
    source: 'GitLab',
    name: project.name,
    description: project.description || 'Geen beschrijving toegevoegd.',
    language: project.language || 'Other',
    tech: [project.language, ...(project.tag_list || [])].filter(Boolean),
    repoUrl: project.web_url,
    liveUrl: project.homepage || '',
    updatedAt: project.last_activity_at,
  }
}

function ContactIcon({ name }) {
  const iconClass = 'h-5 w-5 shrink-0 text-cyan-300'

  if (name === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M4 6h16v12H4V6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m5 7 7 6 7-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M8.2 5.3c.4-.4 1-.5 1.5-.2l1.8 1c.6.3.8 1 .5 1.6l-.8 1.7c-.2.4-.1.9.2 1.2l2.6 2.6c.3.3.8.4 1.2.2l1.7-.8c.6-.3 1.3-.1 1.6.5l1 1.8c.3.5.2 1.1-.2 1.5l-1.2 1.2c-.8.8-2 1.1-3 .7-2.7-1.1-5.1-2.9-7-4.9-2.1-1.9-3.9-4.3-5-7-.4-1-.2-2.2.6-3l1.2-1.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
        <path
          d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.6-.9-2.6-.9-.4-.9-.9-1.1-.9-1.1-.7-.5 0-.5 0-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.3-1 .1-2.1 0 0 .7-.2 2.1.8a7.6 7.6 0 0 1 3.9 0c1.5-1 2.2-.8 2.2-.8.4 1.1.1 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.2.5.7.5 1.4v2c0 .2.1.5.5.4A8.5 8.5 0 0 0 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
      <path
        d="M4 5h16v14H4V5Zm3 3h10M7 12h10M7 16h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UiIcon({ name, className = 'h-4 w-4' }) {
  if (name === 'moon') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M20 14.2a8 8 0 1 1-10.2-10 7 7 0 1 0 10.2 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'sun') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'language') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 6h10M9 6c-.3 3.7-1.8 7.2-4.3 10M13 18l3.7-8 3.8 8M14.4 15h4.7M11.4 4c1.4 2.2 3.3 4.1 5.6 5.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'nl') {
    return <span className={className}>NL</span>
  }

  if (name === 'en') {
    return <span className={className}>EN</span>
  }

  if (name === 'nederlands') {
    return <span className={className}>NL</span>
  }

  if (name === 'engels') {
    return <span className={className}>EN</span>
  }

  if (name === 'java') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 18h7.5a3.5 3.5 0 0 0 0-7H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10v4a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.2 6.5c0 .8-.6 1.2-.6 2m3-2c0 .8-.6 1.2-.6 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'code') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="m8 8-4 4 4 4m8-8 4 4-4 4m-6 4 4-16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'tool') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M14.5 4.5a4.5 4.5 0 0 0 5 6L12 18l-4 1 1-4 7.5-7.5a4.5 4.5 0 0 0-2-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return null
}

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [languageFilter, setLanguageFilter] = useState('all')
  const [plane, setPlane] = useState({
    x: 140,
    y: 140,
    angle: -12,
  })
  const cursorTargetRef = useRef({ x: 140, y: 140 })
  const trailPointsRef = useRef(
    Array.from({ length: TRAIL_POINT_COUNT }, () => ({ x: 140, y: 140 })),
  )
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'nl')
  const t = CONTENT[locale] || CONTENT.nl

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.classList.toggle('body-light', theme === 'light')
  }, [theme])

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  useEffect(() => {
    function onPointerMove(event) {
      cursorTargetRef.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    let frameId

    function tick() {
      const target = cursorTargetRef.current

      setPlane((current) => {
        const chase = 0.07
        const trailLag = 0.05

        const targetDirection =
          (Math.atan2(target.y - current.y, target.x - current.x) * 180) / Math.PI + 45
        const angleDelta = normalizeAngle(targetDirection - current.angle)
        const nextAngle = current.angle + angleDelta * 0.12

        const noseVector = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, nextAngle)
        const desiredCenterX = target.x - noseVector.x
        const desiredCenterY = target.y - noseVector.y

        const nextX = current.x + (desiredCenterX - current.x) * chase
        const nextY = current.y + (desiredCenterY - current.y) * chase

        const nextNose = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, nextAngle)
        const nosePoint = {
          x: nextX + nextNose.x,
          y: nextY + nextNose.y,
        }

        const previous = trailPointsRef.current
        const nextTrail = [nosePoint]

        for (let index = 1; index < TRAIL_POINT_COUNT; index += 1) {
          const source = previous[index - 1] || previous[previous.length - 1] || nosePoint
          const currentPoint = previous[index] || source
          nextTrail.push({
            x: currentPoint.x + (source.x - currentPoint.x) * trailLag,
            y: currentPoint.y + (source.y - currentPoint.y) * trailLag,
          })
        }

        trailPointsRef.current = nextTrail

        return {
          x: nextX,
          y: nextY,
          angle: nextAngle,
        }
      })

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadProjects() {
      setLoading(true)
      setError('')

      try {
        const githubPromises = PROFILE.githubUsernames.map((username) => {
          return fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          ).then((response) => {
            if (!response.ok) {
              throw new Error(`GitHub gebruiker ${username} kon niet geladen worden.`)
            }

            return response.json()
          })
        })

        const gitlabPromise = fetch(
          `https://gitlab.com/api/v4/users?username=${PROFILE.gitlabUsername}`,
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('GitLab profiel kon niet geladen worden.')
            }

            return response.json()
          })
          .then((users) => {
            if (!users.length) {
              return []
            }

            return fetch(
              `https://gitlab.com/api/v4/users/${users[0].id}/projects?order_by=last_activity_at&sort=desc&per_page=100`,
            ).then((response) => {
              if (!response.ok) {
                throw new Error('GitLab projecten konden niet geladen worden.')
              }

              return response.json()
            })
          })

        const [githubRepoResults, gitlabProjects] = await Promise.all([
          Promise.allSettled(githubPromises),
          gitlabPromise,
        ])

        const githubRepos = githubRepoResults
          .filter((result) => result.status === 'fulfilled')
          .flatMap((result) => result.value)

        if (!githubRepos.length) {
          throw new Error('GitHub kon niet geladen worden.')
        }

        if (ignore) {
          return
        }

        const mergedProjects = [
          ...MANUAL_PROJECTS,
          ...githubRepos.map(normalizeGithubProject),
          ...gitlabProjects.map(normalizeGitlabProject),
        ]
        const uniqueProjects = Array.from(
          new Map(mergedProjects.map((project) => [project.repoUrl, project])).values(),
        )

        const sortedProjects = uniqueProjects
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .filter((project) => !project.name.toLowerCase().includes('config'))

        setProjects(sortedProjects)
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      ignore = true
    }
  }, [])

  const languages = useMemo(() => {
    return [
      'all',
      ...new Set(projects.map((project) => project.language).filter(Boolean)),
    ]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const sourceMatches =
        sourceFilter === 'all' || project.source.toLowerCase() === sourceFilter
      const languageMatches =
        languageFilter === 'all' || project.language === languageFilter

      return sourceMatches && languageMatches
    })
  }, [projects, sourceFilter, languageFilter])

  const planeNose = rotateVector(NOSE_OFFSET, -NOSE_OFFSET, plane.angle)
  const noseX = plane.x + planeNose.x
  const noseY = plane.y + planeNose.y
  const trailPath = buildCurvedTrailPath(trailPointsRef.current)

  return (
    <div
      className={`theme-${theme} relative min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-graphite text-zinc-100' : 'bg-slate-50 text-slate-900'
        }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          <path
            d={trailPath}
            stroke="rgba(34, 211, 238, 0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div
          className="absolute left-0 top-0"
          style={{
            transform: `translate(${plane.x - PLANE_HALF}px, ${plane.y - PLANE_HALF}px) rotate(${plane.angle}deg)`,
            transformOrigin: `${PLANE_HALF}px ${PLANE_HALF}px`,
          }}
        >
          <svg
            viewBox="0 0 48 48"
            className="text-cyan-300/60 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            style={{ width: `${PLANE_SIZE}px`, height: `${PLANE_SIZE}px` }}
            fill="none"
          >
            <path
              d="M5 22.5 43 5 28.5 43l-7.5-13-16-7.5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M43 5 21 28"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <main className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10">
        <div className="mb-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-cyan-400"
          >
            <UiIcon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            type="button"
            onClick={() => setLocale((current) => (current === 'nl' ? 'en' : 'nl'))}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-cyan-400"
          >
            <UiIcon name="language" className="h-4 w-4" />
            <UiIcon name={locale === 'nl' ? 'en' : 'nl'} className="text-[11px] font-bold" />
            {locale === 'nl' ? 'English' : 'Nederlands'}
          </button>
        </div>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-5 inline-block rounded-full border border-zinc-700 px-4 py-1 text-xs uppercase tracking-[0.2em] text-zinc-400">
            Portfolio 2026
          </p>
          <h1 className="max-w-3xl font-title text-4xl font-bold leading-tight text-white sm:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            {t.tagline}
          </p>
          <p className="mt-6 max-w-3xl text-zinc-400">{t.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              {t.ctaProjects}
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-zinc-600 px-5 py-3 font-semibold transition hover:border-zinc-300"
            >
              {t.ctaContact}
            </a>
          </div>
        </motion.section>

        <motion.section
          className="mb-20 grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <article className="card md:col-span-2">
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className="mt-3 text-zinc-300">{t.aboutText}</p>
          </article>
          <article className="card">
            <h2 className="section-title">{t.languagesTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.languages.map((language) => (
                <span className="chip flex items-center gap-2" key={language}>
                  <UiIcon
                    name={language.toLowerCase()}
                    className="text-[11px] font-bold text-cyan-300"
                  />
                  {language}
                </span>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          className="mb-20 grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <article className="card">
            <h2 className="section-title">{t.educationTitle}</h2>
            <ul className="mt-4 space-y-4">
              {EDUCATION.map((item) => (
                <li key={item.title} className="rounded-lg border border-zinc-800 p-4">
                  <p className="font-semibold text-zinc-100">{item.title}</p>
                  <p className="text-sm text-zinc-400">{item.period}</p>
                  <p className="text-sm text-zinc-500">{item.place}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="section-title">{t.skillsTitle}</h2>

            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-zinc-500">
              {t.programming}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.programming.map((skill) => (
                <span className="chip flex items-center gap-2" key={skill}>
                  <UiIcon
                    name={skill.toLowerCase() === 'java' ? 'java' : 'code'}
                    className="h-4 w-4 text-cyan-300"
                  />
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.14em] text-zinc-500">
              {t.tools}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.tools.map((tool) => (
                <span className="chip flex items-center gap-2" key={tool}>
                  <UiIcon name="tool" className="h-4 w-4 text-cyan-300" />
                  {tool}
                </span>
              ))}
            </div>
          </article>
        </motion.section>

        <motion.section
          id="projects"
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{t.projectsTitle}</h2>
              <p className="mt-2 text-zinc-400">{t.projectsSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="filter-wrap">
                <span className="filter-label">{t.filterType}</span>
                <select
                  value={sourceFilter}
                  onChange={(event) => setSourceFilter(event.target.value)}
                  className="filter-select"
                >
                  <option value="all">{t.all}</option>
                  <option value="github">GitHub</option>
                  <option value="gitlab">GitLab</option>
                </select>
              </label>
              <label className="filter-wrap">
                <span className="filter-label">{t.filterLanguage}</span>
                <select
                  value={languageFilter}
                  onChange={(event) => setLanguageFilter(event.target.value)}
                  className="filter-select"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {loading && (
            <div className="card text-zinc-300">{t.loadingProjects}</div>
          )}

          {error && <div className="card text-rose-300">{error}</div>}

          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className="project-card"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-zinc-500">
                    <span>{project.source}</span>
                    <span>{project.language}</span>
                  </div>
                  <h3 className="font-title text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tag) => (
                      <span key={`${project.id}-${tag}`} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4 text-sm">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                    >
                      {t.repo}
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-lime-300 transition hover:text-lime-200"
                      >
                        {t.liveDemo}
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          id="contact"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{t.contactTitle}</h2>
          <div className="mt-4 grid gap-3 text-zinc-300 sm:grid-cols-2">
            <a
              href={`mailto:${PROFILE.email}`}
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="mail" />
              <span>{PROFILE.email}</span>
            </a>
            <a href="tel:+32468547153" className="contact-link flex items-center gap-3">
              <ContactIcon name="phone" />
              <span>{PROFILE.phone}</span>
            </a>
            <p className="contact-link flex items-center gap-3">
              <ContactIcon name="location" />
              <span>{PROFILE.location}</span>
            </p>
            <a
              href={`https://github.com/${PROFILE.githubPrimaryUsername}`}
              target="_blank"
              rel="noreferrer"
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="github" />
              <span>GitHub</span>
            </a>
            <a
              href={`https://gitlab.com/${PROFILE.gitlabUsername}`}
              target="_blank"
              rel="noreferrer"
              className="contact-link flex items-center gap-3"
            >
              <ContactIcon name="gitlab" />
              <span>GitLab</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default App
