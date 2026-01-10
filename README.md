todo

add admin auth middleware in get applicant route,
add form validation
active/inactive jobs is not working 
carrer page if no job opening -> msg currently no vaccency
need upgrade design -> job form
bug->nav bar hover 



1) Summary (quick)
Frontend (Next.js): Deploy to Vercel. Set NEXT_PUBLIC_API_URL to your backend public URL.
Backend (Express/Mongo): Deploy to Render or Railway. Use npm run start:prod as the start command and set required env variables (listed below).
CORS: Backend uses FRONTEND_URL (comma-separated list or *) — set it to your frontend origin(s).
2) Backend — env vars (required)
Set these in Render/Railway dashboard (do not commit to Git):

MONGO_URL=https://... (MongoDB Atlas URI or managed DB URI)
PORT=5000 (or platform-assigned)
JWT_SECRET=<strong-random-string>
CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
SMTP_USER, SMTP_PASS (for contact emails)
ADMIN_MAIL (recipient for contact emails)
ADMIN_EMAIL, ADMIN_PASSWORD (optional — used by seed:admin)
FRONTEND_URL=https://your-frontend.example (or comma-separated list)
NODE_ENV=production
Notes:

Use secure secrets manager provided by host.
Avoid FRONTEND_URL=* in production (security risk).
Start command on Render/Railway:

Start command: npm run start:prod
Build step not required for backend (unless you add build scripts).
Seed admin (one-time after DB is ready):

cd backend && npm run seed:admin
3) Frontend (Vercel) — env vars & settings
Set these in Vercel project settings → Environment Variables:

NEXT_PUBLIC_API_URL=https://your-backend.example (public HTTPS URL)
Optional: other NEXT_PUBLIC_... flags
Vercel settings:

Framework Preset: Next.js
Build Command: npm run build (default)
Output Directory: (handled by Next)
After deploy:

Ensure NEXT_PUBLIC_API_URL matches the backend base URL (HTTPS).
Verify the Vercel deployment URL is set in FRONTEND_URL on backend.
4) CORS & security ✅
Backend CORS uses FRONTEND_URL. Example values:
Single: FRONTEND_URL=https://app.yourdomain.com
Multiple: FRONTEND_URL=https://app.yourdomain.com,https://staging.yourdomain.com
TLS: Ensure frontend and backend are served over HTTPS.
Secrets: Use platform secret storage (Render Environment / Vercel Environment Variables).
5) Smoke tests after deployment 🧪
Run these to verify everything:

Check public jobs listing:
curl https://your-backend.example/api/jobs
Check job detail:
curl https://your-backend.example/api/jobs/<jobId>
Check frontend points to backend:
Visit https://your-frontend.example and confirm listings show up
Seed admin if needed:
ssh or use platform console to run: cd backend && npm run seed:admin
Optional auth check (once admin created):
POST /api/auth/login with admin credentials (test via UI)
6) Optional improvements (recommended) 🔧
Add health check route /api/health and a probe in your host for restarts.
Add Dockerfile (if you prefer container deploy).
Add GitHub Actions to auto-deploy on push (Vercel auto-deploys from the repo; for backend add CI to deploy to Render/Railway).
Monitor logs and set alerts (Render/Railway provide logs).
7) Quick checklist before you click deploy ✅
 Create production MongoDB and update MONGO_URL.
 Add strong JWT_SECRET.
 Add Cloudinary & SMTP credentials.
 Set FRONTEND_URL to the frontend deployment URL.
 Set NEXT_PUBLIC_API_URL in Vercel to the backend URL.
 Run npm run seed:admin once DB is available (to create admin account).
 Test /api/jobs and login flows.