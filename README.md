# Property Portal Web App

The browser application for discovering properties for sale or rent and using marketplace account workflows. It is a standalone React and TypeScript project that communicates with the Property Portal API over HTTP.

## Requirements

- Node.js and npm
- The Property Portal API running locally for live data

## Local development

From this directory:

```sh
npm install
npm run dev
```

Vite prints the local development URL when it starts. Set `VITE_API_URL` when the API is not available at the default `http://localhost:4000/api/v1` address.

For local role-based walkthroughs, start the API and seed its database using the API project's README (in the coordinated workspace, see [`../api/README.md`](../api/README.md)). You can also register a buyer/renter, owner, or authorized agent account through the app.

When the API runs on another host, set `VITE_API_URL` to its versioned API base URL, for example `http://192.168.1.20:4000/api/v1`. The setting is read by Vite at startup; restart the development server after changing it.

## Available commands

- `npm run dev` — start the local web server.
- `npm run build` — type-check and create a production build in `dist/`.
- `npm run typecheck` — run the TypeScript project checks.
- `npm run preview` — serve the production build locally.

The web app is a standalone project with its own dependencies and Git history. When working in the full Property Portal workspace, the coordination root's `SPEC.md` describes the shared product behavior. This README contains the setup and run commands needed for local web development.
