import { type ReactNode, useEffect, useRef } from 'react'

// A focused spring-motion adaptation of React Bits' Magnet component:
// https://github.com/DavidHDev/react-bits
type MagnetProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
  padding?: number
  strength?: number
  maxOffset?: number
  scale?: number
}

type Motion = {
  x: number
  y: number
  scale: number
}

export function Magnet({
  children,
  className = '',
  innerClassName = '',
  padding = 52,
  strength = 4,
  maxOffset = 10,
  scale = 1.02,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const inner = innerRef.current
    if (!wrapper || !inner) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const current: Motion = { x: 0, y: 0, scale: 1 }
    const velocity: Motion = { x: 0, y: 0, scale: 0 }
    const target: Motion = { x: 0, y: 0, scale: 1 }
    let frame = 0
    let previousTime = 0

    const render = (time: number) => {
      frame = 0
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 1 / 30)
        : 1 / 60
      previousTime = time
      const stiffness = 180
      const damping = 18

      ;(['x', 'y', 'scale'] as const).forEach((key) => {
        const force =
          stiffness * (target[key] - current[key]) - damping * velocity[key]
        velocity[key] += force * delta
        current[key] += velocity[key] * delta
      })

      inner.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) scale(${current.scale.toFixed(4)})`

      const moving = (Object.keys(current) as (keyof Motion)[]).some(
        (key) =>
          Math.abs(target[key] - current[key]) > 0.002 ||
          Math.abs(velocity[key]) > 0.002,
      )

      if (moving) frame = window.requestAnimationFrame(render)
      else previousTime = 0
    }

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const update = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return

      const rect = wrapper.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const outside = Math.hypot(
        Math.max(0, Math.abs(dx) - rect.width / 2),
        Math.max(0, Math.abs(dy) - rect.height / 2),
      )
      const engaged = outside <= padding

      if (engaged) {
        const rawX = dx / strength
        const rawY = dy / strength
        const magnitude = Math.hypot(rawX, rawY)
        const limit = magnitude > maxOffset ? maxOffset / magnitude : 1
        const proximity = Math.max(0, 1 - outside / Math.max(padding, 1))

        target.x = rawX * limit * proximity
        target.y = rawY * limit * proximity
        target.scale = 1 + (scale - 1) * proximity
        wrapper.dataset.magnetActive = 'true'
      } else {
        target.x = 0
        target.y = 0
        target.scale = 1
        delete wrapper.dataset.magnetActive
      }

      wake()
    }

    const reset = () => {
      target.x = 0
      target.y = 0
      target.scale = 1
      delete wrapper.dataset.magnetActive
      wake()
    }

    window.addEventListener('pointermove', update, { passive: true })
    window.addEventListener('blur', reset)
    document.documentElement.addEventListener('pointerleave', reset)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', update)
      window.removeEventListener('blur', reset)
      document.documentElement.removeEventListener('pointerleave', reset)
      inner.style.transform = ''
    }
  }, [maxOffset, padding, scale, strength])

  return (
    <div ref={wrapperRef} className={`magnet-wrap ${className}`.trim()}>
      <div
        ref={innerRef}
        className={`magnet-inner ${innerClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  )
}
