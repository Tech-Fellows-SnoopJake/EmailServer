# EMAILAPP FRONTEND

This repo hosts the frontend for the Email app. 

The tech stack for this repo is React + Typescript + Tailwind + Vite.

---

## Setup Instructions

1. Make sure to install `nodejs`

```bash
sudo apt update
sudo apt install nodejs
```

2.Install the `npm` package manager

```bash
sudo apt install npm
```

3. Install the project dependencies with `npm install`

```bash
npm install
```

Remember that the dependencies are listed at the `package.json`

## Instructions to run development server

To run the `Vite` live development server, please run the dev script with:

```bash
npm run dev
```

## G0 Feature change:

- Adding const to easy change of IP. We had problems with the use of environment vars, so is discarded for now.
- Button of logout works.
- Login with password works and implemented
- Front-end route protection, to restrict users from navigating without being logged in.
- Implemented register feature in front. 
### TODO
- Update code with a unique standard of retrieve data (fetch or axios) and review best practices for writing code and organizing files and folders.
- Improve de UI/UX and apply responsive practices. 


