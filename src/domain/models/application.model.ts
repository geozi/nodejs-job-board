/**
 * Application model schema.
 * @module src/domain/models/application.model
 */
import { Schema, model } from "mongoose";
import { IApplication } from "../interfaces/documents/iApplication.interface";
import { commonConstants } from "../constants/common.constant";
import { personFailedValidation } from "../messages/personValidation.message";
import { listingFailedValidation } from "../messages/listingValidation.message";
import { ID_REGEX } from "../resources/validationRegExp";

/**
 * Application schema for persistence in MongoDB.
 *
 * @type {Schema<IApplication>}
 * @property {Types.ObjectId} personId - The ID of the applicant.
 * @property {Types.ObjectId} listingId - The ID of the job listing.
 */
const applicationSchema = new Schema<IApplication>(
  {
    personId: {
      type: Schema.Types.ObjectId,
      required: [true, personFailedValidation.PERSON_ID_REQUIRED_MESSAGE],
      validate: {
        validator: function (value: any) {
          return value.length === commonConstants.MONGODB_ID_LENGTH;
        },
        message: personFailedValidation.PERSON_ID_OUT_OF_LENGTH_MESSAGE,
      },
      match: [ID_REGEX, personFailedValidation.PERSON_ID_INVALID_MESSAGE],
    },
    listingId: {
      type: Schema.Types.ObjectId,
      required: [true, listingFailedValidation.LISTING_ID_REQUIRED_MESSAGE],
      validate: {
        validator: function (value: any) {
          return value.length === commonConstants.MONGODB_ID_LENGTH;
        },
        message: listingFailedValidation.LISTING_ID_OUT_OF_LENGTH_MESSAGE,
      },
      match: [ID_REGEX, listingFailedValidation.LISTING_ID_INVALID_MESSAGE],
    },
  },
  {
    collection: "applications",
    timestamps: true,
  }
);

applicationSchema.index({ personId: 1, listingId: 1 }, { unique: true });

export const Application = model<IApplication>(
  "Application",
  applicationSchema
);
