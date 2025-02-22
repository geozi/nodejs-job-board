import { Listing } from "../../src/domain/models/listing.model";
import { IListingUpdate } from "../../src/business/interfaces/iListingUpdate.interface";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import { validListingInput } from "../testInputs";
import {
  getListingById,
  getListingsByEmploymentType,
  getListingsByExperienceLevel,
  getListingsByWorkType,
  addListing,
  updateListing,
  deleteListing,
} from "../../src/persistence/listing.repository";

describe("Listing repository unit tests", () => {
  const mockListing = new Listing();
  const mockListings = [new Listing(), new Listing(), new Listing()];
  const mockId = new Types.ObjectId("67b9a1cd1ac0a8bb3b2c1bee");
  const mockUpdateObj: IListingUpdate = { id: mockId };
  let methodStub: SinonStub;

  describe("getListingById()", () => {
    beforeEach(() => {
      sinon.restore();
      methodStub = sinon.stub(Listing, "findById");
    });

    it("Promise resolves to Listing object", async () => {
      methodStub.resolves(mockListing);
      const foundListing = await getListingById(mockId);
      assert(foundListing instanceof Listing);
    });

    it("Promise resolves to null", async () => {
      methodStub.resolves(null);
      const foundListing = await getListingById(mockId);
      assert.strictEqual(foundListing, null);
    });
  });

  describe("getListingsByEmploymentType()", () => {
    beforeEach(() => {
      sinon.restore();
      methodStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      methodStub.resolves(mockListings);
      const foundListings = await getListingsByEmploymentType(
        validListingInput.employmentType
      );
      assert.notStrictEqual(foundListings, null);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an array of zero length", async () => {
      methodStub.resolves([]);
      const foundListings = await getListingsByEmploymentType(
        validListingInput.employmentType
      );
      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 0);
    });
  });

  describe("getListingsByExperienceLevel()", () => {
    beforeEach(() => {
      sinon.restore();
      methodStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      methodStub.resolves(mockListings);
      const foundListings = await getListingsByExperienceLevel(
        validListingInput.experienceLevel
      );
      assert.notStrictEqual(foundListings, null);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an array of zero length", async () => {
      methodStub.resolves([]);
      const foundListings = await getListingsByExperienceLevel(
        validListingInput.experienceLevel
      );
      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 0);
    });
  });
});
