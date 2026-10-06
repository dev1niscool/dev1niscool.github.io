# Little voyages

An illustrated, interactive atlas of 29 personal cruises, from 2005 to 2025.

**Explore:** https://dev1niscool.github.io/little-voyages/

- Animated, individually selectable ships on a zoomable world map
- Illustrated routes and port labels, with smooth focus on a selected voyage
- Year timeline, ship/port search, cruise-line filter, and chronological playback
- Dates, duration, itinerary, historical research notes, and source links for every voyage
- Responsive desktop and mobile layout; keyboard ship controls and reduced-motion support
- Downloadable JSON logbook; bundled map geometry and fonts; no map API key, trackers, or backend

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

The atlas lives in the existing `dev1niscool.github.io` repository: `little-voyages/` holds the published site and `little-voyages/source/` holds this source project. GitHub Pages serves the `main` branch. To prepare updated files from this source folder, run `npm run build` followed by `npm run stage`, review the changes, and commit the `little-voyages/` directory. Staging copies only the build output into the parent folder and does not touch the portfolio homepage.

## Historical research

The starting point was a personal list of ships, destinations, and dates. A supplied date can be departure, arrival, or a day during the cruise. Research comes from historical brochures, archived itineraries, contemporary passenger reviews, and cruise forums. Source links and their specific relevance appear in each voyage’s **Notes & sources** tab.

`research/early.json`, `research/middle.json`, and `research/recent.json` contain the research records. `scripts/build-data.mjs` normalizes their ports, preserves the original notes, assigns map coordinates, and generates `src/data.js` and `public/data/cruises.json`. Regenerate after editing research:

```sh
node scripts/build-data.mjs
npm test
```

Confidence labels distinguish historical matches from likely reconstructions. A historical match does not imply that every port call is independently verified as actually visited. Notes identify scheduled itineraries, known changes, and remaining uncertainty. The owner confirmed that the August 2008 Disney Magic cruise departed Los Angeles, resolving the original Bahamas mismatch. The full length of the June 2022 Regal Princess trip is still uncertain; the map explicitly shows a documented candidate segment and leaves the personal trip dates and duration unconfirmed.

Map routes are **illustrative**, using port connections and some offshore waypoints. They are not recorded ship tracks or suitable for navigation. Ports, scenic cruising locations, and candidate segments should not be interpreted as independently verified personal visits.

## Stack and attribution

Vite, vanilla JavaScript, and D3. Static HTML/CSS/JS with no runtime services.

- Map geometry: [Natural Earth, 1:110m countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson), public domain. Geometry simplified in precision, properties reduced, Antarctica omitted.
- [DM Sans](https://github.com/googlefonts/dm-fonts) and [Fraunces](https://github.com/undercasetype/Fraunces), SIL Open Font License. Fonts bundled locally; license texts in `public/fonts/`.
- Ship and whale illustrations are original SVG artwork.
