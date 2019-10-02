import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  employeeId: Guid;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
    this.employeeId = data.id;
  }


  async onDelete() {
    this.employeeService.DeleteEmployee(this.employeeId).subscribe(data => {
      this.toastr.success('Employee deleted succefully!', 'Delete Employee');
    });

    this.onDialogClose();
  }

  onDialogClose() {
    this.dialog.closeAll();
  }

  ngOnInit() {
  }
}
