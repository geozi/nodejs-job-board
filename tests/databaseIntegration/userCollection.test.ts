import assert from "assert";
import { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import sinon, { SinonStub, SinonSpy } from "sinon";
import * as dotenv from "dotenv";
import { User } from "domain/models/user.model";
import { validUserInput } from "../../tests/testInputs";
import { registrationMiddlewareArray } from "business/api/v1/controllers/user.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
dotenv.config();

describe("User collection integration tests", () => {
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
    await User.deleteMany({});
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

  it("new user registered (201)", async () => {
    req = {
      body: {
        username: validUserInput.username,
        email: validUserInput.email,
        password: validUserInput.password,
        role: validUserInput.role.toString(),
      },
    };

    for (const middleware of registrationMiddlewareArray) {
      await middleware(req as Request, res as Response, next);
    }

    statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
  });
});
