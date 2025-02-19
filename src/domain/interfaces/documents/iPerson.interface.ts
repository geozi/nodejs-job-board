import { Document, Schema } from "mongoose";

export interface IPerson extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth?: Schema.Types.Date;
  education: Schema.Types.Mixed[];
  workExperience: Schema.Types.Mixed[];
  username: string;
}
