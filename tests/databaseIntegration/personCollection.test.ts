import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import mongoose, { ConnectOptions } from "mongoose";
import { Person } from "domain/models/person.model";
import * as dotenv from "dotenv";
import { validPersonInput } from "../../tests/testInputs";
import { infoCreationMiddlewareArray } from "business/api/v1/controllers/person.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
dotenv.config();

describe("Person collection integration test(s)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await Person.deleteMany({});
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
  });

  it("new person info added (201)", async () => {
    req = { body: { ...validPersonInput } };

    for (const middleware of infoCreationMiddlewareArray) {
      await middleware(req as Request, res as Response, next);
    }

    statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
  });
});
