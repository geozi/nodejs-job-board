/**
 * Admin routes.
 * @module src/business/apis/v1/routes/admin.route
 */
import { Router } from "express";
import {
  listingCreationMiddlewareArray,
  listingUpdateMiddlewareArray,
} from "../controllers/listing.controller";

export const adminRouter = Router();
adminRouter.post("/", listingCreationMiddlewareArray);
adminRouter.put("/", listingUpdateMiddlewareArray);
