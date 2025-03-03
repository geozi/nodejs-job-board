import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { Listing } from "../../src/domain/models/listing.model";
import { invalidListingInputs, validListingInput } from "../testInputs";
import { retrievalByWorkTypeMiddlewareArray } from "../../src/business/api/v1/controllers/listing.controller";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { listingControllerResponseMessages } from "../../src/business/messages/listingControllerResponse.message";
import { retrieveListingsByWorkType } from "../../src/service/listing.service";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { listingFailedValidation } from "../../src/domain/messages/listingValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { listingServiceMessages } from "../../src/service/messages/listingService.message";

describe("Listing retrieval by workType integration", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockListings = [new Listing(), new Listing()];

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "find");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: { workType: validListingInput.workType.toString() } };
    });

    it("workType is valid", async () => {
      functionStub.resolves(mockListings);

      for (const middleware of retrievalByWorkTypeMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: listingControllerResponseMessages.LISTING_S_RETRIEVED,
          data: mockListings,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      describe("bad requests (400)", () => {
        beforeEach(() => {
          sinon.restore();
          sinon.replace(
            { retrieveListingsByWorkType },
            "retrieveListingsByWorkType",
            sinon.fake()
          );
          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
        });

        it("workType is undefined", async () => {
          req = { body: { workType: undefined } };

          for (const middleware of retrievalByWorkTypeMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                { message: listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("workType is invalid", async () => {
          req = { body: { workType: invalidListingInputs.INVALID_WORK_TYPE } };

          for (const middleware of retrievalByWorkTypeMiddlewareArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          assert.strictEqual(
            statusStub.calledWith(httpCodes.BAD_REQUEST),
            true
          );
          assert.strictEqual(
            jsonSpy.calledWith({
              message: commonResponseMessages.BAD_REQUEST,
              errors: [
                { message: listingFailedValidation.WORK_TYPE_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });
      });
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Listing, "find");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = { body: { workType: validListingInput.workType.toString() } };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of retrievalByWorkTypeMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
          true
        );
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonServiceMessages.SERVER_ERROR,
          }),
          true
        );
      });

      it("not found (404)", async () => {
        functionStub.resolves([]);

        for (const middleware of retrievalByWorkTypeMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: listingServiceMessages.LISTINGS_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
