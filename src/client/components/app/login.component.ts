import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
@Component({
    selector: 'login-form',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    @Output() showSignUp = new EventEmitter();
    loginForm: FormGroup;
    loginFormString: string;
    constructor(private authService:AuthenticationService,private alertService:AlertService){

    }
    ngOnInit(){
        let email = new FormControl('',Validators.email);
        let password = new FormControl('',Validators.required);
        this.loginForm = new FormGroup({
            email: email,
            password: password
        });
    }
    login(loginValues:any){
        if(this.loginForm.valid){
            this.authService.login(loginValues.email,loginValues.password).subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    // this.loading = false;
                });
        }
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
    goToSignup(){
        this.showSignUp.emit();
    }
}
