import sinon, { SinonStub } from "sinon";
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
  let functionStub: SinonStub;

  describe(`${getPersonByUsername.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findOne");
    });

    it("Promise resolves to Person object", async () => {
      functionStub.resolves(mockPerson);

      const foundPerson = await getPersonByUsername(validPersonInput.username);

      assert(foundPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const foundPerson = await getPersonByUsername(validPersonInput.username);

      assert.strictEqual(foundPerson, null);
    });
  });

  describe(`${addPerson.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person.prototype, "save");
    });

    it("Promise resolves to Person object", async () => {
      functionStub.resolves(mockPerson);

      const newPerson = new Person(validPersonInput);
      const savedPerson = await addPerson(newPerson);

      assert(savedPerson instanceof Person);
    });
  });

  describe(`${updatePerson.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndUpdate");
    });

    it("Promise resolves to Person object", async () => {
      functionStub.resolves(mockPerson);

      const updatedPerson = await updatePerson(mockUpdateObj);

      assert(updatedPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const updatedPerson = await updatePerson(mockUpdateObj);

      assert.strictEqual(updatedPerson, null);
    });
  });

  describe(`${deletePerson.name}`, () => {
    beforeEach(() => {
      sinon.restore();
      functionStub = sinon.stub(Person, "findByIdAndDelete");
    });

    it("Promise resolves to Person object", async () => {
      functionStub.resolves(mockPerson);

      const deletedPerson = await deletePerson(mockId);

      assert(deletedPerson instanceof Person);
    });

    it("Promise resolves to null", async () => {
      functionStub.resolves(null);

      const deletedPerson = await deletePerson(mockId);

      assert.strictEqual(deletedPerson, null);
    });
  });
});
