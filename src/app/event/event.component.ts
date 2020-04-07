import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  FullName;
  email;
  Address;
  Phone;
  password;
  confirmpassword;

  constructor(private user: RegistrationService) { }

  ngOnInit() {
  }
// Login
  Login(){
    this.user.Login(this.email,this.password);
  }

  // SignUp
  SignUp(){
    this.user.SignUp(this.FullName,this.email,this.Address,this.Phone,this.password,this.confirmpassword);
    console.log(this.FullName)
  }
  
}
