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
    this.commonValidationService.validateWholeFormGroup(EmployeeFormGroup)
    if(EmployeeFormGroup.valid)
    {
    this.matDialog.closeAll();
   if(EmployeeFormGroup.get('empTrId').value==='')
   {
     this.employeeService.submitEmployeeRecord(EmployeeFormGroup.value).subscribe((flag)=>{
     this.snackBarService.openSnackBar(flag)
     this.commonValidationService.setStateToSubject("Load Employee List.")
     this.onClear()
    });
   }
   else
   {
    this.employeeService.updateEmployeeRecord(EmployeeFormGroup.value).subscribe((flag)=>{
    this.commonValidationService.setStateToSubject("Load Employee List.")
    this.snackBarService.openSnackBar(flag)
    this.onClear()
     });
   }
  }
  }

  CloseEmployeePopUp()
  {
    this.matDialog.closeAll();
  }

  onClear()
  {
    this.employeesFormGroup=this.commonValidationService.InitializeCommonFormGroup()
  }

}
