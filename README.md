# React Personal Portfolio - Assignment 2

## How to Run This Project
1. Download or clone this project folder.
2. Open your terminal and navigate inside the project folder.
3. Run `npm install` to download all the necessary dependencies.
4. Run `npm run dev` to start the local development server.
5. Open the local link provided in your terminal (usually `http://localhost:5173`) in your web browser.

## Component Structure & State-Lifting Decisions
I broke the UI down into reusable components to keep the code clean. The main layout is handled in `App.jsx`, where I kept the `<Navbar>` and `<Footer>` outside the `<Routes>` so they stay visible when clicking between pages.

* **Lifting State (Theme):** I lifted the dark/light mode `theme` state to the very top in `App.jsx`. This allowed me to apply the theme globally to the body tag, while passing the actual toggle function down to the `<Navbar>` as a prop so the button works.
* **Prop Drilling:** I demonstrated prop drilling on the Projects page. The `Projects.jsx` page imports the raw data array (Level 1). It passes this array down to `ProjectList.jsx` (Level 2), which then maps through the array and passes the individual project objects down to the `ProjectCard.jsx` component (Level 3) to render the actual HTML.
* **Independent State:** Every `ProjectCard` has its own `useState` for the "View Details" toggle. This ensures that clicking one card only expands that specific card, not all of them. The `Contact` form also uses its own state to handle controlled inputs and track validation errors.

## useEffect Hooks Implemented
I used two meaningful `useEffect` hooks in this project:
1. **Saving the Theme (`App.jsx`):** This hook runs every time the `theme` state changes. It saves the user's current choice to `localStorage` and applies the CSS class. This is necessary so that if a user refreshes the page, the site remembers if they were in dark mode.
2. **Loading Screen (`Home.jsx`):** I used a hook with an empty dependency array `[]` so it only runs once when the Home component mounts. It uses a `setTimeout` to show a "Loading..." message for 1 second before revealing the intro text. I also included a cleanup function (`clearTimeout`) to prevent memory leaks in case the user navigates to another page before the timer finishes.

## Academic Integrity Disclosure
In accordance with the assignment guidelines, I am disclosing that I used an AI tool to help debug a small code snippet in my `Contact.jsx` file. I was originally getting an ESLint error about synchronous state updates because of how I was doing form validation inside a `useEffect`. The AI helped me fix the warning by showing me how to move the validation logic directly into the `handleChange` function instead.