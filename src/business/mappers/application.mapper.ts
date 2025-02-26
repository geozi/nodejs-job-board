import { Request } from "express";
import { Application } from "../../domain/models/application.model";
import { Types } from "mongoose";
import { IApplication } from "../../domain/interfaces/documents/iApplication.interface";

export const reqBodyToApplication = function (req: Request): IApplication {
  const { personId, listingId } = req.body;

  const application = new Application({
    personId: new Types.ObjectId(personId),
    listingID: new Types.ObjectId(listingId),
  });

  return application;
};

export const reqBodyToApplicationId = function (req: Request) {
  const { id } = req.body;
  return new Types.ObjectId(id);
};
