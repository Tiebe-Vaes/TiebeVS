import { RootShell, buildMetadata } from "@/components/site/root-shell"

export { viewport } from "@/components/site/root-shell"
export const metadata = buildMetadata("nl")

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="nl">{children}</RootShell>
}
