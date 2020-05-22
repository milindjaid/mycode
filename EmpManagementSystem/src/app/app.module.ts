import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from './Components/mat-confirm-dialog/mat-confirm-dialog.component';
//import {HttpModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    //HttpModule,
  ],
  providers: [
    MatDialog,MatDialogConfig,MatSnackBar,
    { provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,
      multi:true 
    }
  ],
  entryComponents:[CreateEmployeeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
