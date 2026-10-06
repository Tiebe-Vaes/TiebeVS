import { RootShell, buildMetadata } from "@/components/site/root-shell"

export { viewport } from "@/components/site/root-shell"
export const metadata = buildMetadata("en")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>
}
