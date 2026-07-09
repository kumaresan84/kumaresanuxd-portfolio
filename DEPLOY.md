# Deploying to FreeHosting.com (static export)

This site is configured for **static export** (`output: "export"` in `next.config.ts`),
so it runs on any plain web host — no Node.js required.

## Build the site

```bash
npm run build
```

This produces an `out/` folder — a complete static site. To bundle it for upload:

```bash
cd out && zip -qr ../kumaresanuxd-site.zip . -x "*.DS_Store" && cd ..
```

`kumaresanuxd-site.zip` has `index.html` at its root, ready to extract into the web root.

## Upload to FreeHosting

1. Log in to your FreeHosting.com control panel → **File Manager**.
2. Open the web root folder (usually `htdocs`; some accounts use `public_html`).
3. Delete any default placeholder (`default.php`, `index.html`, etc.).
4. Upload `kumaresanuxd-site.zip`, then **Extract** it in place.
5. Confirm `index.html` sits directly in the web root (not inside an `out/` subfolder).

FTP alternative: connect with the FTP host/user/password from your FreeHosting welcome
email and upload the **contents of `out/`** into the web root.

## Point the domain (GoDaddy → FreeHosting)

1. In FreeHosting's panel, add `kumaresanuxd.in` as a hosted/parked domain, and copy the
   two **nameservers** it shows you (in the welcome email or "Account Details").
2. In GoDaddy: **Domain Portfolio → kumaresanuxd.in → Nameservers → Change → "I'll use my
   own nameservers"** → paste FreeHosting's two nameservers → Save.
3. Wait for DNS to propagate (usually 1–6 hours, up to 48). Check with
   `dig kumaresanuxd.in NS +short`.

## After it resolves

- Enable **Free SSL / Let's Encrypt** in the FreeHosting panel so the site loads on
  `https://`. Without it the site still works on `http://` but browsers show "Not secure".
- Test both `kumaresanuxd.in` and `www.kumaresanuxd.in`.

## Updating the site later

Re-run `npm run build`, re-zip `out/`, and re-upload/extract (overwrite). Content lives in
`content/`; images in `public/projects/<slug>/` (see `content/case-studies/README.md`).
