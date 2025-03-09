import { Application } from "domain/models/application.model";
import { SinonSpy, SinonStub } from "sinon";
import { Response } from "express";
import sinon from "sinon";
import { validUserInput } from "../../tests/testInputs";
import assert from "assert";
import { httpCodes } from "business/codes/responseStatusCodes";
import { applicationControllerResponseMessages } from "business/messages/applicationControllerResponse.message";

import { commonServiceMessages } from "service/messages/commonService.message";
import { applicationServiceMessages } from "service/messages/applicationService.message";
import { User } from "domain/models/user.model";
import { IRequest } from "business/interfaces/iRequest.interface";
import { callApplicationRetrievalByPersonId } from "business/api/v1/controllers/application.controller";
import { Person } from "domain/models/person.model";

describe("Application retrieval by personId integration tests", () => {
  let req: Partial<IRequest>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let applicationFindStub: SinonStub;
  let personFindOneStub: SinonStub;
  const mockPerson = new Person();
  const user = new User(validUserInput);
  const mockApplications = [new Application(), new Application()];

  describe("Positive scenario(s)", () => {
    beforeEach(() => {
      sinon.restore();
      applicationFindStub = sinon.stub(Application, "find");
      personFindOneStub = sinon.stub(Person, "findOne");
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      req = {
        body: {},
        user: user,
      };
    });

    it("successful retrieval (200)", async () => {
      personFindOneStub.resolves(mockPerson);
      applicationFindStub.resolves(mockApplications);

      await callApplicationRetrievalByPersonId(
        req as IRequest,
        res as Response
      );

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message:
            applicationControllerResponseMessages.APPLICATION_S_RETRIEVED,
          data: mockApplications,
        }),
        true
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("promise-oriented", () => {
      beforeEach(() => {
        sinon.restore();
        applicationFindStub = sinon.stub(Application, "find");
        personFindOneStub = sinon.stub(Person, "findOne");
        res = {
          status: sinon.stub().callsFake(() => {
            return res;
          }) as unknown as SinonStub,
          json: sinon.spy(),
        };

        next = sinon.spy();
        req = {
          body: {},
          user: user,
        };
      });

      it("server error (500)", async () => {
        personFindOneStub.resolves(mockPerson);
        applicationFindStub.rejects();

        await callApplicationRetrievalByPersonId(
          req as IRequest,
          res as Response
        );

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
          true
        );
        assert.strictEqual(
          jsonSpy.calledWith({ message: commonServiceMessages.SERVER_ERROR }),
          true
        );
      });

      it("not found (404)", async () => {
        personFindOneStub.resolves(mockPerson);
        applicationFindStub.resolves([]);

        await callApplicationRetrievalByPersonId(
          req as IRequest,
          res as Response
        );

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: applicationServiceMessages.APPLICATIONS_NOT_FOUND,
          }),
          true
        );
      });
    });
  });
});
