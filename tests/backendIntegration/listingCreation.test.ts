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
import { salaryRangeFailedValidation } from "../../src/domain/messages/salaryRangeValidation.message";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";

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
      req = { body: JSON.parse(JSON.stringify(validListingInput)) };
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
          req = { body: JSON.parse(JSON.stringify(validListingInput)) };
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

        it("workType is required", async () => {
          req.body.workType = undefined;

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
                { message: listingFailedValidation.WORK_TYPE_REQUIRED_MESSAGE },
                { message: listingFailedValidation.WORK_TYPE_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });

        it("workType is invalid", async () => {
          req.body.workType = invalidListingInputs.INVALID_WORK_TYPE;

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
                { message: listingFailedValidation.WORK_TYPE_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });

        it("employmentType is undefined", async () => {
          req.body.employmentType = undefined;

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
                    listingFailedValidation.EMPLOYMENT_TYPE_REQUIRED_MESSAGE,
                },
                {
                  message:
                    listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("employmentType is invalid", async () => {
          req.body.employmentType = invalidListingInputs.INVALID_WORK_TYPE;

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
                    listingFailedValidation.EMPLOYMENT_TYPE_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("experienceLevel is undefined", async () => {
          req.body.experienceLevel = undefined;

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
                    listingFailedValidation.EXPERIENCE_LEVEL_REQUIRED_MESSAGE,
                },
                {
                  message:
                    listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("experienceLevel is invalid", async () => {
          req.body.experienceLevel =
            invalidListingInputs.INVALID_EXPERIENCE_LEVEL;

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
                    listingFailedValidation.EXPERIENCE_LEVEL_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("city is undefined", async () => {
          req.body.city = undefined;

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
                  message: listingFailedValidation.CITY_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("country is undefined", async () => {
          req.body.country = undefined;

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
                  message: listingFailedValidation.COUNTRY_REQUIRED_MESSAGE,
                },
                { message: commonFailedValidation.COUNTRY_INVALID_MESSAGE },
              ],
            }),
            true
          );
        });

        it("listingDesc is undefined", async () => {
          req.body.listingDesc = undefined;

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
                    listingFailedValidation.LISTING_DESCRIPTION_REQUIRED_MESSAGE,
                },
                {
                  message:
                    listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("listingDesc is too short", async () => {
          req.body.listingDesc =
            invalidListingInputs.TOO_SHORT_LISTING_DESCRIPTION;

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
                    listingFailedValidation.LISTING_DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("listingDesc is too long", async () => {
          req.body.listingDesc =
            invalidListingInputs.TOO_LONG_LISTING_DESCRIPTION;

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
                    listingFailedValidation.LISTING_DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("salaryRange.minAmount is invalid", async () => {
          req.body.salaryRange.minAmount =
            invalidListingInputs.INVALID_MIN_AMOUNT;

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
                    salaryRangeFailedValidation.MIN_AMOUNT_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("salaryRange.minAmount is negative", async () => {
          req.body.salaryRange.minAmount =
            invalidListingInputs.NEGATIVE_MIN_AMOUNT;

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
                    salaryRangeFailedValidation.MIN_AMOUNT_NEGATIVE_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("salaryRange.maxAmount is invalid", async () => {
          req.body.salaryRange.maxAmount =
            invalidListingInputs.INVALID_MAX_AMOUNT;

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
                    salaryRangeFailedValidation.MAX_AMOUNT_INVALID_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("salaryRange.maxAmount is negative", async () => {
          req.body.salaryRange.maxAmount =
            invalidListingInputs.NEGATIVE_MAX_AMOUNT;

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
                    salaryRangeFailedValidation.MAX_AMOUNT_NEGATIVE_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        it("status is undefined", async () => {
          req.body.status = undefined;

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
                  message: listingFailedValidation.STATUS_REQUIRED,
                },
                { message: listingFailedValidation.STATUS_INVALID },
              ],
            }),
            true
          );
        });

        it("status is invalid", async () => {
          req.body.status = invalidListingInputs.INVALID_STATUS;

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
              errors: [{ message: listingFailedValidation.STATUS_INVALID }],
            }),
            true
          );
        });
      });
    });

    describe("Promise-oriented", () => {
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
        req = { body: JSON.parse(JSON.stringify(validListingInput)) };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of listingCreationMiddlewareArray) {
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
    });
  });
});
