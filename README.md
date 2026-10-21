# Job Aggregator

A work-in-progress job search app built with React and Vite. This is a learning project for practising React components, state, effects, API requests, and routing.

The app uses [Arbetsförmedlingen’s JobSearch API](https://jobsearch.api.jobtechdev.se/) to fetch job listings from Platsbanken, Sweden’s public job board.

## Current features

- Search for jobs by keyword.
- Display up to 10 results per search.
- Expand a listing to read its description.
- Follow links to the original job pages.
- Show fallback content when listing information is missing.

## Work in progress

Filtering is the next planned feature. The app is still being developed, so features and styling may change.

## Built with

- React
- React Router
- Vite
- JavaScript
- CSS Modules

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server and open the local URL shown in the terminal:

```bash
npm run dev
```

## Other commands

```bash
npm run build     # Create a production build in dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```
