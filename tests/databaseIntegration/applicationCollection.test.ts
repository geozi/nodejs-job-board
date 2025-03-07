import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import mongoose, { ConnectOptions } from "mongoose";
import { Application } from "domain/models/application.model";
import * as dotenv from "dotenv";
import { validApplicationInput } from "../../tests/testInputs";
import { applicationCreationMiddlewareArray } from "business/api/v1/controllers/application.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
dotenv.config();

describe("Application collection integration test(s)", () => {
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
  });

  it("new application created (201)", async () => {
    req = { body: { ...validApplicationInput } };

    for (const middleware of applicationCreationMiddlewareArray) {
      await middleware(req as Request, res as Response, next);
    }

    statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
  });
});
