/**
 * Person repository.
 * @module src/persistence/person.repository
 */
import { Person } from "../domain/models/person.model";
import { IPerson } from "../domain/interfaces/documents/iPerson.interface";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IPersonUpdate } from "../business/interfaces/iPersonUpdate.interface";

/**
 * Returns a person with the specified username.
 *
 * @param {string} username The username of a person.
 * @returns {Promise<IPerson | null>} A promise that resolves to a Person object or null.
 */
export const getPersonByUsername = async (
  username: string
): Promise<IPerson | null> => {
  const requestedPerson = await Person.findOne({ username: username });

  appLogger.info(
    `Person repository: ${getPersonByUsername.name} called successfully`
  );

  return requestedPerson;
};

/**
 * Adds a person to database.
 *
 * @param {IPerson} newPerson - The new person to be persisted.
 * @returns {Promise<IPerson>} A promise that resolves to a Person object.
 */
export const addPerson = async (newPerson: IPerson): Promise<IPerson> => {
  const savedPerson = await newPerson.save();

  appLogger.info(`Person repository: ${addPerson.name} called successfully`);

  return savedPerson;
};

/**
 * Updates the information of an existing person in the database.
 *
 * @param {IPersonUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IPerson | null>} A promise that resolves to a Person object representing the updated document or null.
 */
export const updatePerson = async (
  updateDataObj: IPersonUpdate
): Promise<IPerson | null> => {
  const {
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    education,
    workExperience,
    username,
  } = { ...updateDataObj };

  const personToUpdate = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: address,
    dateOfBirth: dateOfBirth,
    education: education,
    workExperience: workExperience,
    username: username,
  };

  const updatedPerson = await Person.findByIdAndUpdate(id, personToUpdate, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(`Person repository: ${updatePerson.name} called successfully`);

  return updatedPerson;
};

/**
 * Deletes the information of a person.
 *
 * @param {Types.ObjectId} id The ID of a person.
 * @returns {Promise<IPerson | null>} A promise that resolves to a Person object representing the deleted document or null.
 */
export const deletePerson = async (
  id: Types.ObjectId
): Promise<IPerson | null> => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  appLogger.info(`Person repository: ${deletePerson.name} called successfully`);

  return deletedPerson;
};
