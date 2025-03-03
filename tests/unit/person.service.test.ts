import { Person } from "../../src/domain/models/person.model";
import { IPersonUpdate } from "../../src/business/interfaces/iPersonUpdate.interface";
import sinon, { SinonStub } from "sinon";
import { Error, Types } from "mongoose";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { UniqueConstraintError } from "../../src/errors/uniqueConstraintError.class";
import {
  retrievePersonInfoByUsername,
  createPersonInfo,
  bringPersonInfoToDate,
  removePersonInfo,
} from "../../src/service/person.service";
import { validPersonInput } from "../testInputs";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Person service unit tests", () => {
  const mockPerson = new Person(validPersonInput);
  const mockId = new Types.ObjectId("67bc96f4259e2b294115821a");
  const mockUpdateObj: IPersonUpdate = { id: mockId };
  let functionStub: SinonStub;

  describe(`${retrievePersonInfoByUsername.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findOne");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrievePersonInfoByUsername(validPersonInput.username),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        retrievePersonInfoByUsername(validPersonInput.username),
        NotFoundError
      );
    });
  });

  describe(`${createPersonInfo.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person.prototype, "save");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(createPersonInfo(mockPerson), ServerError);
    });

    it("unique constraint error", async () => {
      functionStub.rejects(new Error.ValidationError());

      return chai.assert.isRejected(
        createPersonInfo(mockPerson),
        UniqueConstraintError
      );
    });
  });

  describe(`${bringPersonInfoToDate.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndUpdate");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        bringPersonInfoToDate(mockUpdateObj),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        bringPersonInfoToDate(mockUpdateObj),
        NotFoundError
      );
    });
  });

  describe(`${removePersonInfo.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndDelete");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(removePersonInfo(mockId), ServerError);
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(removePersonInfo(mockId), NotFoundError);
    });
  });
});
