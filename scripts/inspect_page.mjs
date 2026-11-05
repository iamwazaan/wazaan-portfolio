import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ??
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto('http://localhost:5199', { waitUntil: 'networkidle0' })
const inspectionStart = Number(process.argv[2] ?? 3500)

const result = await page.evaluate((inspectionStart) => {
  const sections = Array.from(document.querySelectorAll('section')).map(
    (section) => {
      const rect = section.getBoundingClientRect()
      return {
        id: section.id,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        height: rect.height,
      }
    },
  )

  const start = inspectionStart
  const end = start + 900
  const visibleText = Array.from(
    document.querySelectorAll('h2, h3, h4, p, li, dt, dd, summary'),
  )
    .filter((element) => {
      const rect = element.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const bottom = rect.bottom + window.scrollY
      return (
        element instanceof HTMLElement &&
        element.offsetParent !== null &&
        bottom > start &&
        top < end
      )
    })
    .map((element) => ({
      tag: element.tagName,
      text: element.textContent?.trim(),
      top: element.getBoundingClientRect().top + window.scrollY,
      bottom: element.getBoundingClientRect().bottom + window.scrollY,
    }))

  return { sections, visibleText }
}, inspectionStart)

console.log(JSON.stringify(result, null, 2))
await browser.close()
