import { Types, Schema } from "mongoose";

export interface IPersonUpdate {
  id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  education?: Schema.Types.Mixed[];
  workExperience?: Schema.Types.Mixed[];
  username?: string;
}
