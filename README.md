# André’s Notebook

A local personal blog built with Astro, MDX, and a shared CSS stylesheet. All writing and biographical details are sample content.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended) and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:4321. Use `pnpm check` for type checks and `pnpm build` for a static production build. `pnpm preview` serves that build locally. No hosting or deployment is configured.

## Publish a local entry

Add a `.md` or `.mdx` file in `src/content/entries/`:

```yaml
---
title: Your title
description: A short summary
date: 2026-10-18
kind: articles
tags: [Learning]
draft: false
---
```

Use `articles`, `signals`, or `books` for `kind`. Books can include an `author`. The filename becomes the URL, such as `/articles/your-filename/`. Set `draft: true` to exclude an entry from pages, routes, and search. MDX can import Astro components; see the sample essay.

Search matches titles, descriptions, tags, and body text in the browser. It supports multiple words and a shareable `?q=` query after submitting. It makes no external requests. Drafts are excluded; scheduled publication is not implemented.

## Structure

- `src/layouts/Base.astro`: document shell, navigation, footer, metadata
- `src/components/`: reusable entry list and probability illustration
- `src/pages/`: six main pages and generated entry pages
- `src/content.config.ts`: validated content schema
- `src/styles/global.css`: responsive design

Replace the sample name and biography in the layout, About page, and page metadata when ready. Fonts are system fonts; no external font or analytics services are used.
