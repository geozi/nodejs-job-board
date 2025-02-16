import { Document } from "mongoose";
import { EmploymentType } from "../../enums/employmentType.enum";
import { WorkType } from "../../enums/workType.enum";
import { ExperienceLevelType } from "../../enums/experienceLevelType.enum";

export interface IListing extends Document {
  title: string;
  organizationName: string;
  datePosted: Date;
  workType: WorkType;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevelType;
  city: string;
  country: string;
  description: string;
  salaryRange?: string;
}
