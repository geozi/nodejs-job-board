import { User } from "domain/models/user.model";
import sinon, { SinonStub } from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import { validUserInput } from "../testInputs";
import {
  getUserByEmail,
  getUserByUsername,
  getUsersByRole,
  addUser,
  updateUser,
  deleteUser,
} from "persistence/user.repository";
import { IUserUpdate } from "business/interfaces/iUserUpdate.interface";

describe("User repository unit tests", () => {
  const mockUser = new User();
  const mockUsers = [new User(), new User()];
  const mockId = new Types.ObjectId("67b853b6909eb92b7547e41c");
  const mockUpdateObj: IUserUpdate = {
    id: mockId,
  };
  let functionStub: SinonStub;

  describe(`${getUserByUsername.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findOne");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUser);

      const foundUser = await getUserByUsername(validUserInput.username);

      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const foundUser = await getUserByUsername(validUserInput.username);

      assert.strictEqual(foundUser, null);
    });
  });

  describe(`${getUserByEmail.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findOne");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUser);

      const foundUser = await getUserByEmail(validUserInput.email);

      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const foundUser = await getUserByEmail(validUserInput.email);

      assert.strictEqual(foundUser, null);
    });
  });

  describe(`${getUsersByRole.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "find");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUsers);

      const foundUsers = await getUsersByRole(validUserInput.role);

      assert.strictEqual(foundUsers.length, 2);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves([]);

      const foundUsers = await getUsersByRole(validUserInput.role);

      assert.strictEqual(foundUsers.length, 0);
    });
  });

  describe(`${addUser.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User.prototype, "save");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUser);

      const newUser = new User(validUserInput);
      const savedUser = await addUser(newUser);

      assert(savedUser instanceof User);
    });
  });

  describe(`${updateUser.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findByIdAndUpdate");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUser);

      const updatedUser = await updateUser(mockUpdateObj);

      assert(updatedUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const updatedUser = await updateUser(mockUpdateObj);

      assert.strictEqual(updatedUser, null);
    });
  });

  describe(`${deleteUser.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(User, "findByIdAndDelete");
    });

    it("Promise resolves to User object", async () => {
      functionStub.resolves(mockUser);

      const deletedUser = await deleteUser(mockId);

      assert(deletedUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const deletedUser = await deleteUser(mockId);

      assert.strictEqual(deletedUser, null);
    });
  });
});
