import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import mongoose, { ConnectOptions } from "mongoose";
import { Application } from "domain/models/application.model";
import * as dotenv from "dotenv";
import { validApplicationInput } from "../../tests/testInputs";
import { applicationCreationMiddlewareArray } from "business/api/v1/controllers/application.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { IRequest } from "business/interfaces/iRequest.interface";
import { User } from "domain/models/user.model";
import { Person } from "domain/models/person.model";
dotenv.config();

describe("Application collection integration test(s)", () => {
  let req: Partial<IRequest>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let personFindOneStub: SinonStub;
  const mockUser = new User();
  const mockPerson = new Person();

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await Application.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(() => {
    sinon.restore();
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
    personFindOneStub = sinon.stub(Person, "findOne");
  });

  it("new application created (201)", async () => {
    req = {
      body: { listingId: validApplicationInput.listingId },
      user: mockUser,
    };

    personFindOneStub.resolves(mockPerson);

    for (const middleware of applicationCreationMiddlewareArray) {
      await middleware(req as IRequest, res as Response, next);
    }

    statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
  });
});
