/**
 * Application mapper.
 * @module src/business/mappers/application.mapper
 */
import { Request } from "express";
import { Application } from "../../domain/models/application.model";
import { Types } from "mongoose";
import { IApplication } from "../../domain/interfaces/documents/iApplication.interface";
import { IRequest } from "business/interfaces/iRequest.interface";
import { retrievePersonInfoByUsername } from "service/person.service";

/**
 * Maps an HTTP request body to an {@link IApplication} object.
 *
 * @param {IRequest} req - An HTTP request.
 * @returns {Promise<IApplication>} A promise that resolves to an {@link IApplication} object.
 */
export const reqBodyToApplication = async function (
  req: IRequest
): Promise<IApplication> {
  const username = req.user.username;
  const person = await retrievePersonInfoByUsername(username);

  const { listingId } = req.body;

  const application = new Application({
    personId: person._id,
    listingId: new Types.ObjectId(listingId),
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
 * @param {IRequest} req - An HTTP request.
 * @returns {Promise<object>} A promise that resolves to an object containing person and listing IDs.
 */
export const reqBodyToUniqueIndex = async function (req: IRequest): Promise<{
  personId: Types.ObjectId;
  listingId: Types.ObjectId;
}> {
  const username = req.user.username;
  const person = await retrievePersonInfoByUsername(username);

  const { listingId } = req.body;
  return {
    personId: person._id,
    listingId: new Types.ObjectId(listingId),
  };
};
