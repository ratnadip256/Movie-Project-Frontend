# Vercel Deployment Guide & Notes

This guide contains everything you need to know to successfully deploy your Frontend on Vercel and ensure it communicates correctly with your already deployed backend.

## 1. What's Already Set Up
I have reviewed your frontend and backend configuration. The following setup has already been handled for you:
- **`vercel.json` added:** A `vercel.json` file was added to the Frontend folder. This tells Vercel that your app is a Single Page Application (SPA). Without it, if a user refreshes the page on a route like `/profile` or `/login`, Vercel would return a "404 Not Found" error. Now, it will correctly route everything back to `index.html`.
- **Dynamic Backend URL:** The `axios.js` file is correctly configured to use `import.meta.env.VITE_API_BASE_URL`. This allows you to set the backend URL via Vercel's environment variables without hardcoding it.

## 2. Steps to Deploy the Frontend on Vercel
1. Push your latest `Frontend` code (including the new `vercel.json` file) to your GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Important**: Since your frontend is in a subfolder, edit the **"Root Directory"** during Vercel setup and select the `Frontend` folder.
5. Vercel will automatically detect that you are using **Vite**. The default Build Command (`vite build`) and Output Directory (`dist`) are correct. Do not change them.

## 3. Environment Variables (Required for Frontend)
Before clicking "Deploy" on Vercel, expand the **Environment Variables** section and add the following keys exactly as they are in your local `.env` file:

- **`VITE_API_BASE_URL`**
  - **Value**: `https://movie-project-backend-beige.vercel.app/api/v1/users`
- **`VITE_TMDB_ACCESS_TOKEN`**
  - **Value**: *(Copy the token from your local `.env` file)*

Once these are added, click **Deploy**.

## 4. 🚨 CRITICAL: The Final Step (Fixing CORS)
Because your frontend and backend are on different domains, the browser will block requests due to **CORS (Cross-Origin Resource Sharing)** unless the backend explicitly allows your new frontend URL.

After your frontend is successfully deployed on Vercel, you will receive a public URL (e.g., `https://your-frontend-app.vercel.app`). **You must complete this step for the login/auth to work:**

1. Copy your new Frontend URL from Vercel (make sure there is no trailing slash `/` at the end).
2. Go to your **Backend Project** in Vercel.
3. Navigate to **Settings** -> **Environment Variables**.
4. Find the variable named **`CORS_ORIGIN`**.
5. Update its value to your **new Frontend URL**.
6. **Redeploy your backend** so it picks up the new environment variable. Go to the "Deployments" tab on your backend, click the three dots on the latest deployment, and click **Redeploy**.

If you skip this step, you will see "Network Error" or "CORS Error" in the browser console when trying to log in or register.

## 5. Summary Checklist
- [x] `vercel.json` is ready.
- [ ] Push code to GitHub.
- [ ] Import to Vercel, set Root Directory to `Frontend`.
- [ ] Add `VITE_API_BASE_URL` and `VITE_TMDB_ACCESS_TOKEN` in Vercel.
- [ ] Deploy frontend and copy the generated URL.
- [ ] Update `CORS_ORIGIN` in the backend's Vercel settings with the new frontend URL.
- [ ] Redeploy the backend.
