declare module "p5" {
  const p5: unknown
  export default p5
}

declare module "vanta/src/vanta.topology" {
  type TopologyOptions = {
    el: HTMLElement
    p5: unknown
    color?: number
    backgroundColor?: number
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    scale?: number
    scaleMobile?: number
    minHeight?: number
    minWidth?: number
  }
  const TOPOLOGY: (options: TopologyOptions) => { destroy: () => void }
  export default TOPOLOGY
}
