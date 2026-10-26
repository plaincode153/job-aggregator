# Job Aggregator

A work-in-progress job search app built with React and Vite. This is a learning project for practising React components, state, effects, API requests, and routing.

The app uses [Arbetsförmedlingen’s JobSearch API](https://jobsearch.api.jobtechdev.se/) to fetch job listings from Platsbanken, Sweden’s public job board.

## Current features

- Search for jobs by keyword.
- Select a region to request jobs for that location.
- Fetch jobs in batches of up to 20.
- Load more jobs while keeping the results already displayed.
- Hide the Load More button when the API indicates there are no more results.
- Expand a listing to read its description.
- Follow links to the original job pages.
- Show fallback content when listing information is missing.

## Work in progress

This is an early work in progress, focused on learning and building the app's logic. Styling is intentionally basic and will be polished later.

Search and region changes do not yet clear previously loaded results or reset the offset. Improving that behaviour is the next step, so changing searches or regions can currently mix results or skip earlier matches.

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
