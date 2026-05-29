# sdet-automation-challenge

Production-ready UI and API automation framework built with Playwright + TypeScript.

## Highlights
- Layered test architecture (fixtures, page objects, API clients, typed models)
- Isolated UI and API projects configured in Playwright
- Environment-driven base URLs and timeout configuration
- Local deterministic app + API for reliable CI execution
- CI-friendly retries, reporters, traces, screenshots, and videos on failure

## Project Structure
- `src/config` environment and runtime configuration
- `src/ui/pages` UI page objects
- `src/api/clients` API service clients
- `src/api/types` typed API models
- `tests/fixtures` reusable fixtures
- `tests/ui` browser E2E tests
- `tests/api` API integration tests
- `test-server.js` local app/API under test

## Run
```bash
npm install
npm run test:ui
npm run test:api
npm test
```

## Environment Variables
- `UI_BASE_URL` (default: `http://127.0.0.1:3000`)
- `API_BASE_URL` (default: `http://127.0.0.1:3000`)
- `TEST_TIMEOUT_MS` (default: `30000`)
