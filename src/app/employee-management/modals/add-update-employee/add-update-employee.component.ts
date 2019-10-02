import { Address } from './../../../models/address.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Employee } from 'src/app/models/employee.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.scss']
})

export class AddUpdateEmployeeComponent implements OnInit {

  genders: any[];
  jobs: any[];
  managers: any[];
  departments: any[];
  addressTypes: any[];
  employee: Employee;
  address: Address;
  addressId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
    this.employee = data.employee;
    if (this.employee.employeeId != null) {
      this.populateaddUpdateEmployeeForm(this.employee);
    }
  }

  addUpdateEmployeeForm: FormGroup = new FormGroup({
    employeeId: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    doB: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    emailAddress: new FormControl('', Validators.email),
    hireDate: new FormControl('', Validators.required),
    genderId: new FormControl('', Validators.required),
    genderDescription: new FormControl(''),
    managerId: new FormControl('', Validators.required),
    managerName: new FormControl(''),
    jobId: new FormControl('', Validators.required),
    jobTitle: new FormControl(''),
    departmentId: new FormControl('', Validators.required),
    departmentName: new FormControl(''),
    addressId: new FormControl('', Validators.required)
  });

  addressForm: FormGroup = new FormGroup({
    addressId: new FormControl(null),
    line1: new FormControl('', Validators.required),
    line2: new FormControl(''),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    addressTypeId: new FormControl('', Validators.required)
  });

  populateaddUpdateEmployeeForm(emp: Employee) {
    this.addUpdateEmployeeForm.setValue(emp);
    this.populateAddressForm(emp.addressId);
  }

  populateAddressForm(addressId: number) {
    this.employeeService.GetAddressDetails(addressId).subscribe(((data: any) => {
      this.addressForm.setValue(data);
    }));
  }

  getGenders() {
    this.employeeService.GetGenders().subscribe((data => {
      this.genders = data.genders;
    }));
  }

  getDepartments() {
    this.employeeService.GetDepartments().subscribe((data => {
      this.departments = data.departments;
    }));
  }

  getJobs() {
    this.employeeService.GetJobs().subscribe((data => {
      this.jobs = data.jobs;
    }));
  }

  getManagers() {
    this.employeeService.GetManagers().subscribe((data => {
      this.managers = data.managers;
    }));
  }

  getAddressTypes() {
    this.employeeService.GetAddressTypes().subscribe((data => {
      this.addressTypes = data.addressTypes;
    }));
  }

  onDialogClose() {
    this.dialog.closeAll();
  }

  onFormSubmit() {
    if (this.addUpdateEmployeeForm.value.employeeId == null) {
      this.addAddress();
    } else {
      this.updateAddress();
    }

    this.onDialogClose();
  }

  async updateAddress() {
    this.employeeService.UpdateAddress(this.addressForm.value)
      .subscribe((data => {
        this.updateEmployee();
      }));
  }

  async updateEmployee() {
    this.employeeService.UpdateEmployee(this.addUpdateEmployeeForm.value)
      .subscribe((data => {
        this.toastr.success('Employee updated succefully!', 'Update Employee');
      }));
  }

  async addAddress() {
    this.employeeService.AddAddress(this.addressForm.value)
      .subscribe((data => {
        this.addressId = data.addressId;
        this.addUpdateEmployeeForm.value.addressId = this.addressId;
        this.addEmployee();
      }));
  }

  async addEmployee() {
    this.employeeService.AddEmployee(this.addUpdateEmployeeForm.value)
      .subscribe((() => {
        this.toastr.success('Employee added succefully!', 'Add Employee');
      }));
  }

  ngOnInit() {
    this.getAddressTypes();
    this.getGenders();
    this.getManagers();
    this.getJobs();
    this.getDepartments();
  }
}
