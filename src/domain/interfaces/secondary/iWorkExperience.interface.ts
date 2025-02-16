import { ITask } from "./iTask.interface";

export interface IWorkExperience {
  jobTitle: string;
  organizationName: string;
  city: string;
  country?: string;
  startingDate: Date;
  endingDate?: Date;
  isOngoing: boolean;
  tasks?: ITask[];
}
