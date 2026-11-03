# Virat Kohli World

A standalone React + Vite fan tribute with an India-blue, ivory and saffron design. This is a separate project from the Messi website.

## Run locally

Requires Node.js 20.19+ or 22.12+ (supported Vite versions), and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:4174. No Python, backend, database, account or API key is required.

```sh
pnpm build
pnpm preview
```

The production app is static HTML, CSS and JavaScript in `dist/`. Upload that directory to any static host. Vite's local development server handles JSX transformation and hot reload; it is not a production backend. The app uses section anchors rather than routes, so no SPA rewrite configuration is needed. The build uses relative asset paths and can be hosted in a subdirectory.

## Experience

- Full-bleed cinematic hero from a 4928 × 3264 source, served via responsive `srcset` (replaces the blurry crop).
- Intro splash, scroll progress, active-section nav, records ticker and a Cmd/Ctrl+K (or `/`) search palette.
- 13 innings across ODI, Test, T20I and IPL, filterable, each with a story dialog and an embedded official video where one exists.
- Video theatre: 25 official films (ICC, Star Sports, RCB, ECB, cricket.com.au, ACC) via YouTube's privacy-enhanced player, with category filters.
- Record vault: 38 dated milestones with format filters and search.
- 23-moment timeline, the story of the number 18, per-format career stats, a 14-photo gallery with keyboard lightbox.
- Fan zone: a 10-question quiz and a cheer wall (stored only in the visitor's browser).
- Accessible dialogs, reduced-motion support, responsive down to phones.

## Sources and assets

All photographs are free-licensed Wikimedia Commons assets. They remain on Wikimedia's image CDN; this app does not bundle local copies. Full image URLs, descriptions, original dimensions, authors and licences are in `src/photos.json`. Display crops are disclosed in the credits.

- Hero: Dun.can, CC BY 2.0, Trent Bridge, August 2018.
- Early career: Chubby Chandru, CC BY 2.0, Chennai, December 2010.
- India chapter: NAPARAZZI, CC BY-SA 2.0, January 2015.
- Bengaluru: Aniket Suryavanshi, CC BY 2.0, Chinnaswamy Stadium, March 2017.
- World champions: Prime Minister's Office, Government of India, GODL-India, team reception in New Delhi, July 2024. This is a homecoming photograph, not the on-field trophy ceremony.

Photos illustrate the chapters; captions give their actual dates. No paid stock, generated likeness or rehosted video is used; videos are embedded from publishers. Fonts are Barlow Condensed and DM Sans from Google Fonts (SIL Open Font License). Photos and fonts require an internet connection; system font fallbacks and photo source links remain available if they fail.

Cricket sources are linked in `src/data.js` and in the page. ICC reports support the 2008/2011 chapters, Melbourne 2022, the 50th ODI century, the 2023 World Cup and the 2024 T20 World Cup final. IPL reports support the Bengaluru innings and 973-run season. The numbers are expressly historical milestones, not current career totals. Highlights open on the official publisher's site; availability is controlled by that publisher.

## Project layout

- `src/App.jsx`: application state and composition.
- `src/components/`: sections, filters, journey, photography and dialogs.
- `src/data/`: innings, records, videos, timeline, stats, quiz and sources.
- `src/photos.json`: free image metadata and licence attribution.
- `src/styles.css`: layout, India-inspired palette and responsive rules.
- `public/assets/favicon.svg`: original number 18 favicon.
- `.openai/hosting.json`: separate Sites identity; no credentials are stored.

## Verification

Production build passed. Local JSDOM checks passed for React StrictMode, all innings/filter combinations, official links, dialog open/close and Escape, focus restoration, body scroll cleanup, journey keyboard controls, photo failure recovery, mobile menu state and internal anchors.

A rendered browser preview and remote-image loading could not be verified in the restricted execution environment. Check the page at desktop and mobile widths in your browser before public launch.
