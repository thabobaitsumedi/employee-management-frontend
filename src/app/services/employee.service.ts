import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Address } from '../models/address.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = 'https://localhost:44311/Employee/';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  AddEmployee(employee: Employee): Observable<Employee> {
    console.log(employee);
    return this.http.post<Employee>(baseUrl + 'AddEmployee', employee, httpOptions).pipe(
      tap(_ => console.log(`added new employee`)),
      catchError(this.handleError<Employee>('AddEmployee'))
    );
  }

  AddAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(baseUrl + 'AddAddress', address, httpOptions).pipe(
      tap(_ => console.log(`added new address`)),
      catchError(this.handleError<Address>('AddAddress'))
    );
  }

  UpdateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(baseUrl + 'UpdateEmployee', employee, httpOptions).pipe(
      tap(_ => console.log(`altered an employee id=${employee.firstName}`)),
      catchError(this.handleError<Employee>('UpdateEmployee'))
    );
  }

  UpdateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(baseUrl + 'UpdateAddress', address, httpOptions).pipe(
      tap(_ => console.log(`altered address id=${address.line1}`)),
      catchError(this.handleError<Address>('UpdateAddress'))
    );
  }

  DeleteEmployee(employeeId: Guid): Observable<Employee> {
    return this.http.delete<Employee>(baseUrl + 'DeleteEmployee/' + employeeId, httpOptions).pipe(
      tap(_ => console.log(`deleted employee`)),
      catchError(this.handleError<Employee>('DeleteEmployee'))
    );
  }

  GetAddressDetails(addressId: number): Observable<Address> {
    return this.http.get<Address>(baseUrl + 'GetAddressById/' + addressId, httpOptions).pipe(
      tap(_ => console.log(`fetched address`)),
      catchError(this.handleError<Address>('GetAddressDetails'))
    );
  }

  GetEmployeeDetails(employeeId: Guid): Observable<Employee> {
    return this.http.get<Employee>(baseUrl + 'GetEmployeeById/' + employeeId, httpOptions).pipe(
      tap(_ => console.log(`fetched employee`)),
      catchError(this.handleError<Employee>('GetEmployeeDetails'))
    );
  }

  GetGenders(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetGenders').pipe(
      tap(_ => console.log(`fetched all genders`)),
      catchError(this.handleError<Employee>('GetGenders'))
    );
  }

  GetManagers(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetManagers').pipe(
      tap(_ => console.log(`fetched all managers`)),
      catchError(this.handleError<Employee>('GetManagers'))
    );
  }

  GetAddressTypes(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetAddressTypes').pipe(
      tap(_ => console.log(`fetched all address types`)),
      catchError(this.handleError<Employee>('GetAddressTypes'))
    );
  }

  GetJobs(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetJobs').pipe(
      tap(_ => console.log(`fetched all job types`)),
      catchError(this.handleError<Employee>('GetJobs'))
    );
  }

  GetDepartments(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetDepartments').pipe(
      tap(_ => console.log(`fetched all departments`)),
      catchError(this.handleError<Employee>('GetDepartments'))
    );
  }

  GetEmployees(): Observable<any> {
    return this.http.get<any[]>(baseUrl + 'GetAllEmployees').pipe(
      tap(_ => console.log(`fetched all employees`)),
      catchError(this.handleError<Employee>('GetEmployees'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
