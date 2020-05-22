import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonValidationServiceService {

  commonEmployeeFormGroup:FormGroup;
  private subject=new Subject();
  constructor(private formBuilder:FormBuilder)
   {
    this.setcommonEmployeeFormGroup();
   }

   setcommonEmployeeFormGroup()
   {
    this.commonEmployeeFormGroup=this.InitializeCommonFormGroup();
   }

   InitializeCommonFormGroup()
   {
    return this.formBuilder.group({
          empTrId:[''],
       employeeId:[''],
employeefirstName:[''],
 employeelastName:[''],
  employeeAddress:[''],
      employeeDob:[''],
employeemMobileNo:[''],
     employeeCity:[''],
                   })
   }

  public setStateToSubject(state:any):void
  {
    this.subject.next(state);
  }

  public getStateFromSubject():Observable<any>
  {
    return this.subject;
  }

  public populateForm(employee:any):void
  {
    this.commonEmployeeFormGroup.setValue(employee) 
  }

  public clearFormGroup(formGroup:FormGroup):void
  {
    Object.keys(formGroup).forEach(formControlKey=>{
            let formControl=formGroup.get(formControlKey);
            formControl.setValue('');
    })
  }

  //===========Validate Whole Form Group=================
  public validateWholeFormGroup(formGroup:FormGroup):void
  {
    Object.keys(formGroup).forEach(
      (field)=>
      {
        const control=formGroup.get(field);
        if(control instanceof FormControl)
        {
           control.markAsDirty({onlySelf:true});
           control.markAsDirty({onlySelf:true})
        }
        else if( control instanceof FormGroup)
        {
            this.validateWholeFormGroup(control);
        }

      }
    )
  }

}
