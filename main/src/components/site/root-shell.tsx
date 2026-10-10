import type { Metadata, Viewport } from "next"
import { Archivo, Martian_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { getDictionary } from "@/content/dictionary"
import { SITE_URL, profile } from "@/content/profile"
import type { Locale } from "@/content/types"
import "@/app/globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const martian = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
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
      className={`${archivo.variable} ${martian.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  )
}
