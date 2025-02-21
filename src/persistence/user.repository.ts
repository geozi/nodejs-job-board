import { User } from "../domain/models/user.model";
import { IUser } from "../domain/interfaces/documents/iUser.interface";
import { RoleType } from "../domain/enums/roleType.enum";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ username: username });
  appLogger.info(`User repository: ${User.find.name} called successfully`);
  return requestedUser;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ email: email });
  appLogger.info(`User repository: ${User.find.name} called successfully`);
  return requestedUser;
};

export const getUsersByRole = async (role: RoleType): Promise<Array<IUser>> => {
  const requestedUsers = await User.find({ role: role });
  appLogger.info(`User repository: ${User.find.name} called successfully`);
  return requestedUsers;
};

export const addUser = async (newUser: IUser): Promise<IUser> => {
  const savedUser = await newUser.save();
  appLogger.info(`User repository: ${newUser.save.name} called successfully`);
  return savedUser;
};
