import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

// Must be a stable module-level reference: the provider throws if the init
// callback identity changes across renders.
const initEngine = async (engine) => {
  await loadSlim(engine)
}

const OPTIONS = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  background: { color: 'transparent' },
  interactivity: {
    // Listen on the window so the canvas can stay pointer-events:none and
    // never swallow clicks meant for the cards/links underneath.
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'bubble' },
    },
    modes: {
      bubble: { distance: 140, size: 3.2, duration: 2, opacity: 1 },
    },
  },
  particles: {
    number: { value: 160, density: { enable: true } },
    color: { value: ['#ffffff', '#a5f3fc', '#bae6fd'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.12, max: 0.9 },
      animation: { enable: true, speed: 1.1, sync: false },
    },
    size: { value: { min: 0.4, max: 1.8 } },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
  },
}

export default function ParticleSky() {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles-sky"
        className="particle-sky pointer-events-none"
        options={OPTIONS}
      />
    </ParticlesProvider>
  )
}
