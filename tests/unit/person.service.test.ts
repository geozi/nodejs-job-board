import { Person } from "../../src/domain/models/person.model";
import { IPersonUpdate } from "../../src/business/interfaces/iPersonUpdate.interface";
import sinon, { SinonStub } from "sinon";
import { Error, Types } from "mongoose";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { UniqueConstraintError } from "../../src/errors/uniqueConstraintError.class";
import {
  retrievePersonProfileByUsername,
  createPersonProfile,
  bringPersonProfileToDate,
  deletePersonProfile,
} from "../../src/service/person.service";
import { assert } from "chai";
import { validPersonInput } from "../testInputs";

describe("Person service unit tests", () => {
  const mockPerson = new Person(validPersonInput);
  const mockId = new Types.ObjectId("67bc96f4259e2b294115821a");
  const mockUpdateObj: IPersonUpdate = { id: mockId };
  let functionStub: SinonStub;

  describe(`${retrievePersonProfileByUsername.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findOne");
    });

    it("server error", async () => {
      functionStub.rejects();

      return assert.isRejected(
        retrievePersonProfileByUsername(validPersonInput.username),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return assert.isRejected(
        retrievePersonProfileByUsername(validPersonInput.username),
        NotFoundError
      );
    });
  });

  describe(`${createPersonProfile.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person.prototype, "save");
    });

    it("server error", async () => {
      functionStub.rejects();

      return assert.isRejected(createPersonProfile(mockPerson), ServerError);
    });

    it("unique constraint error", async () => {
      functionStub.rejects(new Error.ValidationError());

      return assert.isRejected(
        createPersonProfile(mockPerson),
        UniqueConstraintError
      );
    });
  });

  describe(`${bringPersonProfileToDate.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndUpdate");
    });

    it("server error", async () => {
      functionStub.rejects();

      return assert.isRejected(
        bringPersonProfileToDate(mockUpdateObj),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return assert.isRejected(
        bringPersonProfileToDate(mockUpdateObj),
        NotFoundError
      );
    });
  });

  describe(`${deletePersonProfile.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndDelete");
    });

    it("server error", async () => {
      functionStub.rejects();

      return assert.isRejected(deletePersonProfile(mockId), ServerError);
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return assert.isRejected(deletePersonProfile(mockId), NotFoundError);
    });
  });
});
