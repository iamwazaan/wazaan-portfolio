import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Adapted from React Bits' SplitText component for this portfolio's focused
// headline use case: https://github.com/DavidHDev/react-bits
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

type SplitTextProps = {
  text: string
  className?: string
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  charDelay?: number
  duration?: number
  startDelay?: number
  trigger?: 'load' | 'view'
}

const useIsoLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const fontsAreReady = () =>
  typeof document !== 'undefined' &&
  (!document.fonts || document.fonts.status === 'loaded')

export function SplitText({
  text,
  className = '',
  tag: Tag = 'span',
  charDelay = 28,
  duration = 1.05,
  startDelay = 0,
  trigger = 'view',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [fontsReady, setFontsReady] = useState(fontsAreReady)

  useIsoLayoutEffect(() => {
    if (fontsReady) return undefined

    let active = true
    void document.fonts.ready.then(() => {
      if (active) setFontsReady(true)
    })

    return () => {
      active = false
    }
  }, [fontsReady])

  useGSAP(
    () => {
      const element = ref.current
      if (!element || !fontsReady) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(element, { visibility: 'visible' })
        return
      }

      const split = new GSAPSplitText(element, {
        type: 'words, chars',
        aria: 'none',
        charsClass: 'split-char',
        wordsClass: 'split-word',
        reduceWhiteSpace: false,
      })

      const animation = gsap.fromTo(
        split.chars,
        {
          yPercent: 115,
          autoAlpha: 0,
          rotationX: -14,
          transformOrigin: '50% 100%',
          willChange: 'transform, opacity',
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotationX: 0,
          duration,
          delay: startDelay,
          ease: 'power3.out',
          stagger: charDelay / 1000,
          scrollTrigger:
            trigger === 'view'
              ? {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                }
              : undefined,
          onStart: () => gsap.set(element, { visibility: 'visible' }),
          onComplete: () =>
            gsap.set(split.chars, {
              clearProps: 'transform,opacity,visibility,willChange',
            }),
        },
      )

      return () => {
        animation.scrollTrigger?.kill()
        animation.kill()
        split.revert()
      }
    },
    {
      scope: ref,
      dependencies: [
        text,
        fontsReady,
        charDelay,
        duration,
        startDelay,
        trigger,
      ],
      revertOnUpdate: true,
    },
  )

  return (
    <Tag
      ref={ref as never}
      className={`split-parent${className ? ` ${className}` : ''}`}
      style={{ visibility: 'hidden' }}
    >
      {text}
    </Tag>
  )
}
