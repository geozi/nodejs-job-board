# nodejs-job-board

![Demo App](https://img.shields.io/badge/demo_app-blue)

## About the project

Contains the backend implementation of a Job Board API.

## Differences with previous Typescript projects

Compared to the [Task Manager API](https://github.com/geozi/nodejs-typescript-task-manager) and [Contact Manager API](https://github.com/geozi/nodejs-typescript-contact-manager) projects, the Job Board API project uses:

- **tsx** instead of **ts-node**,

- nested sub-documents, as in the [Person](src/domain/models/person.model.ts) and [Listing](src/domain//models//listing.model.ts) model schemas,

- secondary interfaces for better type checking.
