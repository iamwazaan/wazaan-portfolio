import { useEffect, useRef, useState } from 'react'

const cloudVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4'
const localVideo = '/hero.mp4'
const availableFrames = 60

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [source, setSource] = useState(cloudVideo)
  const [hasVideoFrame, setHasVideoFrame] = useState(false)
  const [hasFrameCache, setHasFrameCache] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!video || !canvas || !context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let duration = 0
    let target = 0
    let smoothed = 0
    let frameRequest = 0
    let videoReady = false
    let cacheStarted = false
    let cancelled = false
    let reducedMotion = motionQuery.matches
    let width = 0
    let height = 0
    let frames: ImageBitmap[] = []

    setHasVideoFrame(false)
    setHasFrameCache(false)

    const readProgress = () => {
      const maximum = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      return Math.min(1, Math.max(0, window.scrollY / maximum))
    }

    const drawFrame = (frame: ImageBitmap) => {
      const scale = Math.max(width / frame.width, height / frame.height)
      const drawWidth = frame.width * scale
      const drawHeight = frame.height * scale
      const x = (width - drawWidth) / 2
      const y = (height - drawHeight) / 2

      context.clearRect(0, 0, width, height)
      context.drawImage(frame, x, y, drawWidth, drawHeight)
    }

    const render = () => {
      frameRequest = 0
      smoothed = reducedMotion
        ? 0
        : smoothed + (target - smoothed) * 0.12

      if (frames.length) {
        const index = Math.min(
          frames.length - 1,
          Math.round(smoothed * (frames.length - 1)),
        )
        drawFrame(frames[index])
      } else if (videoReady && duration) {
        const nextTime = smoothed * Math.max(0, duration - 0.05)
        if (Math.abs(video.currentTime - nextTime) > 0.04) {
          try {
            video.currentTime = nextTime
          } catch {
            // Keep the decoded poster frame if the browser cannot seek yet.
          }
        }
      }

      if (!reducedMotion && Math.abs(target - smoothed) > 0.0005) {
        requestFrame()
      }
    }

    const requestFrame = () => {
      if (!frameRequest) frameRequest = window.requestAnimationFrame(render)
    }

    const updateTarget = () => {
      target = reducedMotion ? 0 : readProgress()
      requestFrame()
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      requestFrame()
    }

    const loadFrameCache = async () => {
      if (cacheStarted || reducedMotion || !duration) return
      cacheStarted = true

      await new Promise((resolve) => window.setTimeout(resolve, 300))
      if (cancelled) return

      const viewportBudget =
        window.innerWidth < 640 ? 36 : window.innerWidth < 1024 ? 48 : 60
      const count = Math.min(
        viewportBudget,
        Math.max(24, Math.round(duration * 12)),
      )
      const indexes = Array.from({ length: count }, (_, index) =>
        Math.round((index * (availableFrames - 1)) / (count - 1)) + 1,
      )
      const loaded = new Array<ImageBitmap>(count)
      let cursor = 0

      const loadNext = async () => {
        while (!cancelled && cursor < indexes.length) {
          const outputIndex = cursor
          const sourceIndex = indexes[cursor]
          cursor += 1

          const response = await fetch(
            `/hero-frames/frame-${String(sourceIndex).padStart(3, '0')}.webp`,
            { cache: 'force-cache' },
          )
          if (!response.ok) throw new Error('Hero frame cache request failed')
          loaded[outputIndex] = await createImageBitmap(await response.blob())
        }
      }

      try {
        await Promise.all(Array.from({ length: 6 }, loadNext))
        if (cancelled) {
          loaded.forEach((frame) => frame?.close())
          return
        }

        frames = loaded
        setHasFrameCache(true)
        requestFrame()
      } catch {
        loaded.forEach((frame) => frame?.close())
        frames = []
      }
    }

    const readDuration = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0
      video.pause()
      updateTarget()
    }

    const markVideoReady = () => {
      if (videoReady) return
      videoReady = true
      setHasVideoFrame(true)
      readDuration()
      void loadFrameCache()
    }

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches
      target = reducedMotion ? 0 : readProgress()
      requestFrame()
    }

    resizeCanvas()
    video.addEventListener('loadedmetadata', readDuration)
    video.addEventListener('loadeddata', markVideoReady)
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', resizeCanvas)
    motionQuery.addEventListener('change', handleMotionChange)

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) readDuration()
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markVideoReady()
    updateTarget()

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', readDuration)
      video.removeEventListener('loadeddata', markVideoReady)
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', resizeCanvas)
      motionQuery.removeEventListener('change', handleMotionChange)
      if (frameRequest) window.cancelAnimationFrame(frameRequest)
      frames.forEach((frame) => frame.close())
    }
  }, [source])

  const useLocalFallback = () => {
    if (source === cloudVideo) {
      setHasVideoFrame(false)
      setHasFrameCache(false)
      setSource(localVideo)
    }
  }

  const backdropState = [
    'hero-video-backdrop',
    hasVideoFrame ? 'is-video-ready' : '',
    hasFrameCache ? 'is-cache-ready' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={backdropState} aria-hidden="true">
      <img
        className="hero-video-poster"
        src="/hero-poster.jpg"
        alt=""
        width="1920"
        height="1080"
      />
      <video
        key={source}
        ref={videoRef}
        className="hero-video"
        src={source}
        poster="/hero-poster.jpg"
        crossOrigin="anonymous"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        disablePictureInPicture
        onError={useLocalFallback}
      />
      <canvas ref={canvasRef} className="hero-video-canvas" />
      <div className="hero-video-scrim" />
    </div>
  )
}
