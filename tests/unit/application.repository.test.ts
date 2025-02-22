import { Application } from "../../src/domain/models/application.model";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import { validApplicationInput } from "../testInputs";
import {
  getApplicationByUniqueIndex,
  getApplicationsByListingId,
  getApplicationsByPersonId,
  addApplication,
  deleteApplicationById,
  deleteApplicationByUniqueIndex,
} from "../../src/persistence/application.repository";

describe("Application repository unit tests", () => {
  const mockApplication = new Application(validApplicationInput);
  const mockApplications = [new Application(), new Application()];
  const mockApplicationId = new Types.ObjectId("67b9f747f8ca753f616a8fc0");
  const mockPersonId = new Types.ObjectId(validApplicationInput.personId);
  const mockListingId = new Types.ObjectId(validApplicationInput.listingId);
  let functionStub: SinonStub;

  describe(`${getApplicationByUniqueIndex.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findOne");
    });

    it("Promise resolves to Application object", async () => {
      functionStub.resolves(mockApplication);

      const foundApplication = await getApplicationByUniqueIndex(
        mockPersonId,
        mockListingId
      );

      assert(foundApplication instanceof Application);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const foundApplication = await getApplicationByUniqueIndex(
        mockPersonId,
        mockListingId
      );

      assert.strictEqual(foundApplication, null);
    });
  });

  describe(`${getApplicationsByListingId.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "find");
    });

    it("Promise resolves to an array of Application objects", async () => {
      functionStub.resolves(mockApplications);

      const foundApplications = await getApplicationsByListingId(mockListingId);

      assert.notStrictEqual(foundApplications, undefined);
      assert.strictEqual(foundApplications.length, 2);
    });

    it("Promise resolves to an empty array", async () => {
      functionStub.resolves([]);

      const foundApplications = await getApplicationsByListingId(mockListingId);

      assert.notStrictEqual(foundApplications, undefined);
      assert.strictEqual(foundApplications.length, 0);
    });
  });

  describe(`${getApplicationsByPersonId.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "find");
    });

    it("Promise resolves to an array of Application objects", async () => {
      functionStub.resolves(mockApplications);

      const foundApplications = await getApplicationsByPersonId(mockPersonId);

      assert.notStrictEqual(foundApplications, undefined);
      assert.strictEqual(foundApplications.length, 2);
    });

    it("Promise resolves to an empty array", async () => {
      functionStub.resolves([]);

      const foundApplications = await getApplicationsByPersonId(mockPersonId);

      assert.notStrictEqual(foundApplications, undefined);
      assert.strictEqual(foundApplications.length, 0);
    });
  });

  describe(`${addApplication.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application.prototype, "save");
    });

    it("Promise resolves to an Application object", async () => {
      functionStub.resolves(mockApplication);

      const newApplication = new Application(validApplicationInput);
      const savedApplication = await addApplication(newApplication);

      assert(savedApplication instanceof Application);
    });
  });

  describe(`${deleteApplicationById.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Application, "findByIdAndDelete");
    });

    it("Promise resolves to an Application object", async () => {
      functionStub.resolves(mockApplication);

      const deletedApplication = await deleteApplicationById(mockApplicationId);

      assert(deletedApplication instanceof Application);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const deletedApplication = await deleteApplicationById(mockApplicationId);

      assert.strictEqual(deletedApplication, null);
    });
  });

  describe(`${deleteApplicationByUniqueIndex.name}`, () => {
    let findOneStub: SinonStub;
    let findByIdAndDeleteStub: SinonStub;

    beforeEach(() => {
      sinon.restore();
      findOneStub = sinon.stub(Application, "findOne");
      findByIdAndDeleteStub = sinon.stub(Application, "findByIdAndDelete");
    });

    it("Promise resolves to an Application object", async () => {
      findOneStub.resolves(mockApplication);
      findByIdAndDeleteStub.resolves(mockApplication);

      const deletedApplication = await deleteApplicationByUniqueIndex(
        mockPersonId,
        mockListingId
      );

      assert(deletedApplication instanceof Application);
    });

    it("Promise resolves to null", async () => {
      findOneStub.resolves(null);

      const deletedApplication = await deleteApplicationByUniqueIndex(
        mockPersonId,
        mockListingId
      );

      assert.strictEqual(deletedApplication, null);
    });
  });
});
