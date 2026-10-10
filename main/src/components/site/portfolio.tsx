import Link from "next/link"
import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "lucide-react"
import SlideTextButton from "@/components/kokonutui/slide-text-button"
import SwitchButton from "@/components/kokonutui/switch-button"
import LogoLoop from "@/components/reactbits/LogoLoop"
import { buttonVariants } from "@/components/ui/button"
import { getDictionary, type Dictionary } from "@/content/dictionary"
import { SITE_URL, education, profile, skillGroups, spokenLanguages } from "@/content/profile"
import { playing } from "@/content/playing"
import { projects } from "@/content/projects"
import type { Locale } from "@/content/types"
import { getContributions } from "@/lib/github"
import { Catalogue } from "./catalogue"
import { CatalogueProvider } from "./catalogue-provider"
import { ContactSea } from "./contact-sea"
import { GearBoard } from "./gear-board"
import GithubHeatmap, { type HeatmapDay } from "./github-heatmap"
import { HangTag } from "./hang-tag"
import { LanguageMeter } from "./language-meter"
import { NowPlaying } from "./now-playing"
import { RouteProfile } from "./route-profile"
import { LinkedInIcon, TechIcon } from "./tech-icon"
import { HeroMap } from "./hero-map"

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
        <main id="main" className="mx-auto max-w-7xl px-4 pb-28 sm:px-8">
          <div className="flex flex-col gap-36 lg:gap-44">
          <section className="relative isolate grid min-h-[calc(100svh-3.5rem)] items-center gap-14 py-10 lg:grid-cols-12 lg:gap-12">
            {/* Static map sheet behind the hero: contours, index lines, heights, ticks, scale, coordinates. */}
            <HeroMap className="absolute inset-y-0 left-1/2 -z-10 h-full w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
            <div className="lg:col-span-5">
              <HangTag locale={locale} t={t.tag} />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
              <p className="font-display text-4xl leading-[1.02] font-bold text-balance sm:text-5xl">{t.hero.pitch}</p>
              <dl className="grid gap-x-8 gap-y-3 border-t-2 border-foreground pt-5 sm:grid-cols-[auto_1fr]">
                {t.hero.facts.map((fact) => (
                  <div key={fact.label} className="contents">
                    <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase sm:pt-1">{fact.label}</dt>
                    <dd className="text-lg font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Full-bleed band of the whole kit, between the hero and the catalogue. */}
          <div className="relative left-1/2 -my-20 w-screen -translate-x-1/2 border-y py-5 lg:-my-28">
            <LogoLoop
              logos={skillGroups.flatMap((g) => g.items).map((item) => ({
                title: item,
                node: (
                  <span className="flex items-center gap-2 font-mono text-sm whitespace-nowrap text-muted-foreground">
                    <TechIcon name={item} className="size-5 text-foreground" />
                    {item}
                  </span>
                ),
              }))}
              speed={40}
              gap={40}
              logoHeight={24}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="var(--background)"
              ariaLabel={t.gear.loopLabel}
            />
          </div>

          <Catalogue projects={projects} locale={locale} t={t.catalogue} />

          <About locale={locale} t={t} />

          <section aria-labelledby="playing-title" className="flex flex-col gap-10">
            <SectionHeading id="playing-title" title={t.playing.title} intro={t.playing.intro} />
            <NowPlaying items={playing} locale={locale} t={t.playing} />
          </section>

          <section aria-labelledby="gear-title" className="flex flex-col gap-10">
            <SectionHeading id="gear-title" title={t.gear.title} intro={t.gear.intro} />
            <div>
              <GearBoard groups={skillGroups.map((g) => ({ label: g.label[locale], items: g.items }))} />
            </div>
          </section>

          <GithubSection t={t.github} days={contributions} />

          <Contact locale={locale} t={t.contact} />
          </div>
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
          <a href="#catalogue" className="rounded-sm px-2 py-2 hover:bg-muted sm:px-3">
            {t.nav.catalogue}
          </a>
          <a href="#about" className="hidden rounded-sm px-3 py-2 hover:bg-muted sm:inline-block">
            {t.nav.about}
          </a>
          <a href="#contact" className="rounded-sm px-2 py-2 hover:bg-muted sm:px-3">
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

function About({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-20 flex-col gap-16">
      <SectionHeading id="about-title" title={t.about.title} />

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          {t.about.body.map((paragraph) => (
            <p key={paragraph} className="max-w-[60ch] text-pretty text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="lg:col-span-7">
          <RouteProfile
            label={t.route.label}
            hint={t.route.hint}
            sliderLabel={t.route.slider}
            waypoints={t.route.waypoints}
          />
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h3 className="border-b-2 border-foreground pb-3 font-display text-3xl font-bold">{t.about.education}</h3>
          <ol className="flex flex-col">
            {education.map((item) => (
              <li key={item.title.en} className="flex flex-col gap-1.5 border-b py-5">
                <span className="text-lg font-semibold">{item.title[locale]}</span>
                {item.detail ? <span className="text-muted-foreground">{item.detail[locale]}</span> : null}
                <span className="font-mono text-xs text-muted-foreground tabular">
                  {item.period[locale]} · {item.place}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="border-b-2 border-foreground pb-3 font-display text-3xl font-bold">{t.about.languages}</h3>
          <ul className="flex flex-col">
            {spokenLanguages.map((language) => (
              <li key={language.name.en} className="border-b py-5">
                <LanguageMeter
                  name={language.name[locale]}
                  level={language.level}
                  share={language.share}
                  hint={t.about.levelHint}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Section heading with the catalogue's closing 2px rule. */
function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-foreground pb-6">
      <h2 id={id} className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
        {title}
      </h2>
      {intro ? <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{intro}</p> : null}
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
      <SectionHeading id="github-title" title={t.title} intro={days ? t.note : t.unavailable} />
      <div className="flex flex-wrap items-end justify-between gap-6">
        {days ? (
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {(
              [
                [t.stats.contributions, days.total],
                [t.stats.activeDays, days.activeDays],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{label}</dt>
                <dd className="font-display text-5xl leading-none font-bold tabular">{value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{t.stats.period}</dt>
              <dd className="pt-3 font-semibold">{t.stats.periodValue}</dd>
            </div>
          </dl>
        ) : null}
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
        <div className="min-w-0 rounded-sm border bg-card p-5 sm:p-8">
          <GithubHeatmap days={heatmapDays} locale={t.intlLocale} labels={t.heatmap} />
        </div>
      ) : null}
    </section>
  )
}

function Contact({ locale, t }: { locale: Locale; t: Dictionary["contact"] }) {
  const rows = [
    { label: t.email, value: profile.email, href: `mailto:${profile.email}`, icon: MailIcon },
    { label: t.location, value: profile.location[locale], icon: MapPinIcon },
  ]
  const profiles = [
    { name: "LinkedIn", href: profile.links.linkedin, icon: <LinkedInIcon /> },
    { name: "GitHub", href: profile.links.github, icon: <TechIcon name="GitHub" className="size-4" /> },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate scroll-mt-20 grid gap-10 overflow-hidden rounded-sm bg-primary px-6 pt-10 pb-40 text-primary-foreground sm:px-10 sm:pt-14 sm:pb-48 lg:grid-cols-12 [&_:focus-visible]:outline-primary-foreground [&_:focus-visible]:ring-primary-foreground"
    >
      <ContactSea className="absolute inset-x-0 bottom-0 -z-10 h-40 opacity-70 sm:h-56 [mask-image:linear-gradient(to_bottom,transparent,black_45%)]" />
      <div className="flex flex-col gap-5 lg:col-span-6">
        <h2 id="contact-title" className="font-display text-7xl leading-none font-extrabold sm:text-8xl">
          {t.title}
        </h2>
        <p className="max-w-[44ch] text-lg">{t.body}</p>
        <div>
          <SlideTextButton href={`mailto:${profile.email}`} text={profile.email} hoverText={t.email} />
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
                  <a href={href} className="underline decoration-primary-foreground/40 underline-offset-4 hover:decoration-primary-foreground">
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
