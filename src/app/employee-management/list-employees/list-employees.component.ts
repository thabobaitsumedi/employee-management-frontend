import { Guid } from 'guid-typescript';
import { AddUpdateEmployeeComponent } from './../modals/add-update-employee/add-update-employee.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { DeleteEmployeeComponent } from '../modals/delete-employee/delete-employee.component';

const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})

export class ListEmployeesComponent implements OnInit {

  title: string;
  employees: any[];
  id: any;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Full Name', 'Gender', 'Email Address', 'Hire Date', 'Job Type', 'Department', 'Manager', 'Actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  getEmployees() {
    this.employeeService.GetEmployees().subscribe((data: any) => {
      this.employees = data.employees;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openAddUpdateModal(emp: any) {
    this.dialogConfigurations('60%');

    if (emp == null) {
      dialogConfig.data = { employee: {}, title: 'Add Employee' };
      this.dialog.open(AddUpdateEmployeeComponent, dialogConfig);
    } else {
      dialogConfig.data = { employee: emp, title: 'Update Employee' };
      this.dialog.open(AddUpdateEmployeeComponent, dialogConfig);
    }
  }

  openDeleteModal(employeeId: Guid) {
    this.dialogConfigurations('600px');
    dialogConfig.data = { id: employeeId, title: 'Delete Employee' };
    this.dialog.open(DeleteEmployeeComponent, dialogConfig);
  }

  dialogConfigurations(width: string) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
  }
}
