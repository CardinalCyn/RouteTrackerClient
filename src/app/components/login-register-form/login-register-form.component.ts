//form used for both logging in and registering, differentiated by formsubmit passed in by parent login/register pages
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputValidationService } from 'src/app/services/input-validation.service';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css']
})
export class LoginRegisterFormComponent {
  //validates user input as valid
  constructor (private inputValidationService:InputValidationService) {}
  //user credentials
  username: string="";
  password: string="";
  //input from parent pages, depends on whats passed in
  //shows login vs register button
  @Input() submitButtonText: string="";
  //error message based on input validation service or server
  @Input() errorMessage!: string;
  @Output() onFormSubmit = new EventEmitter<{ username: string, password: string }>();
//submits to parent if the credentials are valid length and alphanumerical
  onSubmit() {
    const validationResult= this.inputValidationService
    .validateSignIn(this.username,this.password);
    if(validationResult==="credentialsValid"){
      this.onFormSubmit.emit({ username: this.username, password: this.password });
      this.errorMessage="";
    }else{
      this.errorMessage=validationResult;
    }
  }
}