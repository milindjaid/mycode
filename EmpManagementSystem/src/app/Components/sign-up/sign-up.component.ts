import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/Services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
   registerFormGroup:FormGroup
  constructor(private formBuilder:FormBuilder,private router:Router,private signUpService:SignUpService) { }

  ngOnInit(): void 
  {
    this.InitailizeFormGroup();
  }
   
  InitailizeFormGroup()
  {
    this.registerFormGroup=this.formBuilder.group(
      {
        firstName:[''],
        lastName:[''],
        password:[''],
        emailAddress:[''],
        address:[''],
        dob:[''],
        company:[''],
      }
      );
  }

  NavigateToLogin()
  {
   this.router.navigateByUrl('/Login');
  }

  registerUserRecords(formGroup:FormGroup)
  {
   this.signUpService.registerRecords(formGroup.value).subscribe(
     (flag)=>{
              alert(flag)
             }
   );
  }
}
