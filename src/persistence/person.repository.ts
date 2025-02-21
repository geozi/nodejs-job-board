import { Person } from "../domain/models/person.model";
import { IPerson } from "../domain/interfaces/documents/iPerson.interface";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IPersonUpdate } from "../business/interfaces/iPersonUpdate.interface";

export const getPersonByUsername = async (
  username: string
): Promise<IPerson | null> => {
  const requestedPerson = await Person.findOne({ username: username });

  appLogger.info(`Person repository: ${Person.find.name} called successfully`);

  return requestedPerson;
};

export const addPerson = async (newPerson: IPerson): Promise<IPerson> => {
  const savedPerson = await newPerson.save();

  appLogger.info(
    `Person repository: ${savedPerson.save.name} called successfully`
  );

  return savedPerson;
};

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

  appLogger.info(`Person repository: findByIdAndUpdate called successfully`);

  return updatedPerson;
};

export const deletePerson = async (
  id: Types.ObjectId
): Promise<IPerson | null> => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  appLogger.info(`Person repository: findByIdAndDelete called successfully`);

  return deletedPerson;
};
