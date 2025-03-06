import { Application } from "domain/models/application.model";
import { IApplication } from "domain/interfaces/documents/iApplication.interface";
import sinon, { SinonStub } from "sinon";
import { Error, Types } from "mongoose";
import { NotFoundError } from "errors/notFoundError.class";
import { ServerError } from "errors/serverError.class";
import { UniqueConstraintError } from "errors/uniqueConstraintError.class";
import { validApplicationInput } from "../testInputs";
import {
  retrieveApplicationByUniqueIndex,
  retrieveApplicationsByListingId,
  retrieveApplicationsByPersonId,
  createApplication,
  removeApplicationById,
} from "service/application.service";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Application service unit tests", () => {
  const mockApplication = new Application(validApplicationInput);
  const mockApplications: IApplication[] = [];
  const mockApplicationId = new Types.ObjectId("67bd8bc057196d9e346ae351");
  const mockPersonId = new Types.ObjectId(validApplicationInput.personId);
  const mockListingId = new Types.ObjectId(validApplicationInput.listingId);
  let functionStub: SinonStub;

  describe(`${retrieveApplicationByUniqueIndex.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findOne");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveApplicationByUniqueIndex(mockPersonId, mockListingId),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        retrieveApplicationByUniqueIndex(mockPersonId, mockListingId),
        NotFoundError
      );
    });
  });

  describe(`${retrieveApplicationsByListingId.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveApplicationsByListingId(mockListingId),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockApplications);

      return chai.assert.isRejected(
        retrieveApplicationsByListingId(mockListingId),
        NotFoundError
      );
    });
  });

  describe(`${retrieveApplicationsByPersonId.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveApplicationsByPersonId(mockPersonId),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockApplications);

      return chai.assert.isRejected(
        retrieveApplicationsByPersonId(mockPersonId),
        NotFoundError
      );
    });
  });

  describe(`${createApplication.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application.prototype, "save");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        createApplication(mockApplication),
        ServerError
      );
    });

    it("unique constraint error", async () => {
      functionStub.rejects(new Error.ValidationError());

      return chai.assert.isRejected(
        createApplication(mockApplication),
        UniqueConstraintError
      );
    });
  });

  describe(`${removeApplicationById.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findByIdAndDelete");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        removeApplicationById(mockApplicationId),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        removeApplicationById(mockApplicationId),
        NotFoundError
      );
    });
  });
});
