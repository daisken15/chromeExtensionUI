import { Component } from '@angular/core';
declare var bootstrap: any; // Declare the Bootstrap variable
declare var $: any;
import { CookieService } from 'ngx-cookie-service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { MyServiceService } from 'src/app/my-service.service';


@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent {


  constructor(
    private MyServiceService: MyServiceService
  ){}

  username: string = '';
  password: string = '';
  checkUsername = false;
  checkPassword = false;
  item: any;
  response: any;
  


  ngOnInit(){
    this.item = sessionStorage.getItem('token');
  }

  login() {
    const userData = {
      username: this.username,
      password: this.password
    };
    if(this.username == ""){
      this.checkUsername = true
    }
    else{
      this.checkUsername = false
    }
    if(this.password == ""){
      this.checkPassword = true
    }
    else{
      this.checkPassword = false
    }
    if(this.checkUsername == false && this.checkPassword == false){
      this.MyServiceService.userLogin(userData).subscribe(
        (response) => {
          this.response = response;
          if(response.response == "LOGIN"){
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('dateExpire', response.dateExpire);
            sessionStorage.setItem('dateLogin', response.dateLogin);
            sessionStorage.setItem('firstname', response.firstname);
            sessionStorage.setItem('userlvl', response.userlvl);
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('uuid', response.uuid);
            sessionStorage.setItem('tenant_uuid', response.tenant_uuid);
          }
          else{
            sessionStorage.clear();
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }

  signout(){
    sessionStorage.clear();
    window.location.reload();
  }

  saveToCookie(){
    sessionStorage.setItem('key', 'asdasdasdasdasdasdasdasdadsa');
  }


}
