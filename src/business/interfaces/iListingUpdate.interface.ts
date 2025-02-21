import { Types } from "mongoose";
import { WorkType } from "../../domain/enums/workType.enum";
import { EmploymentType } from "../../domain/enums/employmentType.enum";
import { ExperienceLevelType } from "../../domain/enums/experienceLevelType.enum";
import { ISalaryRange } from "../../domain/interfaces/secondary/iSalaryRange.interface";

export interface IListingUpdate {
  id: Types.ObjectId;
  title?: string;
  organizationName?: string;
  datePosted?: Date;
  workType?: WorkType;
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevelType;
  city?: string;
  country?: string;
  listingDesc?: string;
  salaryRange?: ISalaryRange;
}
