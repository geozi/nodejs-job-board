/**
 * Common mapper.
 * @module src/business/mappers/common.mapper
 */
import { Types } from "mongoose";
import { Request } from "express";

/**
 * Maps an HTTP request body to a Types.ObjectId.
 *
 * @param {Request} req - An HTTP request.
 * @returns {Types.ObjectId} A Types.ObjectId.
 */
export const reqBodyToId = (req: Request): Types.ObjectId => {
  const { id } = req.body;
  return new Types.ObjectId(id);
};
