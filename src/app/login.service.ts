import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private user : RegistrationService, private router:Router) { }
  canActivate(){
    return this.user.getJwt()? true : this.router.parseUrl('/login');
  }
}
