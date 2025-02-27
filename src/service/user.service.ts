/**
 * User service.
 * @module src/service/user.service
 */
import { Error, Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { RoleType } from "../domain/enums/roleType.enum";
import { IUser } from "../domain/interfaces/documents/iUser.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { ServerError } from "../errors/serverError.class";
import {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
  getUsersByRole,
  updateUser,
} from "../persistence/user.repository";
import { commonServiceMessages } from "./messages/commonService.message";
import { userServiceMessages } from "./messages/userService.message";
import { UniqueConstraintError } from "../errors/uniqueConstraintError.class";
import { IUserUpdate } from "../business/interfaces/iUserUpdate.interface";

/**
 * Calls on the persistence layer to retrieve the user with the specified username.
 *
 * @param {string} username - The username of the user.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const retrieveUserByUsername = async (
  username: string
): Promise<IUser> => {
  try {
    const retrievedUser = await getUserByUsername(username);

    if (retrievedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return retrievedUser;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: ${retrieveUserByUsername.name} -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: ${retrieveUserByUsername.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user with the specified email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const retrieveUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const retrievedUser = await getUserByEmail(email);

    if (retrievedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return retrievedUser;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: ${retrieveUserByEmail.name} -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: ${retrieveUserByEmail.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the users with the specified role.
 *
 * @param {RoleType} role - A role assigned to users.
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of IUser objects.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const retrieveUsersByRole = async (
  role: RoleType
): Promise<Array<IUser>> => {
  try {
    const retrievedUsers = await getUsersByRole(role);

    if (retrievedUsers.length === 0) {
      throw new NotFoundError(userServiceMessages.USERS_NOT_FOUND);
    }

    return retrievedUsers;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: ${retrieveUsersByRole.name} -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: ${retrieveUsersByRole.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new user profile to database.
 *
 * @param {IUser} newUser - The new user profile to be persisted.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object representing the newly added user profile.
 * @throws - {@link UniqueConstraintError} | {@link ServerError}
 */
export const createUser = async (newUser: IUser): Promise<IUser> => {
  try {
    return await addUser(newUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      appLogger.error(
        `User service: ${createUser.name} -> ${error.name} detected and re-thrown`
      );

      throw new UniqueConstraintError(error.message);
    }

    appLogger.error(
      `User service: ${createUser.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update the profile of an existing user.
 *
 * @param {IUserUpdate} updateDataObj - The new information to be persisted.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object representing the updated user profile.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const bringUserToDate = async (
  updateDataObj: IUserUpdate
): Promise<IUser> => {
  try {
    const updatedUser = await updateUser(updateDataObj);

    if (updatedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: ${bringUserToDate.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `User service: ${bringUserToDate.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to remove a user profile from database.
 *
 * @param {Types.ObjectId} id - The ID assigned to the user profile.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object representing the removed user profile.
 * @throws - {@link NotFoundError} | {@link ServerError}
 */
export const removeUser = async (id: Types.ObjectId): Promise<IUser> => {
  try {
    const removedUser = await deleteUser(id);

    if (removedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return removedUser;
  } catch (error) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: ${removeUser.name} -> ${error.name} detected and re-thrown`
      );

      throw error;
    }

    appLogger.error(
      `User service: ${removeUser.name} -> ServerError detected and re-thrown`
    );

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
