import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type CSSProperties, type ReactNode, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'header' | 'article'
  order?: number
}

export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  order = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.classList.add('is-in')
        return
      }

      gsap.fromTo(
        element,
        {
          y: 32,
          autoAlpha: 0,
          filter: 'blur(5px)',
        },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          delay: order * 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
          onStart: () => element.classList.add('is-in'),
          onComplete: () =>
            gsap.set(element, {
              clearProps: 'transform,opacity,visibility,filter,willChange',
            }),
        },
      )
    },
    { scope: ref, dependencies: [order], revertOnUpdate: true },
  )

  return (
    <Tag
      ref={ref as never}
      data-reveal
      className={className}
      style={{ '--reveal-order': order } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
