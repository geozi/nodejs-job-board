import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { Listing } from "../../src/domain/models/listing.model";
import {
  invalidCommonInputs,
  invalidListingInputs,
  validListingInput,
} from "../testInputs";
import { listingCreationMiddlewareArray } from "../../src/business/api/v1/controllers/listing.controller";
import assert from "assert";
import { httpCodes } from "../../src/business/codes/responseStatusCodes";
import { listingControllerResponseMessages } from "../../src/business/messages/listingControllerResponse.message";
import { createListing } from "../../src/service/listing.service";
import { listingFailedValidation } from "../../src/domain/messages/listingValidation.message";
import { commonResponseMessages } from "../../src/business/messages/commonResponse.message";
import { commonFailedValidation } from "../../src/domain/messages/commonValidation.message";

describe("Listing creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let functionStub: SinonStub;
  const mockListing = new Listing(validListingInput);

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing.prototype, "save");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = { body: { ...validListingInput } };
    });

    it("has valid inputs", async () => {
      functionStub.resolves(mockListing);

      for (const middleware of listingCreationMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: listingControllerResponseMessages.LISTING_CREATED,
          data: mockListing,
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
          sinon.replace({ createListing }, "createListing", sinon.fake());
          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
          req = { body: { ...validListingInput } };
        });

        it("title is undefined", async () => {
          req.body.title = undefined;

          for (const middleware of listingCreationMiddlewareArray) {
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
                { message: listingFailedValidation.TITLE_REQUIRED_MESSAGE },
              ],
            }),
            true
          );
        });

        it("organizationName is undefined", async () => {
          req.body.organizationName = undefined;

          for (const middleware of listingCreationMiddlewareArray) {
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
                {
                  message:
                    commonFailedValidation.ORGANIZATION_NAME_REQUIRED_MESSAGE,
                },
                {
                  message:
                    commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("organizationName is too short", async () => {
          req.body.organizationName =
            invalidCommonInputs.TOO_SHORT_ORGANIZATION_NAME;

          for (const middleware of listingCreationMiddlewareArray) {
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
                {
                  message:
                    commonFailedValidation.ORGANIZATION_NAME_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("datePosted is undefined", async () => {
          req.body.datePosted = undefined;

          for (const middleware of listingCreationMiddlewareArray) {
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
                {
                  message: listingFailedValidation.DATE_POSTED_REQUIRED_MESSAGE,
                },
                {
                  message: listingFailedValidation.DATE_POSTED_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("datePosted is invalid", async () => {
          req.body.datePosted = invalidListingInputs.INVALID_DATE_POSTED;

          for (const middleware of listingCreationMiddlewareArray) {
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
                {
                  message: listingFailedValidation.DATE_POSTED_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });
      });
    });
  });
});
