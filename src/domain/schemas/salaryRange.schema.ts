import { Schema } from "mongoose";
import { ISalaryRange } from "../interfaces/secondary/iSalaryRange.interface";
import { salaryRangeFailedValidation } from "../messages/salaryRangeValidation.message";

export const salaryRangeSchema = new Schema<ISalaryRange>({
  minAmount: {
    type: Number,
    required: [true, salaryRangeFailedValidation.MIN_AMOUNT_REQUIRED_MESSAGE],
    validate: [
      {
        validator: function (value: any) {
          return !Number.isNaN(Number(value));
        },
        message: salaryRangeFailedValidation.MIN_AMOUNT_INVALID_MESSAGE,
      },
      {
        validator: function (value: any) {
          return value > 0;
        },
        message: salaryRangeFailedValidation.MIN_AMOUNT_NEGATIVE_MESSAGE,
      },
    ],
  },
  maxAmount: {
    type: Number,
    required: [true, salaryRangeFailedValidation.MAX_AMOUNT_REQUIRED_MESSAGE],
    validate: [
      {
        validator: function (value: any) {
          return !Number.isNaN(Number(value));
        },
        message: salaryRangeFailedValidation.MAX_AMOUNT_INVALID_MESSAGE,
      },
      {
        validator: function (value: any) {
          return value > 0;
        },
        message: salaryRangeFailedValidation.MAX_AMOUNT_NEGATIVE_MESSAGE,
      },
    ],
  },
});
