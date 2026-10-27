# Job Aggregator

A work-in-progress job search app built with React and Vite. This is a learning project for practising React components, state, effects, API requests, and routing.

The app uses [Arbetsförmedlingen’s JobSearch API](https://jobsearch.api.jobtechdev.se/) to fetch job listings from Platsbanken, Sweden’s public job board.

## Current features

- Search for jobs by keyword.
- Select a region to request jobs for that location.
- Start fresh results when the keyword or region changes, resetting the pagination offset.
- Keep current results when the same keyword is submitted again.
- Fetch jobs in batches of up to 20.
- Load more jobs while keeping the results already displayed.
- Hide the Load More button when the API indicates there are no more results.
- Expand a listing to read its description.
- Follow links to the original job pages.
- Show fallback content when listing information is missing.

## Work in progress

This is an early work in progress, focused on learning and building the app's logic. Styling is intentionally basic and will be polished later.

Currently, a keyword search is required before jobs are fetched. After searching, changing the region fetches fresh results for that keyword and location. Browsing jobs by region without entering a keyword is a possible next feature.

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
