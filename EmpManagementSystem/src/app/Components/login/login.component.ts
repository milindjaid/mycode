import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenManagementService } from 'src/app/Services/token-management.service';
import { LoginService } from 'src/app/Services/login.service';
import { CommonValidationServiceService } from 'src/app/Services/common-validation-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup:FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,
    private tokenService:TokenManagementService,private loginService:LoginService
    ,private commonValidationService:CommonValidationServiceService)
    {

    }

  ngOnInit(): void
  {
    
    //====If token available then redirect to home screen to avoid multitab login======
    if(this.tokenService.checkTokenAvailability())
    {
     this.router.navigateByUrl('/Home');
    }
    this.InitializeLoginFormGroup();

  }

  InitializeLoginFormGroup()
  {
    this.loginFormGroup=this.formBuilder.group
    ({
       userName:[''],
       password:['']
    })
  }

  authencateCredentials(formGroup:FormGroup)
  {
   this.commonValidationService.validateWholeFormGroup(formGroup);
  if(formGroup.valid)
   {
   this.loginService.authenticateUser(formGroup.value).subscribe(
     (value)=>{
         if(value!==null && value!=='')
         {
         this.tokenService.setTokenToLocalStorage(value);
         this.router.navigateByUrl('/Home')
         }
         else
         {
           alert(" Please Enter Correct UserName and Password .")
         }
              },
     (error)=>{ alert(error)}
   )
   }
  }
  NavigateToSignUp()
  {
    this.router.navigateByUrl('/SignUp')
  }
}
