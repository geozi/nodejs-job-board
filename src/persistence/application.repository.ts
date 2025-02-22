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
