# nodejs-job-board

![Demo App](https://img.shields.io/badge/demo_app-blue)

## About the project

Contains the backend implementation of a Job Board API.

## Differences with previous Typescript projects

Compared to the [Task Manager API](https://github.com/geozi/nodejs-typescript-task-manager) and [Contact Manager API](https://github.com/geozi/nodejs-typescript-contact-manager) projects, the Job Board API project uses:

- **tsx** instead of **ts-node**,

- nested fields, as in the [Person](src/domain/models/person.model.ts) and [Listing](src/domain//models//listing.model.ts) model schemas,

- secondary interfaces in the domain layer for better type checking.

- custom mappers to reduce complexity in the controllers of the business layer.

- regular, instead of anonymous, functions inside the controller middleware arrays to achieve more dynamic logging messages.

- the Error.ValidationError class, instead of the custom UniqueConstraintError class, for wider error catch.

- the `.bail()`[^1] method in validation chains, minimizing the number of errors sent back to the client as well as the number of checks performed by the validation chain elements.

##

<p align="center">
        <a href="https://github.com/LelouchFR/skill-icons">
        <img src="https://go-skill-icons.vercel.app/api/icons?i=vscode,nodejs,typescript,mocha,mongoose"/>
      </a>
</p>

[^1]: Documentation for `.bail()` can be found it: [https://express-validator.github.io/docs/api/validation-chain#bail](https://express-validator.github.io/docs/api/validation-chain#bail)
