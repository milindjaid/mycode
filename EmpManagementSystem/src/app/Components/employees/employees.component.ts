import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenManagementService } from 'src/app/Services/token-management.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { CommonValidationServiceService } from 'src/app/Services/common-validation-service.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeesFormGroup:FormGroup
  EmployeesList:any[]

  constructor(private formBuilder:FormBuilder,private tokenService:TokenManagementService,private router:Router,
    private employeeService:EmployeeService,private matDialog:MatDialog,private matDialogConfig:MatDialogConfig,
    private commonValidationService:CommonValidationServiceService,private snackBarService:SnackBarService ){ 
      this.commonValidationService.getStateFromSubject().subscribe(
        (StateChangeFlag)=>{
          this.getAllEmployeesList();
        }
      )
    }

  ngOnInit(): void {

    this.EmployeesList=[];
    this.getAllEmployeesList();
  }

  logout()
  {
   //============Log Out===================
   this.tokenService.clearTokenFromStorage();
   this.router.navigateByUrl('/Login');

  }
  createEmployee()
  {
    let matdialogConfig=new MatDialogConfig();
    matdialogConfig.disableClose=true;
    matdialogConfig.autoFocus=true;
    matdialogConfig.height='50%';
    matdialogConfig.width='50%';
    this.commonValidationService.setcommonEmployeeFormGroup();
   this.matDialog.open(CreateEmployeeComponent,matdialogConfig);
  }

  getAllEmployeesList()
  {
    this.employeeService.getAllEmployeeRecord().subscribe(
      (employeeList)=>{
                        this.EmployeesList=employeeList;
                        console.log(this.EmployeesList)
      }
    )
  }

  onUpdate(employeeDetails)
  {
    this.commonValidationService.populateForm(employeeDetails);     
    console.log(employeeDetails)
   //loaded Create Employee Component dynamically
   let matdialogConfig=new MatDialogConfig();
   matdialogConfig.disableClose=true;
   matdialogConfig.autoFocus=true;
   matdialogConfig.height='50%';
   matdialogConfig.width='50%';
   this.matDialog.open(CreateEmployeeComponent,matdialogConfig);
    
  }

  onDelete(employeeDetails)
  {
    console.log(employeeDetails.empTrId)
    this.employeeService.deleteEmployeeRecord(employeeDetails.empTrId).subscribe(
      (Flag)=>{ 
               this.snackBarService.openSnackBar(Flag);
              }
    )
  }

  //=========For Performance optimization in case of delete and insert row into table=========
  trackByEmployeeId(index:number,employee:any):string
  {
    return employee.employeeId;
  }
}
