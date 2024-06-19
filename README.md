# Restful Correction

A monorepo containing backend/frontend correction to the 2024 Restful Practical National Examination.

## Question?

Make a library management system with these features:

- Add a book (By using either DBMS, Postman, Swagger) - no frontend needed
- Authentication for users
  - Sign up:
    - firstName, lastName, email, password
  - Sign in:
    - email, password
- List books in a paginated table with search functionality

## Backend's structure

Project's backend uses Node.js/Express with structure of modules as in nestjs, where each feature (user management, books management) has it's folder with it's routers, controllers, validations, models and repository.

- common : this folder contains utilities that can be used by all of our modules.
- middleware : contains application's middlwares
- utils : contains application's utility functions
- db : contains our app's datasourc provider since we're using typeorm
