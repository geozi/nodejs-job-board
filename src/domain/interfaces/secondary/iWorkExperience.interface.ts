import { Schema } from "mongoose";
import { ITask } from "./iTask.interface";

export interface IWorkExperience {
  jobTitle: string;
  organizationName: string;
  city: string;
  country?: string;
  startingDate: Schema.Types.Date;
  endingDate?: Schema.Types.Date;
  isOngoing: Schema.Types.Boolean;
  tasks?: ITask[];
}
