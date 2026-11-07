# Portfolio

Personal portfolio built with Next.js 16, React 19, next-intl, Tailwind CSS 4 and daisyUI 5.

The site is a fully static export (`output: "export"`) and is deployed to GitHub Pages. It does not depend on Vercel or any server runtime.

## Requirements

- Node.js 24
- pnpm 11

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/en/](http://localhost:3000/en/) or [http://localhost:3000/es/](http://localhost:3000/es/). During development `basePath` is empty and there is no `/` route: with `localePrefix: "always"`, only `/en/` and `/es/` exist. The `/` to `/en/` redirect is a static file that only applies to the exported site.

## Build and preview

```bash
pnpm build
pnpm preview
```

`pnpm build` writes the static site to `out/`. `pnpm preview` serves that directory at [http://localhost:4173](http://localhost:4173).

To preview a build that uses the GitHub Pages project-site prefix:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/<repo>"
pnpm build
pnpm preview
```

Open `http://localhost:4173/<repo>/`, not `http://localhost:4173/`. When a `basePath` is set, `/` is outside the app and returns the preview server's 404.

```bash
NEXT_PUBLIC_BASE_PATH=/<repo> pnpm build
NEXT_PUBLIC_BASE_PATH=/<repo> pnpm preview
```

## Environment variables

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin used by canonical URLs, Open Graph, JSON-LD, sitemap and robots. No path. | `https://user.github.io` |
| `NEXT_PUBLIC_BASE_PATH` | Path prefix for project sites. Leave empty for user sites and custom domains. | `/<repo>` |

Both values are read at build time. The GitHub Actions workflow fills them from `actions/configure-pages`.

## Deployment

1. In the repository, go to **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds the site and deploys `out/`.

The workflow uses `actions/configure-pages` to obtain the correct `base_path` and `origin`, so the same configuration works for project sites (`user.github.io/<repo>`) and custom domains.

Static-host requirements already handled by the build:

- `trailingSlash: true`, so every route is emitted as `<route>/index.html`.
- `public/.nojekyll`, so GitHub Pages does not skip the `_next` directory.
- `public/index.html`, which redirects `/` to `en/` using a relative URL.
- `out/404.html`, generated from `app/global-not-found.tsx`.

## Internationalization

- Locales: `en` and `es`.
- `localePrefix: "always"`: English lives at `/en/`, Spanish at `/es/`.
- `localeDetection` is disabled; the URL is the only source of truth.
- Metadata, `hreflang`, sitemap and JSON-LD are generated per locale.

## External icon dependency

Skill icons use `@iconify/react` with remote collections. Browsers fetch the icon data from `api.iconify.design` at runtime; the static build does not bundle it.
