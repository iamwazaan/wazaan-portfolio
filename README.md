# Wazaan Wazeer portfolio

A responsive portfolio for Wazaan Wazeer, focused on network administration, security, systems, cloud training, hands-on lab work, and verifiable credentials.

## Stack

- React and TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Lenis smooth scrolling
- GSAP, ScrollTrigger, and `@gsap/react`
- Source-owned React Bits adaptations for split text and magnetic CTAs

## Local development

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5199`.

## Quality checks

```bash
npm run lint
npm run build
```

## Cloudflare Pages deployment

Wrangler is installed as a project dependency and configured in `wrangler.jsonc`.

```bash
npx wrangler login
npm run deploy:pages
```

The deployment script builds the Vite application and publishes `dist` to the `wazaan-portfolio` Pages project from the `main` branch.

## Certificate assets

Certificate PDFs and the AWS badge are stored in `public/certificates`. Optimized WebP previews live in `public/certificates/previews`.

To regenerate previews, install Python, PyMuPDF, and Pillow, then run:

```bash
python scripts/render_certificates.py
```

The downloadable résumé is `public/Wazaan-Wazeer-CV.pdf`.

## Hero media

The scroll-scrubbed background uses the approved CloudFront video as its desktop source. `public/hero.mp4` is the offline fallback and `public/hero-poster.jpg` is the first-frame poster generated from the supplied frame sequence. Touch devices use the local frame sequence directly, so iOS does not depend on autoplay or media seeking.

Up to 60 optimized canvas-cache frames are loaded adaptively (36 on phones and 48 on tablets). Portrait phones render the complete 16:9 scene over a subtle moving fill instead of enlarging and center-cropping it. The frames can be regenerated from an EZGIF frame export with:

```bash
python scripts/prepare_hero_frames.py "path/to/ezgif-frames"
```

## Contact form delivery

The “Email Wazaan” buttons open an accessible modal form. Production builds use the public Formspree endpoint configured in `.env.production`, so submissions are delivered directly to Wazaan’s inbox.

To use a different Formspree form locally:

1. Sign in at [Formspree](https://formspree.io/) and create a new form.
2. Set and verify `wazaanwazeer@gmail.com` as the recipient.
3. Copy the endpoint URL, such as `https://formspree.io/f/xxxxxxxx`.
4. Copy `.env.example` to `.env.local` and replace the example value:

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

5. Restart `npm run dev`. A hosting-provider environment variable with the same name can override `.env.production` during deployment.

Without an endpoint, the form keeps a graceful fallback that opens the visitor’s email application with their message prefilled.
