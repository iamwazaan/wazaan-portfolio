import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const [useNativeScroll, setUseNativeScroll] = useState(() =>
    Boolean(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches,
    ),
  )

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)')
    const updatePreference = () =>
      setUseNativeScroll(motionQuery.matches || touchQuery.matches)

    motionQuery.addEventListener('change', updatePreference)
    touchQuery.addEventListener('change', updatePreference)
    return () => {
      motionQuery.removeEventListener('change', updatePreference)
      touchQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  useEffect(() => {
    if (useNativeScroll) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: {
        offset: 0,
        duration: 1.15,
      },
      autoToggle: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => Boolean(node.closest('dialog')),
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [useNativeScroll])

  return null
}
