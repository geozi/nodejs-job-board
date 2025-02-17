import { Schema } from "mongoose";

export interface IEducation {
  degreeTitle: string;
  institution: string;
  startingDate: Schema.Types.Date;
  graduationDate?: Schema.Types.Date;
  isOngoing: Schema.Types.Boolean;
}
