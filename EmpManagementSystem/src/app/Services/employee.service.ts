import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonUrl } from '../CommonClasses/common-url';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  BaseUrl=CommonUrl.getBaseHttpUrl();
  constructor(private http:HttpClient) { }

  submitEmployeeRecord(employeeDetails:any):Observable<any>
  {
    return this.http.post(this.BaseUrl+'/createEmployee',{employeeDetails},{responseType:'text'});
  }

  updateEmployeeRecord(employeeDetails:any):Observable<any>
  {
    return this.http.put(this.BaseUrl+'/updateEmployee',{employeeDetails},{responseType:'text'});
  }

  deleteEmployeeRecord(employeeId:any):Observable<any>
  {
    let params:HttpParams=new HttpParams().set("empId",employeeId);
    return this.http.delete(this.BaseUrl+'/deleteEmployee',{params,responseType:'text'});
  }

  getAllEmployeeRecord():Observable<any>
  {
    return this.http.get(this.BaseUrl+'/getAllEmployeesRecords');
  }

	}
