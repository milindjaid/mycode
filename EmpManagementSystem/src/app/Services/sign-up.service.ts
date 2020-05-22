import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonUrl } from '../CommonClasses/common-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

   //==============Get Base Url =========
   BaseUrl=CommonUrl.getBaseHttpUrl();
   constructor(private http:HttpClient) { }

  registerRecords(registerDetails:FormGroup):Observable<any>
  {
   return this.http.post(this.BaseUrl+'/register',{registerDetails},{responseType:'text'});
  }
}
