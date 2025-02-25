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
import { UniqueConstraintError } from "../errors/uniqueConstraintError.class";

export const retrievePersonInfoByUsername = async (
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

      throw new UniqueConstraintError(error.message);
    }

    appLogger.error(
      `Person service: ${createPersonInfo.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const bringPersonInfoToDate = async (
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

export const removePersonInfo = async (
  id: Types.ObjectId
): Promise<IPerson | null> => {
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
