import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonUrl } from '../CommonClasses/common-url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //==============Get Base Url =========
  BaseUrl=CommonUrl.getBaseHttpUrl();
  constructor(private http:HttpClient) { }

  authenticateUser(userCredintials:any):Observable<any>
  {
    return this.http.post(this.BaseUrl+'/authenticate',userCredintials,{responseType:'text'});
  }
   
}
