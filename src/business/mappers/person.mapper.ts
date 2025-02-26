import { Request } from "express";
import { Person } from "../../domain/models/person.model";
import { IEducation } from "../../domain/interfaces/secondary/iEducation.interface";
import { IWorkExperience } from "../../domain/interfaces/secondary/iWorkExperience.interface";
import { ITask } from "../../domain/interfaces/secondary/iTask.interface";

export const reqBodyToPerson = function (req: Request) {
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
        startingDate: startingDate,
        graduationDate: graduationDate,
        isOngoing: isOngoing,
      };

      person.education.push(singleEduRecord);
    });
  }
};
