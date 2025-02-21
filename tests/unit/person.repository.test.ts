import sinon from "sinon";
import assert from "assert";
import { Person } from "../../src/domain/models/person.model";
import { IPersonUpdate } from "../../src/business/interfaces/iPersonUpdate.interface";
import { Types } from "mongoose";
import { validPersonInput } from "../testInputs";
import {
  getPersonByUsername,
  addPerson,
  updatePerson,
  deletePerson,
} from "../../src/persistence/person.repository";

describe("Person repository unit tests", () => {
  const mockPerson = new Person();
  const mockId = new Types.ObjectId("67b8a6bc2e3b2527cd30ba86");
  const mockUpdateObj: IPersonUpdate = { id: mockId };

  describe("getPersonByUsername()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Person object", async () => {
      sinon.stub(Person, "findOne").resolves(mockPerson);

      const foundPerson = await getPersonByUsername(validPersonInput.username);

      assert(foundPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Person, "findOne").resolves(null);

      const foundPerson = await getPersonByUsername(validPersonInput.username);

      assert.strictEqual(foundPerson, null);
    });
  });

  describe("addPerson()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Person object", async () => {
      sinon.stub(Person.prototype, "save").resolves(mockPerson);

      const newPerson = new Person(validPersonInput);
      const savedPerson = await addPerson(newPerson);

      assert(savedPerson instanceof Person);
    });
  });

  describe("updatePerson()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Person object", async () => {
      sinon.stub(Person, "findByIdAndUpdate").resolves(mockPerson);

      const updatedPerson = await updatePerson(mockUpdateObj);

      assert(updatedPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Person, "findByIdAndUpdate").resolves(null);

      const updatedPerson = await updatePerson(mockUpdateObj);

      assert.strictEqual(updatedPerson, null);
    });
  });

  describe("deletePerson()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Person object", async () => {
      sinon.stub(Person, "findByIdAndDelete").resolves(mockPerson);

      const deletedPerson = await deletePerson(mockId);

      assert(deletedPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Person, "findByIdAndDelete").resolves(null);

      const deletedPerson = await deletePerson(mockId);

      assert.strictEqual(deletedPerson, null);
    });
  });
});
