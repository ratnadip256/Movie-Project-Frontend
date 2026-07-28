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

## 🛠️ Troubleshooting

### Network error: Cannot reach the server (CORS Error)
**Issue:** After deploying the frontend and trying to log in/register, you receive an error: `"Network error: Cannot reach the server. Are you on the right port?"`
**Cause:** This happens when the Backend blocks the request due to Cross-Origin Resource Sharing (CORS) rules. The backend does not yet recognize your new Frontend Vercel URL.
**Solution:**
1. Copy your deployed Frontend Vercel URL (ensure there is no trailing `/`).
2. Go to your Backend project in the Vercel Dashboard.
3. Under **Settings -> Environment Variables**, find `CORS_ORIGIN`.
4. Update `CORS_ORIGIN` with your new Frontend URL.
5. **CRITICAL:** Go to the **Deployments** tab on the Backend and **Redeploy** the backend so the new environment variable takes effect.

### [July 28, 2026] - Frontend Image Size Validation
**What was changed:**
- **Modified `src/Pages/Auth/Register.jsx`:** Added a validation check to the avatar file input using `react-hook-form`. It now prevents users from selecting an image larger than 4MB, showing a helpful UI error ("Image size is too big. Maximum allowed size is 4MB."). This prevents the Vercel 4.5MB serverless payload limit from being hit, which previously resulted in a confusing fake CORS "Network Error".
- **Updated Error Message:** The generic "Network Error" catch block in the register function was updated to mention Vercel's 4.5MB limit, providing better feedback if it happens in the future.

---

*(Future updates will be added below this line)*
