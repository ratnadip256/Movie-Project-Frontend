# Scenix - Frontend Documentation

## 🌟 Purpose of the Website
**Scenix** is a modern, dynamic web application designed for movie and TV show enthusiasts. Its main purpose is to allow users to explore trending movies, web series, top-rated content, and popular actors. Users can create secure accounts, verify their identities via email OTPs, and browse a vast library of entertainment data with a sleek, premium, dark-themed user interface.

## 🛠️ Technology Stack
- **React.js (Vite)**: The core framework for building the user interface. It ensures fast performance and modular components.
- **Tailwind CSS**: Used for all styling. It provides utility classes to easily create a responsive, dark, and beautiful UI without writing custom CSS files.
- **Redux Toolkit**: Manages the "global state" of the application, primarily keeping track of whether a user is logged in or out across all pages.
- **React Router DOM**: Handles page navigation (e.g., moving from Home to Login, or viewing a specific movie's details).
- **Axios**: The HTTP client used to send requests (like login, signup, fetch movies) to the backend API.
- **Framer Motion**: Adds smooth, professional animations to buttons, page transitions, and loading states.
- **React Hook Form**: Manages complex forms (like Login, Register, Forgot Password) and handles validation (e.g., checking if passwords match or an email is valid).

## 🔌 How the Frontend Connects to the Backend
Connecting the Frontend to the Backend is mostly handled inside the `src/Utils/axios.js` file.

1. **The Axios Instance**: 
   We created a custom setup for Axios. It points to the backend's base URL (`http://localhost:8000/api/v1/users`).
   
2. **Credentials (Cookies)**: 
   We added `withCredentials: true` to our Axios setup. This is a very important line. It tells the browser, "Every time you send a request to the backend, make sure you attach the secure cookies (like the Access Token) automatically."

3. **The Interceptor (Auto-Refresh Magic)**: 
   Security tokens expire quickly (usually in a few minutes) to keep accounts safe. Instead of forcing the user to log in every 15 minutes, we wrote an **Axios Interceptor**. 
   - If a request fails because the Access Token is expired (Error 401), the interceptor stops the error.
   - It silently makes a request to the backend's `/refresh-token` endpoint.
   - The backend checks the user's long-lasting Refresh Token cookie, creates a new Access Token, and gives it back to the browser.
   - The interceptor then automatically retries the user's original request. The user never even notices their token expired!

## 📂 Important Code References for the Future
If you return to this code in the future, here are the most important areas to remember:

- **`src/Utils/axios.js`**: Controls how your app talks to your server. If you deploy your app to the internet (like Vercel or Netlify), you will need to update the `BASE_URL` here to point to your live backend domain.
- **`src/Redux/Features/authSlice.js`**: This is where your user state lives. It contains the "thunks" (async functions) that call the backend API to login, register, and logout users. It updates the UI based on whether those requests succeed or fail.
- **`src/Pages/Auth/...`**: All of your authentication pages (Login, Register, OTP Verification, etc.) live here. They use `react-hook-form` for data collection and `lucide-react` for the small icons inside the input fields.
- **`src/Loader/Loader.jsx` & `src/Components/Loader2/Loader2.jsx`**: These are the sleek, spinning circle animations that show up when the app is fetching data from an API or waiting for an authentication response.



