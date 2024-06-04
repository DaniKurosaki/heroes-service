# Heroes Service

Application that provides a small REST API to get heroes' information from a MongoDB database and a frontend to interact with it. Both backend and frontend deployed on Vercel, it also has CI/CD thanks to the latter's integration with GitHub.

## Table of Contents

-   [Demo](#demo)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installing](#installing)
    -   [Running](#running)
    -   [Testing](#testing)
-   [Built With](#built-with)

## Demo

You can check the application in action in the following link: https://heroes-service.vercel.app/
And you can also check the API in action in the following link: https://heroes-service-backend.vercel.app/

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB
-   Angular CLI

### Installing

1. Clone the repository
2. Install the dependencies
    - Frontend: Run `npm install` in the `./projects/front` directory.
    - Backend: Run `npm install` in the `./projects/back`

### Running

#### Frontend

1. Run `ng serve` or `npm start` in the `./projects/front` directory.
2. Open `http://localhost:4200/` in your browser

As for this moment, the frontend is in English and Spanish. To change the language, you can run `ng serve --configuration=dev-es` or `npm start-es` in the `./projects/front` directory.

#### Backend

1. Run `npm run start` in the `./projects/back`
2. Open `http://localhost:8080/` in your browser

### Testing

1. Run `npm run test --code-coverage` in the `./projects/front` directory.
2. Check the coverage report in the `./projects/front/coverage` directory.
3. Check the testing results in the browser.

## Built With

-   [Angular](https://angular.io/)
-   [Angular CLI](https://cli.angular.io/)
-   [Angular Material](https://material.angular.io/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-	[Jasmine](https://jasmine.github.io/)
-	[Karma](https://karma-runner.github.io/)
-   [Vercel](https://vercel.com/)
-   [GitHub](https://github.com/)

## Possible future improvements

-   Implement the responsive design
