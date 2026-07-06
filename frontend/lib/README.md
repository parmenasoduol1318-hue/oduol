# SwiftReply Frontend Lib

This folder contains shared frontend utilities used across the SwiftReply app.

## Purpose

- Centralized helper functions
- Reusable logic for API calls
- Storage utilities
- Theme configuration
- Validation helpers

## Structure

- `storage.ts` → Local storage helpers
- `theme.ts` → App theme config (light/dark)
- `validators.ts` → Input validation rules

## Usage

Import utilities like this:

```ts
import { saveToStorage, getFromStorage } from "@/lib/storage";