/**
 * Person service.
 * @module src/service/person.service
 */
import { Error, Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IPerson } from "domain/interfaces/documents/iPerson.interface";
import { NotFoundError } from "errors/notFoundError.class";
import { ServerError } from "errors/serverError.class";
import {
  addPerson,
  deletePerson,
  getPersonByUsername,
  updatePerson,
} from "persistence/person.repository";
import { commonServiceMessages } from "./messages/commonService.message";
import { personServiceMessages } from "./messages/personService.message";
import { IPersonUpdate } from "business/interfaces/iPersonUpdate.interface";

/**
 * Calls on the persistence layer to retrieve a person's information with the specified username.
 *
 * @param {string} username - The username of the person.
 * @returns {Promise<IPerson>} A promise that resolves to an IPerson object.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const retrievePersonInfoByUsername = async (
  username: string
): Promise<IPerson> => {
  try {
    const person = await getPersonByUsername(username);

    if (person === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return person;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${retrievePersonInfoByUsername.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${retrievePersonInfoByUsername.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add the information of a new person to database.
 *
 * @param {IPerson} newPerson - The new person to be persisted.
 * @returns {Promise<IPerson>} A promise that resolves to an {@link IPerson} object representing the newly added person.
 * @throws - {@link https://mongoosejs.com/docs/api/error.html#Error.ValidationError} | {@link ServerError}
 */
export const createPersonInfo = async (
  newPerson: IPerson
): Promise<IPerson> => {
  try {
    return await addPerson(newPerson);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      appLogger.error(
        `Person service: ${createPersonInfo.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${createPersonInfo.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update the information of an existing person in the database.
 *
 * @param {IPersonUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IPerson>} A promise that resolves to an {@link IPerson} object representing the updated information of a person.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const bringPersonInfoToDate = async (
  updateDataObj: IPersonUpdate
): Promise<IPerson> => {
  try {
    const updatedPerson = await updatePerson(updateDataObj);
    if (updatedPerson === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return updatedPerson;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${bringPersonInfoToDate.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${bringPersonInfoToDate.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to remove the information of an existing person in the database.
 *
 * @param {Types.ObjectId} id - The ID assigned to the person.
 * @returns {Promise<IPerson>} A promise that resolves to an {@link IPerson} object representing the removed information of a person.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const removePersonInfo = async (
  id: Types.ObjectId
): Promise<IPerson> => {
  try {
    const removedPersonProfile = await deletePerson(id);

    if (removedPersonProfile === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return removedPersonProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${removePersonInfo.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${removePersonInfo.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
