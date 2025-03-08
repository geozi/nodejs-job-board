/**
 * User mapper.
 * @module src/business/mappers/user.mapper
 */
import { Request } from "express";
import bcrypt from "bcryptjs";
import { RoleType } from "../../domain/enums/roleType.enum";
import { User } from "../../domain/models/user.model";
import { IUserUpdate } from "../interfaces/iUserUpdate.interface";
import { IUser } from "../../domain/interfaces/documents/iUser.interface";
import { Types } from "mongoose";

/**
 * Maps an HTTP request body to an {@link IUser} object.
 *
 * @param {Request} req - An HTTP request.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object.
 */
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

/**
 * Maps an HTTP request body to an {@link IUserUpdate} object.
 *
 * @param {Request} req - An HTTP request.
 * @returns {Promise<IUserUpdate>} A promise that resolves to an {@link IUserUpdate} object.
 */
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

/**
 * Maps an HTTP request body to a {@link RoleType} enum.
 *
 * @param {Request} req - An HTTP request.
 * @returns {RoleType} A {@link RoleType} enum
 */
export const reqBodyToRole = (req: Request): RoleType => {
  const { role } = req.body;

  if (role === RoleType.Admin.toString()) {
    return RoleType.Admin;
  } else {
    return RoleType.User;
  }
};
