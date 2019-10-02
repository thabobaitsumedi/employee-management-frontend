import { Guid } from 'guid-typescript';

export class Employee {
    employeeId: Guid;
    firstName: string;
    lastName: string;
    doB: Date;
    phoneNumber: string;
    emailAddress: string;
    genderId: number;
    genderDescription: string;
    hireDate: Date;
    managerId: number;
    managerName: string;
    jobId: number;
    jobTitle: string;
    departmentId: number;
    departmentName: string;
    addressId: number;
}
