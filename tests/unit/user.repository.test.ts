import { User } from "../../src/domain/models/user.model";
import sinon from "sinon";
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
} from "../../src/persistence/user.repository";
import { IUserUpdate } from "../business/interfaces/IUserUpdate.interface";

describe.only("User repository unit tests", () => {
  const mockUser = new User();
  const mockUsers = [new User(), new User()];
  const mockId = new Types.ObjectId("67b853b6909eb92b7547e41c");
  const mockUpdateObj: IUserUpdate = {
    id: mockId,
  };

  describe("getUserByUsername()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findOne").resolves(mockUser);
      const foundUser = await getUserByUsername(validUserInput.username);
      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findOne").resolves(null);
      const foundUser = await getUserByUsername(validUserInput.username);
      assert.strictEqual(foundUser, null);
    });
  });

  describe("getUserByEmail()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findOne").resolves(mockUser);
      const foundUser = await getUserByEmail(validUserInput.email);
      assert(foundUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findOne").resolves(null);
      const foundUser = await getUserByEmail(validUserInput.email);
      assert.strictEqual(foundUser, null);
    });
  });

  describe("getUsersByRole()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "find").resolves(mockUsers);
      const foundUsers = await getUsersByRole(validUserInput.role);
      assert.strictEqual(foundUsers.length, 2);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "find").resolves([]);
      const foundUsers = await getUsersByRole(validUserInput.role);
      assert.strictEqual(foundUsers.length, 0);
    });
  });

  describe("addUser()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User.prototype, "save").resolves(mockUser);
      const newUser = new User(validUserInput);
      const savedUser = await addUser(newUser);
      assert(savedUser instanceof User);
    });
  });

  describe("updateUser()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findByIdAndUpdate").resolves(mockUser);
      const updatedUser = await updateUser(mockUpdateObj);
      assert(updatedUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findByIdAndUpdate").resolves(null);
      const updatedUser = await updateUser(mockUpdateObj);
      assert.strictEqual(updatedUser, null);
    });
  });

  describe("deleteUser()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to User object", async () => {
      sinon.stub(User, "findByIdAndDelete").resolves(mockUser);
      const deletedUser = await deleteUser(mockId);
      assert(deletedUser instanceof User);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(User, "findByIdAndDelete").resolves(null);
      const deletedUser = await deleteUser(mockId);
      assert.strictEqual(deletedUser, null);
    });
  });
});
