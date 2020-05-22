import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenManagementService } from './token-management.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService  implements CanActivate{

   constructor(private tokenService:TokenManagementService) { }

  canActivate():boolean
  {
    // check token is available for perticular user or not i.e connect TokenManagement Service
    if(!this.tokenService.checkTokenAvailability())
    {
      alert("You are not authorized to see this page.")
       return false;
    }
    return true;
  }
}
