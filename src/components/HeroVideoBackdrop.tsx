import { useEffect, useRef, useState } from 'react'

const cloudVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4'
const localVideo = '/hero.mp4'
const availableFrames = 60
const frameOnlyMedia =
  '(max-width: 48rem), (hover: none) and (pointer: coarse)'

type CachedFrame = {
  image: HTMLImageElement
  progress: number
}

const shouldUseFramesOnly = () =>
  typeof window !== 'undefined' && window.matchMedia(frameOnlyMedia).matches

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Unable to load ${src}`))
    image.src = src
  })

export function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [source, setSource] = useState(cloudVideo)
  const [framesOnly, setFramesOnly] = useState(shouldUseFramesOnly)
  const [hasVideoFrame, setHasVideoFrame] = useState(false)
  const [hasFrameCache, setHasFrameCache] = useState(false)

  useEffect(() => {
    const frameOnlyQuery = window.matchMedia(frameOnlyMedia)
    const updateRenderer = () => setFramesOnly(frameOnlyQuery.matches)

    frameOnlyQuery.addEventListener('change', updateRenderer)
    return () => frameOnlyQuery.removeEventListener('change', updateRenderer)
  }, [])

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
    let frames: CachedFrame[] = []
    let lastRenderedFrame: HTMLImageElement | null = null

    setHasVideoFrame(false)
    setHasFrameCache(false)

    const readProgress = () => {
      const maximum = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      return Math.min(1, Math.max(0, window.scrollY / maximum))
    }

    const drawImageCover = (image: HTMLImageElement, opacity = 1) => {
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      )
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const x = (width - drawWidth) / 2
      const y = (height - drawHeight) / 2

      context.save()
      context.globalAlpha = opacity
      context.drawImage(image, x, y, drawWidth, drawHeight)
      context.restore()
    }

    const drawFrame = (image: HTMLImageElement) => {
      context.clearRect(0, 0, width, height)

      if (framesOnly && height > width) {
        const scale = Math.min(
          width / image.naturalWidth,
          height / image.naturalHeight,
        )
        const drawWidth = image.naturalWidth * scale
        const drawHeight = image.naturalHeight * scale
        const x = (width - drawWidth) / 2
        const y = (height - drawHeight) / 2

        context.drawImage(image, x, y, drawWidth, drawHeight)

        const edgeFade = Math.min(56, drawHeight * 0.2)
        const topFade = context.createLinearGradient(0, y, 0, y + edgeFade)
        topFade.addColorStop(0, 'rgba(8, 18, 24, 0.44)')
        topFade.addColorStop(1, 'rgba(8, 18, 24, 0)')
        context.fillStyle = topFade
        context.fillRect(x, y, drawWidth, edgeFade)

        const bottomFade = context.createLinearGradient(
          0,
          y + drawHeight - edgeFade,
          0,
          y + drawHeight,
        )
        bottomFade.addColorStop(0, 'rgba(8, 18, 24, 0)')
        bottomFade.addColorStop(1, 'rgba(8, 18, 24, 0.44)')
        context.fillStyle = bottomFade
        context.fillRect(
          x,
          y + drawHeight - edgeFade,
          drawWidth,
          edgeFade,
        )
        return
      }

      drawImageCover(image)
    }

    const findClosestFrame = (progress: number) => {
      let closest = frames[0]
      let distance = Math.abs(progress - closest.progress)

      for (let index = 1; index < frames.length; index += 1) {
        const nextDistance = Math.abs(progress - frames[index].progress)
        if (nextDistance >= distance) break
        closest = frames[index]
        distance = nextDistance
      }

      return closest
    }

    const render = () => {
      frameRequest = 0
      smoothed = reducedMotion
        ? 0
        : smoothed + (target - smoothed) * (framesOnly ? 0.2 : 0.12)

      if (frames.length) {
        const frame = findClosestFrame(smoothed).image
        if (frame !== lastRenderedFrame) {
          drawFrame(frame)
          lastRenderedFrame = frame
        }
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
      const bounds = canvas.getBoundingClientRect()
      const nextWidth = Math.max(1, Math.round(bounds.width))
      const nextHeight = Math.max(1, Math.round(bounds.height))
      const dpr = Math.min(window.devicePixelRatio || 1, framesOnly ? 1 : 2)
      const bufferWidth = Math.round(nextWidth * dpr)
      const bufferHeight = Math.round(nextHeight * dpr)

      width = nextWidth
      height = nextHeight

      if (canvas.width === bufferWidth && canvas.height === bufferHeight) {
        requestFrame()
        return
      }

      canvas.width = bufferWidth
      canvas.height = bufferHeight
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = framesOnly ? 'medium' : 'high'
      lastRenderedFrame = null
      requestFrame()
    }

    const loadFrameCache = async () => {
      if (cacheStarted || reducedMotion) return
      cacheStarted = true

      if (!framesOnly) {
        await new Promise((resolve) => window.setTimeout(resolve, 250))
      }
      if (cancelled) return

      const viewportBudget =
        window.innerWidth < 640 ? 36 : window.innerWidth < 1024 ? 48 : 60
      const count = Math.min(viewportBudget, availableFrames)
      const indexes = Array.from({ length: count }, (_, index) =>
        Math.round((index * (availableFrames - 1)) / (count - 1)) + 1,
      )
      const loaded = new Array<CachedFrame | undefined>(count)
      const priorityIndexes = framesOnly
        ? Array.from(
            new Set([
              0,
              Math.min(1, count - 1),
              Math.min(2, count - 1),
              Math.min(3, count - 1),
              Math.round((count - 1) * 0.25),
              Math.round((count - 1) * 0.5),
              Math.round((count - 1) * 0.75),
              count - 1,
            ]),
          )
        : Array.from({ length: count }, (_, index) => index)
      const priorityCount = priorityIndexes.length
      const prioritySet = new Set(priorityIndexes)
      const loadOrder = [
        ...priorityIndexes,
        ...Array.from({ length: count }, (_, index) => index).filter(
          (index) => !prioritySet.has(index),
        ),
      ]
      let cursor = 0
      let prioritySettled = 0
      let cachePublished = false

      const publishFrames = () => {
        if (cancelled) return
        frames = loaded.filter((frame): frame is CachedFrame => Boolean(frame))
        if (!cachePublished && frames.length >= 2) {
          cachePublished = true
          setHasFrameCache(true)
        }
        if (cachePublished) requestFrame()
      }

      const loadNext = async () => {
        while (!cancelled && cursor < loadOrder.length) {
          const outputIndex = loadOrder[cursor]
          const sourceIndex = indexes[outputIndex]
          cursor += 1

          try {
            const image = await loadImage(
              `/hero-frames/frame-${String(sourceIndex).padStart(3, '0')}.webp`,
            )
            loaded[outputIndex] = {
              image,
              progress: outputIndex / (count - 1),
            }
          } catch {
            // A partial cache still gives mobile browsers a working scrub path.
          } finally {
            if (prioritySet.has(outputIndex)) {
              prioritySettled += 1
              if (prioritySettled === priorityCount) publishFrames()
            } else if (cachePublished) {
              publishFrames()
            }
          }
        }
      }

      await Promise.all(
        Array.from({ length: framesOnly ? 4 : 6 }, loadNext),
      )
      if (cancelled) return

      publishFrames()
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
    }

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches
      target = reducedMotion ? 0 : readProgress()
      if (!reducedMotion) void loadFrameCache()
      requestFrame()
    }

    resizeCanvas()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', resizeCanvas)
    window.visualViewport?.addEventListener('resize', resizeCanvas)
    motionQuery.addEventListener('change', handleMotionChange)
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas)

    if (!framesOnly) {
      video.addEventListener('loadedmetadata', readDuration)
      video.addEventListener('loadeddata', markVideoReady)
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) readDuration()
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markVideoReady()
    }

    updateTarget()
    void loadFrameCache()

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', readDuration)
      video.removeEventListener('loadeddata', markVideoReady)
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', resizeCanvas)
      window.visualViewport?.removeEventListener('resize', resizeCanvas)
      motionQuery.removeEventListener('change', handleMotionChange)
      resizeObserver.disconnect()
      if (frameRequest) window.cancelAnimationFrame(frameRequest)
      frames = []
    }
  }, [framesOnly, source])

  const useLocalFallback = () => {
    if (source === cloudVideo) {
      setHasVideoFrame(false)
      setHasFrameCache(false)
      setSource(localVideo)
    }
  }

  const backdropState = [
    'hero-video-backdrop',
    framesOnly ? 'is-frame-only' : '',
    hasVideoFrame ? 'is-video-ready' : '',
    hasFrameCache ? 'is-cache-ready' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={backdropState} aria-hidden="true">
      <img
        className="hero-video-ambient"
        src="/hero-poster.jpg"
        alt=""
        width="1920"
        height="1080"
      />
      <img
        className="hero-video-poster"
        src="/hero-poster.jpg"
        alt=""
        width="1920"
        height="1080"
      />
      <video
        key={`${framesOnly ? 'frames' : 'video'}-${source}`}
        ref={videoRef}
        className="hero-video"
        src={framesOnly ? undefined : source}
        poster="/hero-poster.jpg"
        crossOrigin="anonymous"
        muted
        playsInline
        preload={framesOnly ? 'none' : 'auto'}
        tabIndex={-1}
        disablePictureInPicture
        onError={useLocalFallback}
      />
      <canvas ref={canvasRef} className="hero-video-canvas" />
      <div className="hero-video-scrim" />
    </div>
  )
}
