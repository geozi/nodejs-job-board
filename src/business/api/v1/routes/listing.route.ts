/**
 * Listing routes.
 * @module src/business/apis/v1/routes/listing.route
 */
import { Router } from "express";
import {
  retrievalByEmploymentTypeMiddlewareArray,
  retrievalByExperienceLevelMiddlewareArray,
  retrievalByIdMiddlewareArray,
  retrievalByStatusMiddlewareArray,
  retrievalByWorkTypeMiddlewareArray,
} from "../controllers/listing.controller";

export const listingRouter = Router();
listingRouter.get("/status", retrievalByStatusMiddlewareArray);
listingRouter.get("/workType", retrievalByWorkTypeMiddlewareArray);
listingRouter.get("/employmentType", retrievalByEmploymentTypeMiddlewareArray);
listingRouter.get(
  "/experienceLevel",
  retrievalByExperienceLevelMiddlewareArray
);
listingRouter.get("/", retrievalByIdMiddlewareArray);
