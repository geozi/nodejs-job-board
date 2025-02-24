import { Error, Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IPerson } from "../domain/interfaces/documents/iPerson.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { ServerError } from "../errors/serverError.class";
import {
  addPerson,
  deletePerson,
  getPersonByUsername,
  updatePerson,
} from "../persistence/person.repository";
import { commonServiceMessages } from "./messages/commonService.message";
import { personServiceMessages } from "./messages/personService.message";
import { IPersonUpdate } from "../business/interfaces/iPersonUpdate.interface";

export const retrievePersonProfileByUsername = async (
  username: string
): Promise<IPerson | null> => {
  try {
    const person = await getPersonByUsername(username);

    if (person === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return person;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${retrievePersonProfileByUsername.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${retrievePersonProfileByUsername.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const createPersonProfile = async (
  newPerson: IPerson
): Promise<IPerson> => {
  try {
    return await addPerson(newPerson);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      appLogger.error(
        `Person service: ${createPersonProfile.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${createPersonProfile.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const bringPersonProfileToDate = async (
  updateDataObj: IPersonUpdate
): Promise<IPerson | null> => {
  try {
    const updatedPerson = await updatePerson(updateDataObj);
    if (updatedPerson === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return updatedPerson;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${bringPersonProfileToDate.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${bringPersonProfileToDate.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const deletePersonProfile = async (
  id: Types.ObjectId
): Promise<IPerson | null> => {
  try {
    const deletedPerson = await deletePerson(id);

    if (deletedPerson === null) {
      throw new NotFoundError(personServiceMessages.PERSON_NOT_FOUND);
    }

    return deletedPerson;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Person service: ${deletePersonProfile.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `Person service: ${deletePersonProfile.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
