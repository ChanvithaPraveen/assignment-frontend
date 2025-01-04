# User Management System Frontend

A modern, responsive user management web application built with **React**, **Redux**, and **Material UI**. This project allows users to manage their accounts, create, update, and delete users, with seamless state management and UI interactions.

## Demo

Check out the live demo of the project hosted on Vercel:

[![User Management System Demo](https://vercel.com/button)](https://assignment-frontend-beta.vercel.app/register)

You can explore the features and functionality directly from the live site.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts as admin credentials.
username: haulmatic, password: 123456
- **User Management**: Admin users can create, update, and delete users.
- **Responsive UI**: Fully responsive, optimized for mobile, tablet, and desktop devices.
- **Toast Notifications**: Notifications for success, errors, and form validation feedback.
- **Framer Motion Animations**: Smooth animations for page transitions and UI interactions.

## Tech Stack

- **Frontend**: React, Material UI
- **State Management**: Redux, Redux Thunk
- **Form Handling**: Formik, Yup for validation
- **Routing**: React Router DOM
- **Styling**: Material UI, Emotion, Styled Components
- **Toast Notifications**: React Toastify
- **Animations**: Framer Motion
- **Linting**: ESLint

## Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (Package Manager)

### 1. Clone the Repository

Clone this repository to your local machine using Git.

```bash
git clone https://github.com/ChanvithaPraveen/assignment-frontend.git
cd assignment-frontend
```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

This will install all the necessary packages listed in `package.json`.

### 3. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

This will launch the project in development mode, typically accessible at `http://localhost:5173`.

### 4. Build for Production

To build the project for production, use the following command:

```bash
npm run build
```

This will create an optimized build of your app in the `build/` folder.


## Scripts

- `npm start` – Starts the development server.
- `npm run build` – Builds the project for production.
- `npm run preview` – Previews the production build.
- `npm run lint` – Runs ESLint to check for code quality issues.

## Dependencies

- **@emotion/react & @emotion/styled**: Styling libraries.
- **@mui/material & @mui/icons-material**: Material UI components and icons.
- **formik**: For managing forms.
- **framer-motion**: For animations and transitions.
- **prop-types**: For runtime type checking of props.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods.
- **react-redux**: Official React bindings for Redux.
- **react-router-dom**: For handling routing and navigation.
- **react-toastify**: For displaying toast notifications.
- **redux**: State management library.
- **redux-thunk**: Middleware for Redux to handle async actions.
- **yup**: Schema validation for Formik.

## Development

### Linting

The project uses ESLint for linting. To run the linter, use:

```bash
npm run lint
```

## Admin User Credentials

If your application requires login functionality, the default user credentials for testing are:

- **Email**: `haulmatic`
- **Password**: `123456`

Feel free to modify or create new users in the system for testing purposes.

## Troubleshooting

If you encounter issues, here are a few things to check:

- **Missing Dependencies**: Run `npm install` to make sure all dependencies are installed.
- **Server Not Running**: Ensure the backend server (if necessary) is running and the API endpoints are correctly set in `.env`.
- **Development Build Issues**: Restart the development server using `npm run dev` if changes are not reflected.
