import { Types } from "mongoose";
import { RoleType } from "../../domain/enums/roleType.enum";

export interface IUserUpdate {
  id: Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  role?: RoleType;
}
