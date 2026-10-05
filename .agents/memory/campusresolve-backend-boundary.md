---
name: CampusResolve backend boundary
description: The existing CampusResolve API is maintained separately from this Replit frontend.
---

Keep the separately maintained backend and its API contract intact. Continue from the existing CampusResolve code rather than rebuilding the product or adding mock data.

**Why:** The user said the backend is developed and tested separately and asked that its APIs and working behavior not be replaced.

**How to apply:** Limit this project's changes to the existing frontend unless the user explicitly asks otherwise. Reuse the current API client and auth state; do not assume the backend is reachable at `localhost:8080` from the Replit preview.
