# Hosting & deployment reference

Live site: **https://kumaresanuxd.in** (and `https://www.kumaresanuxd.in`)

## The setup at a glance

| Piece | Where | Notes |
| ----- | ----- | ----- |
| Source code | GitHub — `kumaresan84/kumaresanuxd-portfolio` | branch `main` |
| Build & deploy | GitHub Actions → GitHub Pages | auto-runs on every push to `main` |
| Hosting | GitHub Pages | free, static |
| DNS | Cloudflare (`tim`/`malavika.ns.cloudflare.com`) | domain bought at GoDaddy, nameservers delegated to Cloudflare |
| Domain registrar | GoDaddy | only the registration lives here now |
| Email | FreeHosting (`panel.freehosting.com`) | untouched — MX/SPF/mail records still point there |

## How a deploy works

The site is a **static export** (`output: "export"` in `next.config.ts`), so it builds
to plain HTML/CSS/JS in `out/` and needs no server.

`.github/workflows/deploy.yml` runs on every push to `main`:
1. `npm ci`
2. `npm run build` → produces `out/`
3. `touch out/.nojekyll` (so GitHub serves the `_next/` folder as-is)
4. uploads `out/` and publishes it to GitHub Pages

Watch runs under the repo's **Actions** tab. A green check = live in ~1–2 min.

## Updating the site

```bash
# edit content/images, then:
git add -A
git commit -m "your message"
git push
```

That's the whole workflow — no FTP, no zip, no manual upload. Content lives in `content/`,
images in `public/projects/<slug>/` (see `content/case-studies/README.md`).

## DNS records (in Cloudflare)

Website (all **grey cloud / DNS only** — never orange-proxy these, it breaks Pages' HTTPS):

| Type | Name | Value |
| ---- | ---- | ----- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `kumaresan84.github.io` |

Email/FTP records (`mail`, `imap`, `smtp`, `ftp`, `autoconfig`, `MX`, `SRV`, SPF `TXT`)
point to FreeHosting and are left alone — deleting them would break domain email.

## Custom domain + HTTPS on GitHub Pages

- Repo → **Settings → Pages**: Source = **GitHub Actions**, Custom domain = `kumaresanuxd.in`.
- After DNS resolves, GitHub issues a free Let's Encrypt certificate automatically
  (10–15 min). Then tick **Enforce HTTPS** so `http://` redirects to `https://`.

## Troubleshooting

- **Site not updating after a push** — check the Actions tab for a failed run; fix and re-push.
- **HTTPS shows "not secure" / cert errors** — confirm the Cloudflare records are **grey cloud**,
  not orange. Orange proxy blocks GitHub's certificate. Wait 15 min after switching to grey.
- **Seeing an old/placeholder page** — local DNS cache. Flush it:
  `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`, or test on mobile data.
- **`git push` rejected re: workflow scope** — the GitHub token needs the `workflow` scope
  (Tokens classic → edit → check `workflow`) to change files under `.github/workflows/`.

## Related docs

- `DEPLOY.md` — the older FreeHosting/manual-upload method (superseded by GitHub Pages)
- `content/case-studies/README.md` — how to add real case-study content and images
