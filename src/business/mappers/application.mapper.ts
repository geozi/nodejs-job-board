/**
 * Application mapper.
 * @module src/business/mappers/application.mapper
 */
import { Request } from "express";
import { Application } from "../../domain/models/application.model";
import { Types } from "mongoose";
import { IApplication } from "../../domain/interfaces/documents/iApplication.interface";

/**
 * Maps an HTTP request body to an {@link IApplication} object.
 *
 * @param {Request} req - An HTTP request.
 * @returns {IApplication} An {@link IApplication} object.
 */
export const reqBodyToApplication = function (req: Request): IApplication {
  const { personId, listingId } = req.body;

  const application = new Application({
    personId: new Types.ObjectId(personId),
    listingID: new Types.ObjectId(listingId),
  });

  return application;
};

/**
 * Maps an HTTP request body to an application ID.
 *
 * @param {Request} req - An HTTP request.
 * @returns {Types.ObjectId} An application ID.
 */
export const reqBodyToApplicationId = function (req: Request): Types.ObjectId {
  const { id } = req.body;
  return new Types.ObjectId(id);
};

/**
 * Maps an HTTP request body to an object containing person and listing IDs.
 *
 * @param {Request} req - An HTTP request.
 * @returns {object} An object containing person and listing IDs.
 */
export const reqBodyToUniqueIndex = function (req: Request): {
  personId: Types.ObjectId;
  listingId: Types.ObjectId;
} {
  const { personId, listingId } = req.body;
  return {
    personId: new Types.ObjectId(personId),
    listingId: new Types.ObjectId(listingId),
  };
};
