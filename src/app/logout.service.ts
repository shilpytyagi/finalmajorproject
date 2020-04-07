import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private user : RegistrationService, private router: Router) { }
  canActivate(){
    return this.user.getJwt() ? this.router.parseUrl('/order'):true;
  }
}