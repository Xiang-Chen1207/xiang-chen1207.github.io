# Xiang Chen — Academic Homepage

Personal academic homepage for Xiang Chen (陈翔).

**Website:** https://xiang-chen1207.github.io/

## Site structure

- `index.html`: biography, education, experience, publications, projects, and honors.
- `styles.css`: typography, purple theme, and responsive layout.
- `script.js`: mobile navigation and active section highlighting.
- `assets/`: portrait, university emblems, research figures, and locally hosted fonts.

The site uses plain HTML, CSS, and JavaScript with no build step or UI dependencies.

## Preview locally

Run `python -m http.server 4173 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:4173/.

## Publish updates

GitHub Pages publishes the root of the `main` branch. Commit and push changes to `main` to update the website. The `.nojekyll` file keeps the site as plain static files.

Local previews, exports, working notes, and the unused CV are excluded from the repository.

## Acknowledgments

- Layout and typography inspired by https://shanhe321.github.io/.
- University emblems from the official SUSTech and Tsinghua University websites.
- Roboto is distributed under the license included in `assets/fonts/Roboto-LICENSE.txt`.
- Research and project figures are supplied by the homepage owner or sourced from the linked project wiki.

## Public visit statistics

`visitor-stats.js` displays daily and total visitor estimates and page views in the footer, starting 30 October 2026. Daily buckets use Asia/Shanghai time (UTC+8). A page load sends one POST request to the public API used by the [Busuanzi service](https://busuanzi.9420.ltd/), currently `https://bsz.iirose.cn/api`; the date is stored in the page key `/__visits/YYYY-MM-DD` and the hostname supplies cumulative totals. Five-minute and visibility refreshes use GET without incrementing counts. Section navigation does not add views.

Only `https://xiang-chen1207.github.io` records visits. Change `siteOrigin` if the site moves to a custom domain, and plan a counter migration separately. Local previews never contact the statistics service. Counts cannot reconstruct visits before integration. The public service is provided without an uptime or data-retention guarantee; ad blockers, network failures, browser privacy settings, and approximate visitor identification may affect totals. A failed request displays an unavailable state rather than zero or stale numbers.

The service receives the normal connection IP and browser user agent plus the site's hostname and dated bucket; query parameters, section hashes, and the browser referrer are not sent. Its returned anonymous visitor identifier is stored locally for repeat-visitor recognition. Do Not Track and Global Privacy Control suppress the counting POST, while public totals remain readable with GET. No account credentials or administrative secrets are present in the frontend.
