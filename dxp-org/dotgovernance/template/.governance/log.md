# Work Log

Newest first. One entry per meaningful session or decision.

---

## 2026-06-08

**What changed:** Refresh token storage schema finalized. Added `invalidated_at` column to `refresh_tokens` table.
**Why:** Needed a way to mark tokens as used without deleting them, so revocation is auditable.
**What was done:** Migration written and tested locally. Schema docs updated.
**Next:** Implement the rotation logic in `/auth/refresh` — invalidate old token and issue new one in a single transaction.

---

## 2026-06-07

**What changed:** Access token validation middleware complete.
**Why:** Required before refresh token work could start — refresh flow depends on being able to validate the incoming token.
**What was done:** `validateToken` middleware written, unit tests passing, wired into protected routes.
**Next:** Refresh token storage schema.

---
