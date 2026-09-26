# Decomp Frontier website

Open `index.html` in a browser to preview. No build or installation is needed.

For a local server, run `python -m http.server 8080 --directory web` from the parent folder, then visit http://localhost:8080.

## Personalize

Edit `site-config.js`:
- `discord`: your full HTTPS Discord invite.
- `logo`: a path to your logo, such as `assets/logo.png`. Leave empty to use the temporary gateway mark.
- `gameplayVideo`: a full HTTPS YouTube video URL. The community section displays a responsive player without autoplay and a separate YouTube link. Leave empty to show the “Gameplay video coming soon” placeholder. The chosen video must allow embedding; visitors can use the YouTube link if playback is restricted.
- `colors`: change the accent, button, and background colors. Additional decorative blue tones are in `styles.css` and the gateway illustration in `index.html`.
- `repositories`: the Installer, Tools, and Database cards. Set each `url` to its full HTTPS destination (a download page, hosted tool, database, or GitHub repository). Customize `action` to change its button label. Keep the `installer`, `tools`, and `database` IDs to preserve the navigation links.
- `contributors`: display names, community usernames, optional roles, and optional HTTPS profile links. Initials are generated automatically. Omit `url` or leave it empty for a contributor without a profile link.

Missing links open a clear “coming soon” dialog; no unrelated communities or repositories are linked. No contributor identities are invented.

The gateway illustration and temporary mark are original SVGs. The example site's images, logo, and wording are not reused. Fonts load from Google Fonts, with system fallbacks if offline.

## Publish

Upload the contents of this `web` folder to any static host (GitHub Pages, Cloudflare Pages, Netlify, or your web server). Keep the file structure intact. No backend, credentials, or build step is required.
