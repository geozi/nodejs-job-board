# nodejs-job-board

![nodejs badge](https://img.shields.io/badge/demo_app-blue)

## About the project

Contains the backend implementation of a Job Board API. It exposes the following REST endpoints, according to **User** and **Admin** privileges:

- **Admin**:
  - Listing creation,
  - Listing update,
  - User retrieval by role.
- **User**:
  - Application creation,
  - Application removal by ID,
  - Application retrieval by listing ID,
  - Application retrieval by person ID,
  - Application retrieval by unique index,
  - Listing retrieval by employment type,
  - Listing retrieval by experience level,
  - Listing retrieval by ID,
  - Listing retrieval by status,
  - Listing retrieval by work type,
  - Person info creation,
  - Person info retrieval by username,
  - Person info update,
  - User retrieval,
  - User update.

The following endpoints are open to all, irrespective of their role:

- User registration,
- User login.

## Testing

A thorough presentation of the tests conducted during development can be found in the [QA-test-plan](/QA-test-plan.md).

## Prerequisites

- Nodejs (v22.13.1)[^1],
- MongoDB.

## Security

- **Authentication**: Single factor, local authentication.
- **Authorization**: JSON Web Token (JWT).

## Differences with previous Typescript projects

Compared to the [Task Manager API](https://github.com/geozi/nodejs-typescript-task-manager) and [Contact Manager API](https://github.com/geozi/nodejs-typescript-contact-manager) projects, the Job Board API project uses:

- **tsx** instead of **ts-node**,

- nested fields, as in the [Person](src/domain/models/person.model.ts) and [Listing](src/domain//models//listing.model.ts) model schemas,

- secondary interfaces in the domain layer for better type checking.

- custom mappers to reduce complexity in the controllers of the business layer.

- regular, instead of anonymous, functions inside the controller middleware arrays to achieve more dynamic logging messages.

- the [Error.ValidationError](https://mongoosejs.com/docs/api/error.html#Error.ValidationError) class, instead of the custom UniqueConstraintError class, for wider error catch.

- the [.bail()](https://express-validator.github.io/docs/api/validation-chain#bail)
  method in validation chains, minimizing the number of errors sent back to the client as well as the number of checks performed by the validation chain elements.

- [Passport.js](https://www.passportjs.org/) for token extraction and authentication.

##

[^1]: According to the [Release Schedule](https://nodejs.org/en/about/previous-releases), Node.js v22 will enter its maintenance phase in the last quarter of 2025. During that period, it is recommended that the project should migrate to the latest active LTS version.

<p align="center">
        <a href="https://github.com/LelouchFR/skill-icons">
        <img src="https://go-skill-icons.vercel.app/api/icons?i=vscode,nodejs,typescript,mocha,mongoose,mongo"/>
      </a>
</p>
