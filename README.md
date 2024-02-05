# Image Editor :framed_picture:

Image Editor is a web application that offers an interface for browsing through a collection of images from [Picsum](https://picsum.photos/), providing features for image editing and downloading.

## Features :joystick:

-   **Image Gallery**: Browse through a list of images in a gallery format.
-   **Image Editor**: Edit the selected image by applying various effects.
-   **Image Download**: Download images.
-   **Responsive Design**: The UI is fully responsive and works well on both desktop and mobile devices.

## Tech stack :computer:

-   [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
-   [Material UI](https://mui.com/) Component Library
-   [Emotion](https://emotion.sh/docs/styled) Styled Components
-   [Vitest](https://vitest.dev/) for unit testing
-   [Cypress](https://www.cypress.io/) for E2E testing
-   [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for code style

## Prerequisites :page_facing_up:

Check the `engines` property in [package.json](package.json) for the suggested Node.js and npm versions.

## Installation :hammer_and_wrench:

To get started with the project install the dependencies:

```
npm install
```

After installing the dependencies, you can start the development server by running:

```
npm start
```

The application should be available at http://localhost:5173
Alternatively check the terminal output to see the url of the app.

## Testing :hammer:

This project uses Vitest for unit testing. Run the following command to execute the tests:

```
npm test
```

This project uses Cypress for E2E testing. Run the following command to execute the tests:

```
npm run cypress:open
```

## Building :building_construction:

Run the next command to build the app:

```
npm run build
```

By default, the build output will be placed in the `dist` folder.

### Testing the build locally

Once you've built the app, you can test it locally by running:

```
npm run preview
```

The Vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173.
