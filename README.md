# Restful Starter

A monorepo containing backend/frontend starters for a restful project.

## Question?

## Backend's structure

Our project's backend uses Node.js/Express with structure of modules as in nestjs, where each feature (user management, books management) has it's folder with it's routers, controllers, validations, models and repository.

- common : this folder contains utilities that can be used by all of our modules.
- middleware : contains application's middlwares
- utils : contains application's utility functions
- db : contains our app's datasourc provider since we're using typeorm
