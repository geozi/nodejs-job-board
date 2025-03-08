/**
 * Admin routes.
 * @module src/business/apis/v1/routes/admin.route
 */
import { Router } from "express";
import {
  listingCreationMiddlewareArray,
  listingUpdateMiddlewareArray,
} from "../controllers/listing.controller";
import { retrievalByRoleMiddlewareArray } from "../controllers/user.controller";
import { removalByIdMiddlewareArray } from "../controllers/application.controller";

export const adminRouter = Router();
adminRouter.post("/listings", listingCreationMiddlewareArray);
adminRouter.put("/listings", listingUpdateMiddlewareArray);
adminRouter.get("/users", retrievalByRoleMiddlewareArray);
adminRouter.delete("/applications", removalByIdMiddlewareArray);
