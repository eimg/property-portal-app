# Web application guidance

This independent repository is the responsive English-language web client.
It uses TypeScript, React, Vite, and the configured shadcn/ui preset. Keep API
access behind `src/api.ts`; the API is authoritative for identity, permissions,
and listing state. Client-side navigation or role checks do not replace server
authorization.

Keep public discovery usable without an account, use MMK only, and provide
clear loading, empty, validation, and API error states. Read `../SPEC.md` for
product behavior and `README.md` for local setup.
