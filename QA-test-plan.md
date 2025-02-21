# Job Board API test plan

Document version 1.0.0

## Introduction

The Job Board API test plan contains information on tests that run during the development phase of the project.

## In Scope

The project's tests are unit and integration tests. Completed tests are noted with ✔ and any pending ones with ⌛.

## Unit tests

Unit tests are conducted per layer and can be further divided into **validation-oriented** and **promise-oriented**.

### Validation-oriented

#### Domain layer

Domain layer unit test suites:

- User model [✔],
- Person model [✔],
- Listing model [✔],
- Application model [✔]

```text
└── tests
    └── unit
        ├── application.model.test.ts
        ├── listing.model.test.ts
        ├── person.model.test.ts
        └── user.model.test.ts
```

The domain layer unit tests contain simulated scenarios, in which a stub of `validateSync()`[^1] returns specific validation errors.

## Out of scope

The Job Board API is a backend project, therefore any tests involving the frontend are excluded.

## Assumptions

The current implementation is for demonstration purposes and might be subject to changes due to maintenance.

## Environment + Tools

- Mongoose,
- Mocha,
- Sinon.

[^1]: Documentation for `validateSync()` can be found in: [https://mongoosejs.com/docs/api/document.html](https://mongoosejs.com/docs/api/document.html)
