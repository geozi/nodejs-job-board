/**
 * IApplication interface.
 * @module src/domain/interfaces/documents/iApplication.interface
 */
import { Document, Types } from "mongoose";

/**
 * Represents a user application.
 *
 * @interface
 * @extends {Document}
 * @property {Types.ObjectId} personId - The ID of the applicant.
 * @property {Types.ObjectId} listingId - The ID of the job listing.
 */
export interface IApplication extends Document {
  /**
   * The ID of the applicant.
   * @type {string}
   */
  personId: Types.ObjectId;

  /**
   * The ID of the job listing.
   * @type {string}
   */
  listingId: Types.ObjectId;
}
