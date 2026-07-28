# Movie Project Frontend - Changelog & Documentation

This file serves as a living record of all changes, updates, and features added to the frontend of the Movie Project. 

> [!IMPORTANT]
> **To Future Self / AI Assistant:** 
> Whenever any code is updated, a new feature is added, or a bug is fixed on the frontend, **this README file must be updated** with the date and description of those changes to keep a clear history of the project's evolution.

---

## 📝 Changelog

### [July 28, 2026] - Vercel Deployment Preparation
**What was changed:**
- **Added `vercel.json`:** Created a configuration file specifically for Vercel deployment. This file adds rewrite rules `source: "/(.*)", destination: "/index.html"` to ensure that React Router (which handles client-side SPA routing) works correctly on Vercel without throwing 404 errors when the browser is refreshed.
- **Created `DEPLOYMENT_NOTES.md`:** Added a comprehensive step-by-step guide inside the `Frontend` directory explaining how to configure Vercel, set up necessary environment variables (`VITE_API_BASE_URL` and `VITE_TMDB_ACCESS_TOKEN`), and handle the critical `CORS_ORIGIN` configuration on the backend after the frontend is deployed.
- **Verified Environment Variables:** Confirmed that `src/Utils/axios.js` properly utilizes `import.meta.env.VITE_API_BASE_URL`, allowing for dynamic backend connections when deployed to production.

---

*(Future updates will be added below this line)*
