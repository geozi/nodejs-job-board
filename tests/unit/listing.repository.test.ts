import { Listing } from "domain/models/listing.model";
import { IListingUpdate } from "business/interfaces/iListingUpdate.interface";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import { validListingInput } from "../testInputs";
import {
  getListingsByStatus,
  getListingById,
  getListingsByEmploymentType,
  getListingsByExperienceLevel,
  getListingsByWorkType,
  addListing,
  updateListing,
  deleteListing,
} from "persistence/listing.repository";

describe("Listing repository unit tests", () => {
  const mockListing = new Listing();
  const mockListings = [new Listing(), new Listing(), new Listing()];
  const mockId = new Types.ObjectId("67b9a1cd1ac0a8bb3b2c1bee");
  const mockUpdateObj: IListingUpdate = { id: mockId };
  let functionStub: SinonStub;

  describe(`${getListingsByStatus.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      functionStub.resolves(mockListings);

      const foundListings = await getListingsByStatus(validListingInput.status);

      assert.notStrictEqual(foundListings, null);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an empty array", async () => {
      functionStub.resolves([]);

      const foundListings = await getListingsByStatus(validListingInput.status);

      assert.strictEqual(foundListings.length, 0);
    });
  });

  describe(`${getListingById.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findById");
    });

    it("Promise resolves to Listing object", async () => {
      functionStub.resolves(mockListing);

      const foundListing = await getListingById(mockId);

      assert(foundListing instanceof Listing);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const foundListing = await getListingById(mockId);

      assert.strictEqual(foundListing, null);
    });
  });

  describe(`${getListingsByEmploymentType.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      functionStub.resolves(mockListings);

      const foundListings = await getListingsByEmploymentType(
        validListingInput.employmentType
      );

      assert.notStrictEqual(foundListings, null);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an array of zero length", async () => {
      functionStub.resolves([]);

      const foundListings = await getListingsByEmploymentType(
        validListingInput.employmentType
      );

      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 0);
    });
  });

  describe(`${getListingsByExperienceLevel.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      functionStub.resolves(mockListings);

      const foundListings = await getListingsByExperienceLevel(
        validListingInput.experienceLevel
      );

      assert.notStrictEqual(foundListings, null);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an array of zero length", async () => {
      functionStub.resolves([]);

      const foundListings = await getListingsByExperienceLevel(
        validListingInput.experienceLevel
      );

      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 0);
    });
  });

  describe(`${getListingsByWorkType.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("Promise resolves to an array of Listing objects", async () => {
      functionStub.resolves(mockListings);

      const foundListings = await getListingsByWorkType(
        validListingInput.workType
      );

      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 3);
    });

    it("Promise resolves to an array of zero objects", async () => {
      functionStub.resolves([]);

      const foundListings = await getListingsByWorkType(
        validListingInput.workType
      );

      assert.notStrictEqual(foundListings, undefined);
      assert.strictEqual(foundListings.length, 0);
    });
  });

  describe(`${addListing.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing.prototype, "save");
    });

    it("Promise resolves to a Listing object", async () => {
      functionStub.resolves(mockListing);

      const newListing = new Listing(validListingInput);
      const savedListing = await addListing(newListing);

      assert(savedListing instanceof Listing);
    });
  });

  describe(`${updateListing.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findByIdAndUpdate");
    });

    it("Promise resolves to a Listing object", async () => {
      functionStub.resolves(mockListing);

      const updatedListing = await updateListing(mockUpdateObj);

      assert(updatedListing instanceof Listing);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const updatedListing = await updateListing(mockUpdateObj);

      assert.strictEqual(updatedListing, null);
    });
  });

  describe(`${deleteListing.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findByIdAndDelete");
    });

    it("Promise resolves to a Listing object", async () => {
      functionStub.resolves(mockListing);

      const deletedListing = await deleteListing(mockId);

      assert(deletedListing instanceof Listing);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const deletedListing = await deleteListing(mockId);

      assert.strictEqual(deletedListing, null);
    });
  });
});
