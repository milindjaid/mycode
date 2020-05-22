import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonValidationServiceService } from 'src/app/Services/common-validation-service.service';
import { SnackBarService } from 'src/app/Services/snack-bar.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

     employeesFormGroup:FormGroup

     constructor(private formBuilder:FormBuilder,private employeeService:EmployeeService,private matDialog:MatDialog
    ,private commonValidationService:CommonValidationServiceService,private snackBarService:SnackBarService)
     { 
     }

  ngOnInit(): void {

    this.employeesFormGroup=this.commonValidationService.commonEmployeeFormGroup;
    
  }

  SubmitEmployeeRecords(EmployeeFormGroup:FormGroup)
  {
    this.matDialog.closeAll();
   console.log(EmployeeFormGroup.value);
   if(EmployeeFormGroup.get('empTrId').value==='')
   {
     this.employeeService.submitEmployeeRecord(EmployeeFormGroup.value).subscribe((flag)=>{
     console.log(flag)
     this.snackBarService.openSnackBar(flag)
     this.commonValidationService.setStateToSubject("Load Employee List.")
     this.onClear(EmployeeFormGroup)
    });
   }
   else
   {
    this.employeeService.updateEmployeeRecord(EmployeeFormGroup.value).subscribe((flag)=>{
    this.commonValidationService.setStateToSubject("Load Employee List.")
    this.snackBarService.openSnackBar(flag)
    this.onClear(EmployeeFormGroup)
      console.log(flag)
     });
   }

  }

  CloseEmployeePopUp()
  {
    this.matDialog.closeAll();
  }

  onClear(EmployeeFormGroup)
  {
    this.employeesFormGroup=this.commonValidationService.InitializeCommonFormGroup()
  }

}
