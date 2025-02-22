import { Application } from "../domain/models/application.model";
import { IApplication } from "../domain/interfaces/documents/iApplication.interface";
import { ModifyResult, Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";

export const getApplicationsByPersonId = async (
  personId: Types.ObjectId
): Promise<Array<IApplication>> => {
  const requestedApplications = await Application.find({
    personId: personId,
  });

  appLogger.info(
    `Application repository: ${getApplicationsByPersonId.name} called successfully`
  );

  return requestedApplications;
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

export const getApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication | null> => {
  const requestedApplication = Application.findOne({
    personId: personId,
    listingId: listingId,
  });

  appLogger.info(
    `Application repository: ${getApplicationByUniqueIndex.name} called successfully`
  );

  return requestedApplication;
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

export const deleteApplicationByUniqueIndex = async (
  personId: Types.ObjectId,
  listingId: Types.ObjectId
): Promise<IApplication | null> => {
  const deletedResult: ModifyResult<IApplication> | null =
    await Application.findOneAndDelete({
      personId: personId,
      listingId: listingId,
    });

  const deletedApplication: IApplication | null = deletedResult
    ? deletedResult.value
    : null;

  appLogger.info(
    `Application repository: ${deleteApplicationByUniqueIndex.name} called successfully`
  );

  return deletedApplication;
};
