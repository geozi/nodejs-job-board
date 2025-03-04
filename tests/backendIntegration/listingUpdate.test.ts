import assert from "assert";
import { Types } from "mongoose";
import { Request, Response } from "express";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { IListingUpdate } from "business/interfaces/iListingUpdate.interface";
import { invalidObjectIdInputs, validListingInput } from "../testInputs";
import { Listing } from "domain/models/listing.model";
import { listingUpdateMiddlewareArray } from "business/api/v1/controllers/listing.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { listingControllerResponseMessages } from "business/messages/listingControllerResponse.message";
import { IListing } from "domain/interfaces/documents/iListing.interface";
import { commonResponseMessages } from "business/messages/commonResponse.message";
import { listingFailedValidation } from "domain/messages/listingValidation.message";
import { commonServiceMessages } from "service/messages/commonService.message";
import { listingServiceMessages } from "service/messages/listingService.message";

describe("Listing update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  const mockId = new Types.ObjectId("67c5d1d933ab3e65bd6ac9e2");
  const mockUpdateListing: IListingUpdate = {
    id: mockId,
    title: validListingInput.title,
    organizationName: validListingInput.organizationName,
  };
  let functionStub: SinonStub;
  const updatedListing: IListing = new Listing(mockUpdateListing);

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Listing, "findByIdAndUpdate");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: JSON.parse(JSON.stringify(mockUpdateListing)),
      };
    });

    it("listing ID is valid", async () => {
      functionStub.resolves(updatedListing);

      for (const middleware of listingUpdateMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: listingControllerResponseMessages.LISTING_UPDATED,
          data: updatedListing,
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

          res = {
            status: sinon.stub().callsFake(() => {
              return res;
            }) as unknown as SinonStub,
            json: sinon.spy(),
          };

          next = sinon.spy();
        });

        it("listing ID is undefined", async () => {
          req = { body: { id: undefined } };

          for (const middleware of listingUpdateMiddlewareArray) {
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
                  message: listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE,
                },
              ],
            }),
            true
          );
        });

        invalidObjectIdInputs.OBJECT_ID_LENGTH_CASES.forEach(
          ([testName, invalidLengthId]) => {
            it(testName, async () => {
              req = { body: { id: invalidLengthId } };

              for (const middleware of listingUpdateMiddlewareArray) {
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
                        listingFailedValidation.LISTING_ID_OUT_OF_LENGTH_MESSAGE,
                    },
                  ],
                }),
                true
              );
            });
          }
        );

        invalidObjectIdInputs.OBJECT_ID_INVALID_CASES.forEach(
          ([testName, invalidId]) => {
            it(testName, async () => {
              req = { body: { id: invalidId } };

              for (const middleware of listingUpdateMiddlewareArray) {
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
                        listingFailedValidation.LISTING_ID_INVALID_MESSAGE,
                    },
                  ],
                }),
                true
              );
            });
          }
        );
      });
    });

    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        functionStub = sinon.stub(Listing, "findByIdAndUpdate");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: JSON.parse(JSON.stringify(mockUpdateListing)),
        };
      });

      it("server error (500)", async () => {
        functionStub.rejects();

        for (const middleware of listingUpdateMiddlewareArray) {
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
        functionStub.resolves(null);

        for (const middleware of listingUpdateMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: listingServiceMessages.LISTING_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
