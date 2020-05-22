import { Injectable } from '@angular/core';
import {jwt_decode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenManagementService {

  constructor() { }
  
  checkTokenAvailability():boolean
  {
    return localStorage.getItem('UserDetails')!=null;
  }

  setTokenToLocalStorage(Token:string)
  {
    localStorage.setItem('UserDetails',Token);
  }

  getTokenFromLocalStorage():string
  {
    return localStorage.getItem('UserDetails');
  }

  getUserdetailsFromToken(token:string):any
  {
   return jwt_decode(token);
  }

  clearTokenFromStorage()
  {
    localStorage.removeItem('UserDetails');
  }
}
