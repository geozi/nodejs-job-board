import { Document } from "mongoose";
import { RoleType } from "../../enums/roleType.enum";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: RoleType;
}
