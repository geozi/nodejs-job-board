import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { Application } from "domain/models/application.model";
import { validApplicationInput, validUserInput } from "../testInputs";
import { applicationCreationMiddlewareArray } from "business/api/v1/controllers/application.controller";
import { applicationControllerResponseMessages } from "business/messages/applicationControllerResponse.message";
import { httpCodes } from "business/codes/responseStatusCodes";

import { commonServiceMessages } from "service/messages/commonService.message";
import { Error, Types } from "mongoose";
import { User } from "domain/models/user.model";
import { Person } from "domain/models/person.model";

describe("Application creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let saveStub: SinonStub;
  let personFindOneStub: SinonStub;
  const mockUser = new User(validUserInput);
  const mockPerson = new Person({ username: mockUser.username });
  const mockApplication = new Application({
    personId: mockPerson._id,
    listingId: new Types.ObjectId(validApplicationInput.listingId),
  });

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      personFindOneStub = sinon.stub(Person, "findOne");
      saveStub = sinon.stub(Application.prototype, "save");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: JSON.parse(
          JSON.stringify({
            listingId: mockApplication.listingId,
          })
        ),
        user: mockUser,
      };
    });

    it("successful creation (201)", async () => {
      personFindOneStub.resolves(mockPerson);
      saveStub.resolves(mockApplication);

      for (const middleware of applicationCreationMiddlewareArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: applicationControllerResponseMessages.APPLICATION_CREATED,
          data: mockApplication,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        personFindOneStub = sinon.stub(Person, "findOne");
        saveStub = sinon.stub(Application.prototype, "save");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: JSON.parse(
            JSON.stringify({
              listingId: mockApplication.listingId,
            })
          ),
          user: mockUser,
        };
      });

      it("server error (500)", async () => {
        personFindOneStub.resolves(mockPerson);
        saveStub.rejects();

        for (const middleware of applicationCreationMiddlewareArray) {
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

      it("Error.ValidationError (400)", async () => {
        personFindOneStub.resolves(mockPerson);
        saveStub.rejects(new Error.ValidationError());

        for (const middleware of applicationCreationMiddlewareArray) {
          await middleware(req as Request, res as Response, next);
        }

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({ message: "Validation failed" }),
          true
        );
      });
    });
  });
});
