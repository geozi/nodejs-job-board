/**
 * User repository.
 * @module src/persistence/user.repository
 */
import { User } from "domain/models/user.model";
import { IUser } from "domain/interfaces/documents/iUser.interface";
import { RoleType } from "domain/enums/roleType.enum";
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IUserUpdate } from "business/interfaces/iUserUpdate.interface";

/**
 * Returns a user with the specified username.
 *
 * @param {string} username - The username of a user.
 * @returns {Promise<IUser | null>} A promise that resolves to an {@link IUser} object or null.
 */
export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ username: username });

  appLogger.info(
    `User repository: ${getUserByUsername.name} called successfully`
  );

  return requestedUser;
};

/**
 * Returns a user with the specified email.
 *
 * @param {string} email - The email of a user.
 * @returns {Promise<IUser | null>} A promise that resolves to an {@link IUser} object or null.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ email: email });

  appLogger.info(`User repository: ${getUserByEmail.name} called successfully`);

  return requestedUser;
};

/**
 * Returns an array of users with the specified role.
 *
 * @param {RoleType} role - A role assigned to users.
 * @returns {Promise<Array<IUser>>} An array of {@link IUser} objects or an empty array.
 */
export const getUsersByRole = async (role: RoleType): Promise<Array<IUser>> => {
  const requestedUsers = await User.find({ role: role });

  appLogger.info(`User repository: ${getUsersByRole.name} called successfully`);

  return requestedUsers;
};

export const addUser = async (newUser: IUser): Promise<IUser> => {
  const savedUser = await newUser.save();

  appLogger.info(`User repository: ${addUser.name} called successfully`);

  return savedUser;
};

/**
 * Updates the information of an existing user in the database.
 *
 * @param {IUserUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IUser | null>} A promise that resolves to an {@link IUser} object representing the updated document or null.
 */
export const updateUser = async (
  updateDataObj: IUserUpdate
): Promise<IUser | null> => {
  const { id, username, email, password } = { ...updateDataObj };

  const userToUpdate = {
    username: username,
    email: email,
    password: password,
  };

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(`User repository: ${updateUser.name} called successfully`);

  return updatedUser;
};

/**
 * Deletes the information of a user.
 *
 * @param {Types.ObjectId} id - The ID of a user.
 * @returns {Promise<IUser | null>} A promise that resolves to an {@link IUser} object representing the deleted document or null.
 */
export const deleteUser = async (id: Types.ObjectId): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id);

  appLogger.info(`User repository: ${deleteUser.name} called successfully`);

  return deletedUser;
};
