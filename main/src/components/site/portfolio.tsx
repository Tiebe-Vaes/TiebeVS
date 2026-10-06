import Link from "next/link"
import { ArrowUpRightIcon, DownloadIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import SlideTextButton from "@/components/kokonutui/slide-text-button"
import SwitchButton from "@/components/kokonutui/switch-button"
import { buttonVariants } from "@/components/ui/button"
import { getDictionary, type Dictionary } from "@/content/dictionary"
import { SITE_URL, education, profile, skillGroups, spokenLanguages } from "@/content/profile"
import { projects } from "@/content/projects"
import type { Locale } from "@/content/types"
import { cn } from "@/lib/utils"
import { getContributions } from "@/lib/github"
import { Catalogue } from "./catalogue"
import { CatalogueProvider } from "./catalogue-provider"
import { GearBoard } from "./gear-board"
import GithubHeatmap, { type HeatmapDay } from "./github-heatmap"
import { HangTag } from "./hang-tag"
import { RouteProfile } from "./route-profile"
import { LinkedInIcon, TechIcon } from "./tech-icon"

export async function Portfolio({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const contributions = await getContributions(profile.links.githubUser)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role[locale],
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Hoboken", postalCode: "2660", addressCountry: "BE" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "AP Hogeschool Antwerpen" },
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: ["TypeScript", "React", "Next.js", "Java", "Spring Boot"],
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t.nav.skip}
      </a>
      <SiteHeader t={t} />

      <CatalogueProvider
        projects={projects}
        locale={locale}
        labels={{ sheet: t.sheet, catalogue: t.catalogue }}
      >
        <main id="main" className="mx-auto flex max-w-7xl flex-col gap-36 px-4 pb-28 sm:px-8 lg:gap-44">
          <section className="grid items-start gap-14 pt-4 lg:grid-cols-12 lg:gap-12 lg:pt-12">
            <div className="lg:col-span-5">
              <HangTag locale={locale} t={t.tag} />
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <RouteProfile
                title={t.route.title}
                hint={t.route.hint}
                sliderLabel={t.route.slider}
                waypoints={t.route.waypoints}
              />
            </div>
          </section>

          <Catalogue projects={projects} locale={locale} t={t.catalogue} />

          <section aria-labelledby="gear-title" className="flex flex-col gap-10">
            <SectionHeading id="gear-title" title={t.gear.title} intro={t.gear.intro} />
            <GearBoard
              groups={skillGroups.map((g) => ({ label: g.label[locale], items: g.items }))}
              resetLabel={t.gear.reset}
            />
          </section>

          <GithubSection t={t.github} days={contributions} />

          <About locale={locale} t={t.about} />

          <Contact t={t.contact} />
        </main>
      </CatalogueProvider>

      <footer className="mx-auto max-w-7xl border-t px-4 py-10 font-mono text-xs text-muted-foreground sm:px-8">
        © 2026 {profile.name}
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  )
}

function SiteHeader({ t }: { t: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={t.switchLocale.lang === "en" ? "/" : "/en"} className="font-display text-xl font-bold">
          Tiebe Vaes
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          <a href="#catalogue" className="hidden rounded-sm px-3 py-2 hover:bg-muted sm:inline-block">
            {t.nav.catalogue}
          </a>
          <a href="#about" className="hidden rounded-sm px-3 py-2 hover:bg-muted sm:inline-block">
            {t.nav.about}
          </a>
          <a href="#contact" className="rounded-sm px-3 py-2 hover:bg-muted">
            {t.nav.contact}
          </a>
          <Link
            href={t.switchLocale.href}
            hrefLang={t.switchLocale.lang}
            lang={t.switchLocale.lang}
            className="rounded-sm px-3 py-2 font-mono text-xs uppercase hover:bg-muted"
          >
            <span aria-hidden="true">{t.switchLocale.lang}</span>
            <span className="sr-only">{t.switchLocale.label}</span>
          </Link>
          <SwitchButton labels={t.theme} />
        </nav>
      </div>
    </header>
  )
}

function About({ locale, t }: { locale: Locale; t: Dictionary["about"] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 grid gap-16 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <h2 id="about-title" className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
          {t.title}
        </h2>
        {t.body.map((paragraph) => (
          <p key={paragraph} className="max-w-[60ch] text-pretty text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-16 lg:col-span-6 lg:col-start-7">
        <div className="flex flex-col gap-2">
          <h3 className="border-b-2 border-foreground pb-3 font-display text-3xl font-bold">{t.education}</h3>
          <ol className="flex flex-col">
            {education.map((item) => (
              <li key={item.title.en} className="flex flex-col gap-1.5 border-b py-5">
                <span className="text-lg font-semibold">{item.title[locale]}</span>
                <span className="font-mono text-xs text-muted-foreground tabular">
                  {item.period} · {item.place}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="border-b-2 border-foreground pb-3 font-display text-3xl font-bold">{t.languages}</h3>
          <ul className="flex flex-col">
            {spokenLanguages.map((language) => (
              <li key={language.en} className="border-b py-5 text-lg">
                {language[locale]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <h2 id={id} className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
        {title}
      </h2>
      {intro ? <p className="text-lg text-pretty text-muted-foreground">{intro}</p> : null}
    </div>
  )
}

function GithubSection({
  t,
  days,
}: {
  t: Dictionary["github"]
  days: Awaited<ReturnType<typeof getContributions>>
}) {
  const heatmapDays: HeatmapDay[] | null = days
    ? days.days.map((d) => [d.date, d.count, d.weekday, d.week])
    : null
  return (
    <section aria-labelledby="github-title" className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="github-title"
          title={t.title}
          intro={days ? `${t.summary(days.total, days.activeDays)} ${t.note}` : t.unavailable}
        />
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <TechIcon name="GitHub" />
          {t.link}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      </div>
      {heatmapDays ? (
        // row-reverse makes a narrow screen start scrolled to the most recent months.
        <div className="flex min-w-0 flex-row-reverse overflow-x-auto rounded-sm border bg-card p-5 sm:p-8">
          <div className="min-w-[44rem] flex-1">
            <GithubHeatmap days={heatmapDays} />
          </div>
        </div>
      ) : null}
    </section>
  )
}

function Contact({ t }: { t: Dictionary["contact"] }) {
  const rows = [
    { label: t.email, value: profile.email, href: `mailto:${profile.email}`, icon: MailIcon },
    { label: t.phone, value: profile.phone, href: profile.phoneHref, icon: PhoneIcon },
    { label: t.location, value: profile.location, icon: MapPinIcon },
  ]
  const profiles = [
    { name: "LinkedIn", href: profile.links.linkedin, icon: <LinkedInIcon /> },
    { name: "GitHub", href: profile.links.github, icon: <TechIcon name="GitHub" className="size-4" /> },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 grid gap-10 rounded-sm bg-primary px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:grid-cols-12"
    >
      <div className="flex flex-col gap-5 lg:col-span-6">
        <h2 id="contact-title" className="font-display text-7xl leading-none font-extrabold sm:text-8xl">
          {t.title}
        </h2>
        <p className="max-w-[44ch] text-lg">{t.body}</p>
        <div className="flex flex-wrap gap-2">
          <SlideTextButton href={`mailto:${profile.email}`} text={profile.email} hoverText={t.email} />
          <a href={profile.cv} download className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-12 px-5")}>
            <DownloadIcon data-icon="inline-start" />
            {t.cv}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:col-span-6">
        <dl className="flex flex-col">
          {rows.map(({ label, value, href, icon: Icon }) => (
            <div key={label} className="grid grid-cols-[7rem_1fr] items-center gap-3 border-b border-primary-foreground/25 py-3">
              <dt className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </dt>
              <dd className="font-semibold">
                {href ? (
                  <a href={href} className="underline-offset-4 hover:underline">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs tracking-wider uppercase">{t.profiles}</h3>
          <ul className="flex flex-wrap gap-2">
            {profiles.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/40 px-4 py-2.5 font-semibold transition-colors hover:bg-primary-foreground hover:text-primary"
                >
                  {item.icon}
                  {item.name}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
