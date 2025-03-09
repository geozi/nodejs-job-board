/**
 * Application routes.
 * @module src/business/apis/v1/routes/application.route
 */
import { Router } from "express";
import {
  applicationCreationMiddlewareArray,
  retrievalByListingIdMiddlewareArray,
  retrievalByUniqueIndexMiddlewareArray,
  callApplicationRetrievalByPersonId,
  removalByIdMiddlewareArray,
} from "../controllers/application.controller";

export const applicationRouter = Router();
applicationRouter.post("/", applicationCreationMiddlewareArray);
applicationRouter.get("/personId", callApplicationRetrievalByPersonId);
applicationRouter.get("/listingId", retrievalByListingIdMiddlewareArray);
applicationRouter.get("/uniqueIndex", retrievalByUniqueIndexMiddlewareArray);
applicationRouter.delete("/", removalByIdMiddlewareArray);
