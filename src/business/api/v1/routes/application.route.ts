/**
 * Application routes.
 * @module src/business/apis/v1/routes/application.route
 */
import { Router } from "express";
import {
  applicationCreationMiddlewareArray,
  retrievalByListingIdMiddlewareArray,
  retrievalByPersonIdMiddlewareArray,
  retrievalByUniqueIndexMiddlewareArray,
} from "../controllers/application.controller";

export const applicationRouter = Router();
applicationRouter.post("/", applicationCreationMiddlewareArray);
applicationRouter.get("/personId", retrievalByPersonIdMiddlewareArray);
applicationRouter.get("/listingId", retrievalByListingIdMiddlewareArray);
applicationRouter.get("/uniqueIndex", retrievalByUniqueIndexMiddlewareArray);
