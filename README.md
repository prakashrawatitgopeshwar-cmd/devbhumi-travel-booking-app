# DevBhoomi Himalayan Horizons — expanded development build

This is an extension of the supplied Next.js 15 / React 19 starter, not a claim that all live services are production-connected.

## Included
- Existing homepage, destination, planner, stays, cabs and experiences pages preserved.
- Trip Report page with editable inputs, estimated fuel/overall budget, Google Maps directions embed/link, print-to-PDF, and share.
- Supplied 13-district location master exposed at `/locations` with search and division filter. The source file contains hubs, tehsils/local areas and attractions, **not a verified all-village gazetteer**; missing coordinates and place-specific photography are explicitly marked unverified.
- Account registration/login/logout using Node `scrypt` password hashes, HMAC-signed HTTP-only cookie sessions, API-based user identity.
- Provider application and admin approval/reject/request-changes flow; pending providers are not publicly listed.
- Booking requests stored with status `requested`, user account history, and admin review dashboard. Requests are never shown as confirmed.
- Mapbox Directions/Geocoding API route handler when a server-side token is set, with Google Maps fallback link.
- Open-Meteo forecast proxy when coordinates are supplied.
- Audit events for key account/provider/booking actions.

## Run locally
1. Install Node.js 20.9+ (Node 22 LTS recommended).
2. Extract the ZIP and open the project folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Set `SESSION_SECRET` to a unique random secret of 32+ characters. Set `MAPBOX_ACCESS_TOKEN` to enable Mapbox routes. Do not expose the server token in client code.
6. Create the initial administrator in PowerShell (use a strong password and keep it private):
   ```powershell
   $env:ADMIN_EMAIL="you@example.com"
   $env:ADMIN_PASSWORD="your-very-strong-password-14-chars-or-more"
   npm run seed:admin
   ```
7. Start `npm run dev` and open `http://localhost:3000`.

## Important implementation/security limits before production
- The current persistence layer is a local JSON file in `data/app-db.json`, appropriate only for a single-process local demo. It is **not suitable for multi-instance/serverless production** and does not provide database transactions, managed backups or concurrency guarantees. Move records to managed PostgreSQL/Supabase and use database migrations before production.
- Email verification, password reset, outbound email/SMS/WhatsApp and provider notifications require a configured delivery provider and are not active.
- Payment capture is deliberately not implemented. Add a compliant payment gateway only after merchant credentials, webhook verification, refund/cancellation policy and business setup are ready.
- The Mapbox handler provides a route when configured; weather is an Open-Meteo forecast, not a road-closure feed. No live road closures, emergency dispatch, hospital availability or real-time stay inventory is claimed.
- The location master supplied with the project has 13 district entries with hub/tehsil/point lists. It does not include village-level lat/lon or image attribution. The locations page marks that gap rather than fabricating verified data. Use official Census/LGD/district sources and review each coordinate/photo attribution before publishing a record as verified.
- Rate limiting, CSRF controls beyond same-site cookie defaults, bot protection, security monitoring, legal/privacy review and production deployment checks must be added before public launch.
- Use HTTPS in production. Configure secure `SESSION_SECRET`; the built-in fallback is development-only.

## API routes
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST /api/provider/apply`
- `GET/PATCH /api/admin/providers` (admin role required)
- `POST/GET /api/bookings` (login required)
- `GET /api/route?from=Delhi&to=Mukteshwar` (Mapbox token optional)
- `GET /api/weather?lat=29.47&lon=79.65`
