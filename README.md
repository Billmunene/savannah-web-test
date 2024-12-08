
# Application Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Routing](#routing)
9. [Testing](#testing)
10. [Contributing](#contributing)
11. [License](#license)

---

## Overview

This is a React-based web application that offers users a platform to interact with various albums and photos. The app allows users to log in using Google authentication, view and manage albums, and browse photos. The app implements dark/light mode switching, and page persistence via URL routes, allowing users to reload their current page and stay on the same route.

---

## Technologies Used

- **Frontend**:
  - React.js (for building the user interface)
  - React Router (for routing and navigation)
  - Firebase (for authentication)
  - Tailwind CSS (for styling)
  - Jest, React Testing Library (for unit testing)

- **Backend**:
  - Node.js and Express (for providing RESTful API endpoints)
  - Firebase (for handling authentication and user management)
  
---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application locally:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

4. To run the tests:

   ```bash
   npm test
   ```

---

## Features

- **User Authentication**:
  - Users can log in via Google using Firebase Authentication.
  - Users can log out and the app will update accordingly.
  
- **Albums & Photos**:
  - Users can view and browse albums.
  - Each album contains multiple photos, and each photo has a title and an image URL.

- **Routing**:
  - The app uses React Router to handle navigation between pages such as the Landing Page, Login Page, Dashboard, User Profile, Album Details, and Photo Details.
  - Pages persist across reloads, meaning if a user is on a page (e.g., `/photo/1554`), refreshing the page will keep them on the same page.

- **Dark/Light Mode**:
  - Users can toggle between dark and light modes.
  - The app will remember the mode even after page reloads using CSS class toggling.

- **Responsive Design**:
  - The app is fully responsive, with a mobile-first design and an adaptive layout.

---

## Folder Structure

```plaintext
/ 
|-- /src
    |-- /components
        |-- Landing.js
        |-- Login.js
        |-- Home.js
        |-- User.js
        |-- Album.js
        |-- Photo.js
    |-- /firebase
        |-- index.js (Firebase config and initialization)
    |-- App.js (Main application file with routing)
    |-- index.js (Entry point of the app)
    |-- /assets
        |-- logo.svg
    |-- /styles
        |-- tailwind.css
    |-- App.test.js (Unit tests)
    |-- /hooks
        |-- useProjects.js
    |-- /api
        |-- api.js (RESTful API handling)
```

---

## API Endpoints

### `/api/users`
- **GET**: Retrieve all users.
- **POST**: Create a new user with `name`, `username`, and `email`.

### `/api/albums`
- **GET**: Retrieve all albums.
- **POST**: Create a new album with `albumId`, `userId`, and `title`.

### `/api/photos`
- **GET**: Retrieve all photos of an album.
- **POST**: Create a new photo with `albumId`, `title`, and `imageUrl`.

---

## Authentication

- The app uses Firebase Authentication for managing user sign-in.
- Users can sign in using their Google account, and their state will persist using `localStorage`.
- If a user is already logged in, they will be automatically authenticated and redirected to the home/dashboard page.

### Firebase Configuration

The Firebase configuration is handled in `src/firebase/index.js`, where Firebase is initialized with the credentials from your Firebase project.

---

## Routing

- The app uses `react-router-dom` for routing between the pages.
- The available routes are:
  - `/` - Landing Page
  - `/login` - Login Page
  - `/home` - Home/Dashboard Page (only accessible after login)
  - `/user/:id` - User Profile Page
  - `/album/:id` - Album Details Page
  - `/photo/:id` - Photo Details Page
- The app uses `Navigate` from `react-router-dom` to redirect users to the login page if they aren't authenticated.

---

## Testing

The app uses **Jest** and **React Testing Library** for unit testing. 

### Test Files

- **App.test.js**: Tests for the main application logic and rendering.
- **Login.test.js**: Tests for the login functionality.
- **Home.test.js**: Tests for the Home page components and layout.

### Running Tests

Run the tests by executing the following command:

```bash
npm test
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
