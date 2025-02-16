import { Document } from "mongoose";
import { IEducation } from "../secondary/iEducation.interface";
import { IWorkExperience } from "../secondary/iWorkExperience.interface";

export interface IPerson extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth?: Date;
  education: IEducation[];
  workExperience: IWorkExperience[];
  username: string;
}
