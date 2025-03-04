import { Listing } from "domain/models/listing.model";
import { IListing } from "domain/interfaces/documents/iListing.interface";
import {
  validListingInput,
  invalidListingInputs,
  invalidCommonInputs,
} from "../testInputs";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Error } from "mongoose";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { commonFailedValidation } from "domain/messages/commonValidation.message";

describe("Listing model unit tests", () => {
  let newListing: IListing;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newListing = new Listing(validListingInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Listing.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newListing.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: Error.ValidationError;
    let validateSyncStub: SinonStub;

    beforeEach(() => {
      sinon.restore();
      newListing = new Listing();
      validationError = new Error.ValidationError();
      validateSyncStub = sinon.stub(Listing.prototype, "validateSync");
    });

    it("title is undefined", () => {
      validationError.errors = {
        title: new Error.ValidatorError({
          message: listingFailedValidation.TITLE_REQUIRED_MESSAGE,
          path: "title",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.title.message,
        listingFailedValidation.TITLE_REQUIRED_MESSAGE
      );
    });

    it("organizationName is undefined", () => {
      validationError.errors = {
        organizationName: new Error.ValidatorError({
          message: commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE,
          path: "organizationName",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.organizationName.message,
        commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE
      );
    });

    it("organizationName is too short", () => {
      validationError.errors = {
        organizationName: new Error.ValidatorError({
          message: commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
          path: "organizationName",
          value: invalidCommonInputs.TOO_SHORT_ORGANIZATION_NAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.organizationName.message,
        commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE
      );
    });

    it("workType is undefined", () => {
      validationError.errors = {
        workType: new Error.ValidatorError({
          message: listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE,
          path: "workType",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.workType.message,
        listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE
      );
    });

    it("workType is invalid", () => {
      validationError.errors = {
        workType: new Error.ValidatorError({
          message: listingFailedValidation.WORK_TYPE_INVALID_MESSAGE,
          path: "workType",
          value: invalidListingInputs.INVALID_WORK_TYPE,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.workType.message,
        listingFailedValidation.WORK_TYPE_INVALID_MESSAGE
      );
    });

    it("employmentType is undefined", () => {
      validationError.errors = {
        employmentType: new Error.ValidatorError({
          message: listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE,
          path: "employmentType",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.employmentType.message,
        listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE
      );
    });

    it("employmentType is invalid", () => {
      validationError.errors = {
        employmentType: new Error.ValidatorError({
          message: listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE,
          path: "employmentType",
          value: invalidListingInputs.INVALID_EMPLOYMENT_TYPE,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.employmentType.message,
        listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE
      );
    });

    it("experienceLevel is undefined", () => {
      validationError.errors = {
        experienceLevel: new Error.ValidatorError({
          message: listingFailedValidation.EXPERIENCE_LEVEL_REQUIRED_MESSAGE,
          path: "experienceLevel",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.experienceLevel.message,
        listingFailedValidation.EXPERIENCE_LEVEL_REQUIRED_MESSAGE
      );
    });

    it("experienceLevel is invalid", () => {
      validationError.errors = {
        experienceLevel: new Error.ValidatorError({
          message: listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE,
          path: "experienceLevel",
          value: invalidListingInputs.INVALID_EXPERIENCE_LEVEL,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.experienceLevel.message,
        listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE
      );
    });

    it("city is undefined", () => {
      validationError.errors = {
        city: new Error.ValidatorError({
          message: listingFailedValidation.CITY_REQUIRED_MESSAGE,
          path: "city",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.city.message,
        listingFailedValidation.CITY_REQUIRED_MESSAGE
      );
    });

    it("country is undefined", () => {
      validationError.errors = {
        country: new Error.ValidatorError({
          message: listingFailedValidation.COUNTRY_REQUIRED_MESSAGE,
          path: "country",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.country.message,
        listingFailedValidation.COUNTRY_REQUIRED_MESSAGE
      );
    });

    invalidCommonInputs.INVALID_COUNTRY_CASES.forEach(
      ([testName, invalidCountry]) => {
        it(testName, () => {
          validationError.errors = {
            country: new Error.ValidatorError({
              message: commonFailedValidation.COUNTRY_INVALID_MESSAGE,
              path: "country",
              value: invalidCountry,
            }),
          };

          validateSyncStub.returns(validationError);
          const mongooseErrors = newListing.validateSync();

          assert.notStrictEqual(mongooseErrors, undefined);
          assert.strictEqual(
            mongooseErrors?.errors.country.message,
            commonFailedValidation.COUNTRY_INVALID_MESSAGE
          );
        });
      }
    );

    it("listingDesc is undefined", () => {
      validationError.errors = {
        listingDesc: new Error.ValidatorError({
          message: listingFailedValidation.LISTING_DESCRIPTION_REQUIRED_MESSAGE,
          path: "listingDesc",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.listingDesc.message,
        listingFailedValidation.LISTING_DESCRIPTION_REQUIRED_MESSAGE
      );
    });

    it("listingDesc is too short", () => {
      validationError.errors = {
        listingDesc: new Error.ValidatorError({
          message:
            listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
          path: "listingDesc",
          value: invalidListingInputs.TOO_SHORT_LISTING_DESCRIPTION,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.listingDesc.message,
        listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("listingDesc is too long", () => {
      validationError.errors = {
        listingDesc: new Error.ValidatorError({
          message:
            listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          path: "listingDesc",
          value: invalidListingInputs.TOO_LONG_LISTING_DESCRIPTION,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.listingDesc.message,
        listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      );
    });

    it("status is undefined", () => {
      validationError.errors = {
        status: new Error.ValidatorError({
          message: listingFailedValidation.STATUS_REQUIRED,
          path: "status",
          value: undefined,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.status.message,
        listingFailedValidation.STATUS_REQUIRED
      );
    });

    it("status is invalid", () => {
      validationError.errors = {
        status: new Error.ValidatorError({
          message: listingFailedValidation.STATUS_INVALID,
          path: "status",
          value: invalidListingInputs.INVALID_STATUS,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newListing.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.status.message,
        listingFailedValidation.STATUS_INVALID
      );
    });
  });
});
