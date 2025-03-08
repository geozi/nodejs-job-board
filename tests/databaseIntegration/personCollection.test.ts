import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import mongoose, { ConnectOptions } from "mongoose";
import { Person } from "domain/models/person.model";
import * as dotenv from "dotenv";
import { validPersonInput, validUserInput } from "../../tests/testInputs";
import { infoCreationMiddlewareArray } from "business/api/v1/controllers/person.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { IRequest } from "business/interfaces/iRequest.interface";
import { User } from "domain/models/user.model";
dotenv.config();

describe("Person collection integration test(s)", () => {
  let req: Partial<IRequest>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let user = new User(validUserInput);

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
    req = {
      body: {
        firstName: validPersonInput.firstName,
        lastName: validPersonInput.lastName,
        phoneNumber: validPersonInput.phoneNumber,
        address: validPersonInput.address,
        education: validPersonInput.education,
        workExperience: validPersonInput.workExperience,
      },
      user: user,
    };

    for (const middleware of infoCreationMiddlewareArray) {
      await middleware(req as Request, res as Response, next);
    }

    statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
  });
});
