import { Application } from "../domain/models/application.model";
import { IApplication } from "../domain/interfaces/documents/iApplication.interface";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";

export const getApplicationByPersonId = async (
  personId: Types.ObjectId
): Promise<IApplication | null> => {
  const requestedApplication = await Application.findOne({
    personId: personId,
  });

  appLogger.info(
    `Application repository: ${getApplicationByPersonId.name} called successfully`
  );

  return requestedApplication;
};

export const getApplicationsByListingId = async (
  listingId: Types.ObjectId
): Promise<Array<IApplication>> => {
  const requestedApplications = await Application.find({
    listingId: listingId,
  });

  appLogger.info(
    `Application repository: ${getApplicationsByListingId.name} called successfully`
  );

  return requestedApplications;
};

export const addApplication = async (
  newApplication: IApplication
): Promise<IApplication> => {
  const savedApplication = newApplication.save();

  appLogger.info(
    `Application repository: ${addApplication.name} called successfully`
  );

  return savedApplication;
};

export const deleteApplicationById = async (
  id: Types.ObjectId
): Promise<IApplication | null> => {
  const deletedApplication = Application.findByIdAndDelete(id);

  appLogger.info(
    `Application repository: ${deleteApplicationById.name} called successfully`
  );

  return deletedApplication;
};

export const deleteApplicationByPersonId = async (
  personId: Types.ObjectId
): Promise<IApplication | null> => {
  const deletedApplication = Application.findByIdAndDelete(personId);

  appLogger.info(
    `Application repository: ${deleteApplicationByPersonId.name} called successfully`
  );

  return deletedApplication;
};
