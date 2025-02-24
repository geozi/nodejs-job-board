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
import { Error, Types } from "mongoose";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { UniqueConstraintError } from "../../src/errors/uniqueConstraintError.class";
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

  describe(`${retrieveListingById}`, () => {
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
});
