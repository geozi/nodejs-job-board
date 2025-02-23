import { User } from "../../src/domain/models/user.model";
import { IUser } from "../../src/domain/interfaces/documents/iUser.interface";
import sinon, { SinonStub } from "sinon";
import { Error, Types } from "mongoose";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { validUserInput } from "../testInputs";
import {
  retrieveUserByEmail,
  retrieveUserByUsername,
  retrieveUsersByRole,
  createUser,
  bringUserToDate,
  removeUser,
} from "../../src/service/user.service";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { IUserUpdate } from "../../src/business/interfaces/IUserUpdate.interface";
import { UniqueConstraintError } from "../../src/errors/uniqueConstraintError.class";
chai.use(chaiAsPromised);

describe("User service unit tests", () => {
  const mockUser = new User(validUserInput);
  const mockUsers: IUser[] = [];
  const mockId = new Types.ObjectId("67bb474a5b74bdbd9b3636b1");
  const mockUpdateObj: IUserUpdate = { id: mockId };
  let functionStub: SinonStub;

  describe(`${retrieveUserByEmail.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findOne");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveUserByEmail(validUserInput.email),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        retrieveUserByEmail(validUserInput.email),
        NotFoundError
      );
    });
  });

  describe(`${retrieveUserByUsername.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findOne");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveUserByUsername(validUserInput.username),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        retrieveUserByUsername(validUserInput.username),
        NotFoundError
      );
    });
  });

  describe(`${retrieveUsersByRole.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveUsersByRole(validUserInput.role),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockUsers);

      return chai.assert.isRejected(
        retrieveUsersByRole(validUserInput.role),
        NotFoundError
      );
    });
  });

  describe(`${createUser.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User.prototype, "save");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(createUser(mockUser), ServerError);
    });

    it("unique constraint error", async () => {
      functionStub.rejects(new Error.ValidationError());

      return chai.assert.isRejected(
        createUser(mockUser),
        UniqueConstraintError
      );
    });
  });

  describe(`${bringUserToDate.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findByIdAndUpdate");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        bringUserToDate(mockUpdateObj),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        bringUserToDate(mockUpdateObj),
        NotFoundError
      );
    });
  });

  describe(`${removeUser.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findByIdAndDelete");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(removeUser(mockId), ServerError);
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(removeUser(mockId), NotFoundError);
    });
  });
});
