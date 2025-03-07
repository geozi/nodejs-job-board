import sinon, { SinonSpy, SinonStub } from "sinon";
import assert from "assert";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "domain/interfaces/documents/iUser.interface";
import { testToken, validUserInput } from "../../tests/testInputs";
import { userLoginMiddlewareArray } from "auth/auth.controller";
import { httpCodes } from "business/codes/responseStatusCodes";
import { authResponseMessages } from "auth/authResponse.message";
import { User } from "domain/models/user.model";

describe("User login success integration test(s)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let findOneStub: SinonStub;
  let bcryptCompareStub: SinonStub;
  let jwtSignStub: SinonStub;
  const mockUser: IUser = new User();

  beforeEach(() => {
    sinon.restore();
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();

    findOneStub = sinon.stub(User, "findOne");
    bcryptCompareStub = sinon.stub(bcrypt, "compare");
    jwtSignStub = sinon.stub(jwt, "sign");
  });

  it("has valid inputs", async () => {
    findOneStub.resolves(mockUser);
    bcryptCompareStub.resolves(true);
    jwtSignStub.returns(testToken);

    req = {
      body: {
        username: validUserInput.username,
        password: validUserInput.password,
      },
    };

    for (const middleware of userLoginMiddlewareArray) {
      await middleware(req as Request, res as Response, next);
    }

    statusStub = res.status as SinonStub;
    jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: authResponseMessages.AUTHENTICATION_SUCCESS,
        token: testToken,
      }),
      true
    );
  });
});
