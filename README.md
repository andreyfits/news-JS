# News Portal

News portal built with **TypeScript** and **Webpack** on top of [News API](https://newsapi.org/). Pick a news source and read its latest articles.

- **Demo:** <https://andreyfits.github.io/news-JS/>
- **Task:** News API (RS School JavaScript / TypeScript course)

## Tech stack

- TypeScript 6 with `strict` and `noImplicitAny` enabled (see `tsconfig.json`)
- Webpack 5 with `ts-loader`, `copy-webpack-plugin` and `dotenv-webpack`
- ESLint 10 (flat config in `eslint.config.js`) with `typescript-eslint` (`recommendedTypeChecked`, `no-explicit-any` is an error) and Prettier
- Plain CSS: grid layout and fluid typography, works from `320px` to `1920px`

> **Why not TypeScript 7?** `typescript-eslint` supports TypeScript `<6.1` and `ts-loader` needs the JavaScript compiler API,
> which the native TypeScript 7 package does not provide. TypeScript stays on the latest 6.x release.

## Getting started

Requires Node.js 22.15 or newer (`webpack-dev-server` 6 and ESLint 10).

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set the variables:

    | Variable  | Description                                                          |
    | --------- | -------------------------------------------------------------------- |
    | `API_URL` | `https://newsapi.org/v2/` for local development (see the note below) |
    | `API_KEY` | your key from [newsapi.org](https://newsapi.org/)                    |

3. Run `npm start`, the app is served at <http://localhost:8080>

> **Proxy.** News API accepts browser requests only from `localhost`. For a deployed version use the proxy:
> `API_URL=https://rss-news-api.onrender.com/`. The proxy also serves static mocks at
> `https://rss-news-api.onrender.com/mocks/` that do not spend the request limit of your key.

## Scripts

| Script              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm start`         | run the dev server                                 |
| `npm run build`     | production build into `dist/`                      |
| `npm run lint`      | run ESLint for `*.ts` files                        |
| `npm run typecheck` | run the TypeScript compiler without emitting files |
| `npm run deploy`    | build and publish `dist/` to the `gh-pages` branch |

## Project structure

- `src/index.ts` - entry point
- `src/env.d.ts` - typed `process.env` (`API_URL`, `API_KEY`)
- `src/components/app` - `App` wires the controller and the view together
- `src/components/controller` - `Loader` -> `AppLoader` -> `AppController`
- `src/components/view` - `AppView`, `News` and `Sources` views
- `src/types` - enums, interfaces, type aliases and utility types
- `src/utils/dom.ts` - generic DOM helpers

## TypeScript features

- **Enums:** `Endpoint`, `HttpMethod`, `HttpStatus`
- **Interfaces:** `NewsSource`, `Article`, `SourcesResponse`, `ArticlesResponse`, `RequestParams` and the generic `Drawable<T>`
- **Types and unions:** `SourceCategory`, `ResponseStatus`, `ApiData`, function type `Callback<T>`
- **Generics:** `Loader.getResp<T extends ApiData>`, `Callback<T>`, `Drawable<T>`, `getElement<T extends Element>`
- **Utility types:** `Partial<QueryOptions>`, `Pick<NewsSource, "id" | "name">`, `Readonly<Pick<QueryOptions, "apiKey">>`
- **Classes and access modifiers:** `private`, `protected`, `public` and `readonly` members (enforced by the `explicit-member-accessibility` lint rule)

## Design and layout

- News cards live in a CSS grid: 1 column on phones up to 4 columns on wide screens, no horizontal scroll from `320px`
- Sources are wrapped chips inside a scrollable area instead of a hidden horizontal scroll, and they are real buttons
- Fluid gutters and typography via `clamp()`, content is centered and limited to `1600px`
- Cards show a placeholder when a photo is missing or fails to load, and an empty state hint before a source is chosen
- Touch devices always show the author and date, keyboard focus is visible, `prefers-reduced-motion` is respected
- Footer with a link to the author GitHub, the year and the RS School logo linking to the course
