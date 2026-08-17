# Uday Constructions & Developers

A full-stack React website for UCD. It includes a responsive project showcase, filterable work portfolio, project-detail dialogs, and a database-backed project enquiry workflow.

## Run locally

Install dependencies, then run the frontend and API in separate terminals:

```bash
npm run server
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:8788`.

## Production

```bash
npm run build
npm start
```

`npm start` serves the built React app and the API from one Node server on port `8788` (or `PORT` when supplied).

## API

- `GET /api/health` — service health check
- `GET /api/projects` — selected work shown in the portfolio
- `POST /api/enquiries` — save an enquiry (`name`, `phone`, `email`, and `message` required)

Enquiries are stored in `data/ucd.db`, a SQLite database created automatically on first run. The database directory is kept out of source control.
