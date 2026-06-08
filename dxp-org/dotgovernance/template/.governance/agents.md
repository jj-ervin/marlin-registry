# Agent Instructions

## What this project is

A TypeScript API service that handles user authentication and session management for a SaaS product.

## What agents are allowed to do

- Read and modify files in `src/`
- Write and run tests in `tests/`
- Install npm packages with approval
- Create new files and directories within the project
- Suggest architectural changes but wait for confirmation before implementing

## What agents are NOT allowed to do

- Modify `.env` files or any file containing secrets
- Push to the remote repository directly
- Delete files without confirming first
- Change the database schema without explicit instruction
- Modify CI/CD pipeline configuration

## How agents should work

- Prefer small, focused changes over large rewrites
- Ask before making changes that affect more than one area of the codebase
- Use TypeScript strict mode — do not disable type checks
- Write tests for any new logic before considering a task done

## Current focus

Implementing refresh token rotation. The access token logic is done. The refresh token endpoint needs to invalidate the old token and issue a new one atomically.
