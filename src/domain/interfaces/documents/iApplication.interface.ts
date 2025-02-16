import { Document, Types } from "mongoose";

export interface IApplication extends Document {
  personId: Types.ObjectId;
  listingId: Types.ObjectId;
}
