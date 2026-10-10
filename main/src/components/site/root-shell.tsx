import type { Metadata, Viewport } from "next"
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { RevealObserver } from "@/components/site/reveal"
import { SiteBackground } from "@/components/site/site-background"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { getDictionary } from "@/content/dictionary"
import { SITE_URL, profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import "@/app/globals.css"

// Barlow: a grotesk drawn after road signs and plates; the condensed cut sets the headings.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1e2e" },
  ],
}

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale)
  const path = locale === "nl" ? "/" : "/en"
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: profile.name, url: SITE_URL }],
    alternates: {
      canonical: path,
      languages: { nl: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: profile.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "nl" ? "nl_BE" : "en_GB",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  }
}

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html
      lang={locale}
      className={`${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip">
        {/* Before first paint: lets CSS hide reveal targets only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-on')" }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteBackground />
          <TooltipProvider>{children}</TooltipProvider>
          <SmoothScroll />
          <RevealObserver />
        </ThemeProvider>
      </body>
    </html>
  )
}
