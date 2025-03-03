import { Types } from "mongoose";
import { Request } from "express";

export const reqBodyToId = (req: Request): Types.ObjectId => {
  const { id } = req.body;
  return new Types.ObjectId(id);
};
