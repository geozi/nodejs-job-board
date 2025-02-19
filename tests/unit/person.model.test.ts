import { Person } from "../../src/domain/models/person.model";
import { IPerson } from "../../src/domain/interfaces/documents/iPerson.interface";
import { validPersonInput, invalidPersonInputs } from "../testInputs";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Error } from "mongoose";
import { personFailedValidation } from "../../src/domain/messages/personValidation.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";

describe("Person model unit tests", () => {
  let newPerson: IPerson;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newPerson = new Person(validPersonInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Person.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newPerson.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: Error.ValidationError;
    let validateSyncStub: SinonStub;

    beforeEach(() => {
      sinon.restore();
      newPerson = new Person();
      validationError = new Error.ValidationError();
      validateSyncStub = sinon.stub(Person.prototype, "validateSync");
    });

    it("firstName is empty", () => {
      validationError.errors = {
        firstName: new Error.ValidatorError({
          message: personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
          path: "firstName",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        personFailedValidation.FIRST_NAME_REQUIRED_MESSAGE
      );
    });

    it("fistName is too short", () => {
      validationError.errors = {
        firstName: new Error.ValidatorError({
          message: personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "firstName",
          value: invalidPersonInputs.TOO_SHORT_FIRST_NAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        personFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("firstName is invalid", () => {
      validationError.errors = {
        firstName: new Error.ValidatorError({
          message: personFailedValidation.FIRST_NAME_INVALID_MESSAGE,
          path: "firstName",
          value: invalidPersonInputs.INVALID_FIRST_NAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        personFailedValidation.FIRST_NAME_INVALID_MESSAGE
      );
    });

    it("lastName is empty", () => {
      validationError.errors = {
        lastName: new Error.ValidatorError({
          message: personFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
          path: "lastName",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        personFailedValidation.LAST_NAME_REQUIRED_MESSAGE
      );
    });

    it("lastName too short", () => {
      validationError.errors = {
        lastName: new Error.ValidatorError({
          message: personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "lastName",
          value: invalidPersonInputs.TOO_SHORT_LAST_NAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        personFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("lastName is invalid", () => {
      validationError.errors = {
        lastName: new Error.ValidatorError({
          message: personFailedValidation.LAST_NAME_INVALID_MESSAGE,
          path: "lastName",
          value: invalidPersonInputs.INVALID_LAST_NAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        personFailedValidation.LAST_NAME_INVALID_MESSAGE
      );
    });

    it("phoneNumber is empty", () => {
      validationError.errors = {
        phoneNumber: new Error.ValidatorError({
          message: personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE,
          path: "phoneNumber",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.phoneNumber.message,
        personFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE
      );
    });

    it("phoneNumber is invalid", () => {
      validationError.errors = {
        phoneNumber: new Error.ValidatorError({
          message: personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE,
          path: "phoneNumber",
          value: invalidPersonInputs.INVALID_PHONE_NUMBER,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.phoneNumber.message,
        personFailedValidation.PHONE_NUMBER_INVALID_MESSAGE
      );
    });

    it("address is empty", () => {
      validationError.errors = {
        address: new Error.ValidatorError({
          message: personFailedValidation.ADDRESS_REQUIRED_MESSAGE,
          path: "address",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.address.message,
        personFailedValidation.ADDRESS_REQUIRED_MESSAGE
      );
    });

    it("address is too short", () => {
      validationError.errors = {
        address: new Error.ValidatorError({
          message: personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
          path: "address",
          value: invalidPersonInputs.TOO_SHORT_ADDRESS,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.address.message,
        personFailedValidation.ADDRESS_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("education is undefined", () => {
      validationError.errors = {
        education: new Error.ValidatorError({
          message: personFailedValidation.EDUCATION_REQUIRED,
          path: "education",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.education.message,
        personFailedValidation.EDUCATION_REQUIRED
      );
    });

    it("workExperience is undefined", () => {
      validationError.errors = {
        workExperience: new Error.ValidatorError({
          message: personFailedValidation.WORK_EXPERIENCE_REQUIRED,
          path: "workExperience",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.workExperience.message,
        personFailedValidation.WORK_EXPERIENCE_REQUIRED
      );
    });

    it("username is empty", () => {
      validationError.errors = {
        username: new Error.ValidatorError({
          message: userFailedValidation.USERNAME_REQUIRED_MESSAGE,
          path: "username",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newPerson.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_REQUIRED_MESSAGE
      );
    });
  });
});
