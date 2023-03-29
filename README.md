# Angular IMB Product Tracker Frontend

This project is an Angular frontend application for the IMB Product Tracker System, which allows users to manage products and developers in a product management system. It supports CRUD operations and search functionality for products by Scrum Master and developer names. The frontend communicates with a Spring Boot backend RESTful API to perform these operations.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- [Angular CLI](https://cli.angular.io/)

## Running the Application

To run the application, follow these steps:

1. Open a terminal and navigate to the project's root directory (the same level where `package.json` is located).

2. Install the project dependencies by running:
   
    ```
    npm install
    ```
3. Start the development server by running:

  For Unix-based systems:
    ```
    ng serve
    ```
  For Windows:  
    ```
    ng.cmd serve
    ```
The application will automatically reload if you change any of the source files.

4. Navigate to `http://localhost:4200/` in your web browser to access the application.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
