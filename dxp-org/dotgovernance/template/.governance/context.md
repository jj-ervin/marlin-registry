# Project Context

## What this project is

A TypeScript API service handling user authentication and session management. Built with Node.js, Express, and PostgreSQL. Part of a larger SaaS product — this service handles auth only, other services consume it via JWT.

## Current state

- Access token issuance and validation: complete
- Refresh token storage and basic retrieval: complete
- Refresh token rotation (invalidate old, issue new atomically): in progress
- Rate limiting on auth endpoints: not started
- Logout and token revocation: not started

## Key decisions made

- **JWT over sessions** — stateless tokens chosen for horizontal scaling. Not revisiting this.
- **PostgreSQL for refresh token storage** — needed audit trail and revocation support. Redis was considered but rejected for this reason.
- **15-minute access token expiry** — security requirement from product. Not negotiable.

## Known constraints

- Cannot change the database schema without a migration reviewed by the team
- The `/auth/refresh` endpoint must be backward-compatible — existing clients depend on its response shape
- No external auth providers in scope for this phase

## What done looks like

Refresh token rotation is complete when: old token is invalidated atomically with new token issuance, the endpoint returns the new token pair, and there is a test covering the concurrent rotation edge case.
