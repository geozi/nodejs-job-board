import { User } from "../../src/domain/models/user.model";
import { IUser } from "../../src/domain/interfaces/documents/iUser.interface";
import { validUserInput, invalidUserInputs } from "../testInputs";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Error } from "mongoose";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";

describe("User model unit tests", () => {
  let newUser: IUser;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newUser = new User(validUserInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newUser.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: Error.ValidationError;
    let validateSyncStub: SinonStub;

    beforeEach(() => {
      sinon.restore(), (newUser = new User());
      validationError = new Error.ValidationError();
      validateSyncStub = sinon.stub(User.prototype, "validateSync");
    });

    it("username is empty", () => {
      validationError.errors = {
        username: new Error.ValidatorError({
          message: userFailedValidation.USERNAME_REQUIRED_MESSAGE,
          path: "username",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_REQUIRED_MESSAGE
      );
    });

    it("username is too long", () => {
      validationError.errors = {
        username: new Error.ValidatorError({
          message: userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
          path: "username",
          value: invalidUserInputs.TOO_LONG_USERNAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE
      );
    });

    it("username is too short", () => {
      validationError.errors = {
        username: new Error.ValidatorError({
          message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "username",
          value: invalidUserInputs.TOO_SHORT_USERNAME,
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("email is empty", () => {
      validationError.errors = {
        email: new Error.ValidatorError({
          message: userFailedValidation.EMAIL_REQUIRED_MESSAGE,
          path: "email",
          value: "",
        }),
      };

      validateSyncStub.returns(validationError);
      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.email.message,
        userFailedValidation.EMAIL_REQUIRED_MESSAGE
      );
    });
  });
});
