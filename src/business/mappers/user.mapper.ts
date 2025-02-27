import { Request } from "express";
import bcrypt from "bcryptjs";
import { RoleType } from "../../domain/enums/roleType.enum";
import { User } from "../../domain/models/user.model";
import { IUserUpdate } from "../interfaces/IUserUpdate.interface";
import { IUser } from "../../domain/interfaces/documents/iUser.interface";
import { Types } from "mongoose";

export const reqBodyToUser = async (req: Request): Promise<IUser> => {
  const { username, email, password, role } = req.body;
  const user = new User({
    username: username,
    email: email,
  });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  switch (role) {
    case RoleType.Admin.toString():
      user.role = RoleType.Admin;
      break;
    case RoleType.User.toString():
      user.role = RoleType.User;
      break;
  }

  return user;
};

export const reqBodyToUserUpdate = async (
  req: Request
): Promise<IUserUpdate> => {
  const { id, username, email, password } = req.body;

  const userToUpdate: IUserUpdate = {
    id: new Types.ObjectId(id),
    username: username,
    email: email,
  };

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  userToUpdate.password = hashedPassword;

  return userToUpdate;
};
