# GymSys Frontend

GymSys is a modern gym management dashboard built with React and Vite. It provides a clean interface for managing members, subscriptions, and membership status in a simple and efficient way.

## Features

- Member management with add, edit, view, and delete actions
- Automatic status calculation based on membership expiry date
- Search and filtering by name, email, phone, and status
- Responsive layout for desktop and mobile screens
- Clear success and error notifications
- Empty states and no-results feedback for better UX
- Pagination for large member lists

## Screenshots

You can add project screenshots to the folder below:

- [public/screenshots](public/screenshots)

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- CSS modules and shared global styles

## Installation

1. Clone the repository
2. Navigate to the frontend folder
3. Install dependencies

```bash
npm install
```

## Run locally

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Build for production

```bash
npm run build
```

## Project structure

```bash
src/
  components/
  pages/
    Members/
      components/
  routes/
  index.css
```

## Notes

This frontend is designed to be easy to extend for future features such as payments, renewals, memberships analytics, and authentication.
