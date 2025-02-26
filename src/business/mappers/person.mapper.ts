import { Request } from "express";
import { Person } from "../../domain/models/person.model";
import { IEducation } from "../../domain/interfaces/secondary/iEducation.interface";
import { IWorkExperience } from "../../domain/interfaces/secondary/iWorkExperience.interface";
import { Types } from "mongoose";
import { IPerson } from "../../domain/interfaces/documents/iPerson.interface";
import { IPersonUpdate } from "../interfaces/iPersonUpdate.interface";

export const reqBodyToPerson = function (req: Request): IPerson {
  const {
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    education,
    workExperience,
    username,
  } = req.body;

  const person = new Person({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: address,
    dateOfBirth: new Date(dateOfBirth),
    username: username,
  });

  if (education.length !== 0) {
    education.forEach((edu: any) => {
      const {
        degreeTitle,
        institution,
        startingDate,
        graduationDate,
        isOngoing,
      } = edu;

      const singleEduRecord: IEducation = {
        degreeTitle: degreeTitle,
        institution: institution,
        startingDate: new Date(startingDate),
        graduationDate: new Date(graduationDate),
        isOngoing: new Boolean(isOngoing),
      };

      person.education.push(singleEduRecord);
    });
  }

  if (workExperience.length !== 0) {
    workExperience.forEach((workExp: any) => {
      const {
        jobTitle,
        organizationName,
        city,
        country,
        startingDate,
        endingDate,
        isOngoing,
        tasks,
      } = workExp;

      const singleWorkExpRecord: IWorkExperience = {
        jobTitle: jobTitle,
        organizationName: organizationName,
        city: city,
        country: country,
        startingDate: new Date(startingDate),
        endingDate: new Date(endingDate),
        isOngoing: new Boolean(isOngoing),
        tasks: tasks,
      };

      person.workExperience.push(singleWorkExpRecord);
    });
  }

  return person;
};

export const reqBodyToPersonUpdate = function (req: Request): IPersonUpdate {
  const {
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    education,
    workExperience,
    username,
  } = req.body;

  const person: IPersonUpdate = {
    id: new Types.ObjectId(id),
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: address,
    dateOfBirth: new Date(dateOfBirth),
    username: username,
  };

  let helperArray: any[] = [];
  if (education && education.length !== 0) {
    education.forEach((edu: any) => {
      const {
        degreeTitle,
        institution,
        startingDate,
        graduationDate,
        isOngoing,
      } = edu;

      const singleEduRecord: IEducation = {
        degreeTitle: degreeTitle,
        institution: institution,
        startingDate: new Date(startingDate),
        graduationDate: new Date(graduationDate),
        isOngoing: new Boolean(isOngoing),
      };

      helperArray.push(singleEduRecord);
    });
  }

  person.education = helperArray;

  helperArray = [];
  if (workExperience && workExperience.length !== 0) {
    workExperience.forEach((workExp: any) => {
      const {
        jobTitle,
        organizationName,
        city,
        country,
        startingDate,
        endingDate,
        isOngoing,
        tasks,
      } = workExp;

      const singleWorkExpRecord: IWorkExperience = {
        jobTitle: jobTitle,
        organizationName: organizationName,
        city: city,
        country: country,
        startingDate: new Date(startingDate),
        endingDate: new Date(endingDate),
        isOngoing: new Boolean(isOngoing),
        tasks: tasks,
      };

      helperArray.push(singleWorkExpRecord);
    });
  }

  person.workExperience = helperArray;

  return person;
};
