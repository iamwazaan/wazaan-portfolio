import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function PageMotion() {
  useGSAP(() => {
    const nav = document.querySelector<HTMLElement>('.site-nav')
    const progress = document.querySelector<HTMLElement>('.nav-progress')
    const media = gsap.matchMedia()

    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.2,
          },
        },
      )
    }

    if (nav) {
      ScrollTrigger.create({
        start: 24,
        end: 'max',
        onToggle: ({ isActive }) => nav.classList.toggle('is-scrolled', isActive),
      })
    }

    document
      .querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
      .forEach((link) => {
        const target = document.querySelector<HTMLElement>(link.hash)
        if (!target) return

        ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: ({ isActive }) => {
            link.classList.toggle('is-active', isActive)
            if (isActive) link.setAttribute('aria-current', 'location')
            else link.removeAttribute('aria-current')
          },
        })
      })

    media.add(
      '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
      () => {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })

        heroTimeline
          .to('.hero-top', { yPercent: -18, autoAlpha: 0.2, ease: 'none' }, 0)
          .to('.hero-copy', { yPercent: -7, ease: 'none' }, 0)
          .to(
            '.hero-card-motion',
            { yPercent: -18, scale: 0.975, ease: 'none' },
            0,
          )
      },
    )

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils
        .toArray<HTMLElement>('.project-row')
        .forEach((row) => {
          const marker = row.querySelector<HTMLElement>('.project-marker')
          if (!marker) return

          gsap.fromTo(
            marker,
            { x: -20, autoAlpha: 0.45 },
            {
              x: 0,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                end: 'top 58%',
                scrub: 0.5,
              },
            },
          )
        })

      gsap.utils
        .toArray<HTMLImageElement>('.credential-preview img')
        .forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1.07 },
            {
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: image,
                start: 'top 94%',
                end: 'top 62%',
                scrub: 0.45,
              },
            },
          )
        })
    })

    let active = true
    const refresh = () => {
      if (active) ScrollTrigger.refresh()
    }
    void document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      active = false
      window.removeEventListener('load', refresh)
      media.revert()
    }
  }, [])

  return null
}
