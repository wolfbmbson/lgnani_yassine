# Yassine Lgnani — Social Media Growth Agency

A premium, dark-themed (with light mode) landing page for a social media growth &
creator-branding agency. Trilingual (**English / Français / العربية** with full
Arabic RTL), glassmorphism UI, neon-blue gradients, animated background, glowing
buttons, animated counters, and a sticky navbar.

This repo ships the **same site in two forms** — pick whichever is easier for you:

| Version | Folder | Needs a build? | Best for |
|---|---|---|---|
| **React + Vite** | project root (`src/`) | Yes (Vercel builds it) | Deploying to Vercel / future editing |
| **Standalone** | [`standalone/`](standalone/) | No | Opening directly (double-click) & drag-drop hosting |

Both versions are visually identical and share the same translations.

---

## Option A — Standalone (no tools needed) ✅ easiest to preview

1. Open the [`standalone/`](standalone/) folder.
2. Double-click `index.html`. It opens in your browser instantly — no install, no build.
   > Keep the three files (`index.html`, `translations.js`, `app.js`) together in the same folder.

**Deploy the standalone version to Vercel:**
- Go to [vercel.com](https://vercel.com) → **Add New → Project**.
- Drag-and-drop the `standalone` folder (or its contents), **or** connect the repo and set the
  **Root Directory** to `standalone` and **Framework Preset** to **Other** (no build command).
- Deploy. Done.

---

## Option B — React + Vite (recommended for Vercel)

### Deploy to Vercel (no local tools required)
1. Push this folder to a **GitHub** repo (or upload it in the Vercel dashboard).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel auto-detects **Vite**:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Vercel installs dependencies and builds in the cloud.

`vercel.json` (already included) handles single-page routing.

### Run it locally (requires Node.js 18+)
```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build into /dist
```
> ⚠️ Node.js was **not accessible** on the machine this was built on, so the React
> build could not be verified locally here. It builds fine on Vercel's cloud. If you
> want to run it locally, install Node from https://nodejs.org first.

---

## Customizing content

- **All text (EN/FR/AR)** lives in one place per version:
  - React: [`src/i18n/translations.js`](src/i18n/translations.js)
  - Standalone: [`standalone/translations.js`](standalone/translations.js)
- **Links, platforms, contact info, icons**:
  - React: [`src/config.js`](src/config.js)
  - Standalone: top of [`standalone/index.html`](standalone/index.html) (the first `<script>` block)
- **Colors / theme tokens**: the `:root`, `[data-theme='dark']`, `[data-theme='light']`
  CSS variables (in `src/index.css` or the `<style>` block of the standalone HTML).

### Key links (already wired)
- WhatsApp: `https://wa.me/212628182324`
- TikTok: `https://www.tiktok.com/@yassine.lg1`
- Email: `elitedizey@gmail.com`

---

Website developed by **Mohammed Oukhayi**.
