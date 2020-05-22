import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenManagementService } from './token-management.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenManagementService,private router:Router) { }

  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    let modifiedRequest=this.addTokenToRequest(request);
    console.log(modifiedRequest)
   return next.handle(modifiedRequest).pipe(
     //==================Error/Exception Handling Code=============
     catchError((errorResponse:HttpErrorResponse)=>{
       let errorMassage:any;
       if(errorResponse.error instanceof ErrorEvent)
       {
        errorMassage="Client Side Error Occured."
       }
       else
       {
         //==========if token expired =================
         if(errorResponse.status==401 || errorResponse.status==403)
         {
           alert("There was an error trying to log you in.")
           this.tokenService.clearTokenFromStorage();
           this.router.navigateByUrl('/Login');
         }
         else if(errorResponse.status==0 && (errorResponse.url==null|| errorResponse.url!=null )) //i.e Progress Event 
         {
          errorMassage="Network Error:Connection Timed Out."
         }
         else
         {
           console.log(errorResponse)
          errorMassage="Server Side Error Occured."
         }
       }

       //========return Custom error notification to Observer==========
      return throwError (errorMassage);
     })
   )

  }

  addTokenToRequest(request:HttpRequest<any>):HttpRequest<any>
  {
    let token=this.tokenService.getTokenFromLocalStorage();
    if(token)
    {
     return request.clone(
      {
        setHeaders:{
                    'Access-Control-Allow-Origin':'*',
                    'Authorization':`Bearer${token}`,
                   }
      }
      )
    }
    return request;
  }

}
