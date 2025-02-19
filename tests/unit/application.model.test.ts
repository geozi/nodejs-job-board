import { Application } from "../../src/domain/models/application.model";
import { IApplication } from "../../src/domain/interfaces/documents/iApplication.interface";
import { validApplicationInput, invalidObjectIdInputs } from "../testInputs";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Error } from "mongoose";
import { personFailedValidation } from "../../src/domain/messages/personValidation.message";
import { listingFailedValidation } from "../../src/domain/messages/listingValidation.message";

describe("Application model unit tests", () => {
  let newApplication: IApplication;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newApplication = new Application(validApplicationInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Application.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newApplication.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: Error.ValidationError;
    let validateSyncStub: SinonStub;

    beforeEach(() => {
      sinon.restore();
      newApplication = new Application();
      validationError = new Error.ValidationError();
      validateSyncStub = sinon.stub(Application.prototype, "validateSync");
    });

    it("personId is undefined", () => {
      validationError.errors = {
        personId: new Error.ValidatorError({
          message: personFailedValidation.PERSON_ID_REQUIRED_MESSAGE,
          path: "personId",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newApplication.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.personId.message,
        personFailedValidation.PERSON_ID_REQUIRED_MESSAGE
      );
    });

    invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
      ([testName, invalidId]) => {
        it(testName, () => {
          validationError.errors = {
            personId: new Error.ValidatorError({
              message: personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE,
              path: "personId",
              value: invalidId,
            }),
          };

          validateSyncStub.returns(validationError);
          const mongooseErrors = newApplication.validateSync();

          assert.notStrictEqual(mongooseErrors, undefined);
          assert.strictEqual(
            mongooseErrors?.errors.personId.message,
            personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE
          );
        });
      }
    );

    invalidObjectIdInputs.OBJECT_ID_INVALID_CASES.forEach(
      ([testName, invalidId]) => {
        it(testName, () => {
          validationError.errors = {
            personId: new Error.ValidatorError({
              message: personFailedValidation.PERSON_ID_INVALID_MESSAGE,
              path: "personId",
              value: invalidId,
            }),
          };

          validateSyncStub.returns(validationError);
          const mongooseErrors = newApplication.validateSync();

          assert.notStrictEqual(mongooseErrors, undefined);
          assert.strictEqual(
            mongooseErrors?.errors.personId.message,
            personFailedValidation.PERSON_ID_INVALID_MESSAGE
          );
        });
      }
    );

    it("listingId is undefined", () => {
      validationError.errors = {
        listingId: new Error.ValidatorError({
          message: listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE,
          path: "listingId",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newApplication.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.listingId.message,
        listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE
      );
    });
  });
});
