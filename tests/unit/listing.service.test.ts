import { Listing } from "../../src/domain/models/listing.model";
import { IListing } from "../../src/domain/interfaces/documents/iListing.interface";
import { IListingUpdate } from "../../src/business/interfaces/iListingUpdate.interface";
import {
  retrieveListingById,
  retrieveListingsByEmploymentType,
  retrieveListingsByExperienceLevel,
  retrieveListingsByStatus,
  retrieveListingsByWorkType,
  createListing,
  bringListingToDate,
  removeListing,
} from "../../src/service/listing.service";
import sinon, { SinonStub } from "sinon";
import { Types } from "mongoose";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { validListingInput } from "../testInputs";
chai.use(chaiAsPromised);

describe("Listing service unit tests", () => {
  const mockListing = new Listing(validListingInput);
  const mockListings: IListing[] = [];
  const mockId = new Types.ObjectId("67bca7f146dfa4501416a5e6");
  const mockUpdateObj: IListingUpdate = { id: mockId };
  let functionStub: SinonStub;

  describe(`${retrieveListingById.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findById");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(retrieveListingById(mockId), ServerError);
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(retrieveListingById(mockId), NotFoundError);
    });
  });

  describe(`${retrieveListingsByStatus.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveListingsByStatus(validListingInput.status),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockListings);

      return (
        chai.assert.isRejected(
          retrieveListingsByStatus(validListingInput.status)
        ),
        NotFoundError
      );
    });
  });

  describe(`${retrieveListingsByEmploymentType.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveListingsByEmploymentType(validListingInput.employmentType),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockListings);

      return chai.assert.isRejected(
        retrieveListingsByEmploymentType(validListingInput.employmentType),
        NotFoundError
      );
    });
  });

  describe(`${retrieveListingsByExperienceLevel.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveListingsByExperienceLevel(validListingInput.experienceLevel),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockListings);

      return chai.assert.isRejected(
        retrieveListingsByExperienceLevel(validListingInput.experienceLevel),
        NotFoundError
      );
    });
  });

  describe(`${retrieveListingsByWorkType.name}`, async () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        retrieveListingsByWorkType(validListingInput.workType),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(mockListings);

      return chai.assert.isRejected(
        retrieveListingsByWorkType(validListingInput.workType),
        NotFoundError
      );
    });
  });

  describe(`${createListing.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing.prototype, "save");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(createListing(mockListing), ServerError);
    });
  });

  describe(`${bringListingToDate.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findByIdAndUpdate");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(
        bringListingToDate(mockUpdateObj),
        ServerError
      );
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(
        bringListingToDate(mockUpdateObj),
        NotFoundError
      );
    });
  });

  describe(`${removeListing.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findByIdAndDelete");
    });

    it("server error", async () => {
      functionStub.rejects();

      return chai.assert.isRejected(removeListing(mockId), ServerError);
    });

    it("not found", async () => {
      functionStub.resolves(null);

      return chai.assert.isRejected(removeListing(mockId), NotFoundError);
    });
  });
});
