import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { AuthenticationGuardService } from './Services/authentication-guard.service';


const routes: Routes = [
  
  { path:'',redirectTo:'Login',pathMatch:'full'},
  { path:'Login' ,component:LoginComponent},
  { path:'SignUp' ,component:SignUpComponent},
  { path:'Home' ,component:EmployeesComponent,}//canActivate:[AuthenticationGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
