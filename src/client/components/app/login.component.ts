import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { Router } from '@angular/router';
import { Constants } from '../../constants';
import { User } from '../../models';
@Component({
    selector: 'login-form',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    @Output() showSignUp = new EventEmitter();
    @Output() showForgot = new EventEmitter();
    @Output() closeLogin = new EventEmitter();
    @Input() user: User;
    loginForm: FormGroup;
    loginFormString: string;
    showErrors: boolean = false;
    
    constructor(private authService:AuthenticationService,private alertService:AlertService,
                private router: Router){
        this.user = this.authService.getLoggedInUser();
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
                    this.loginForm.reset();
                    this.user = data;
                    this.goToDashboard();
                },
                error => {
                    this.alertService.error(error);
                });
        }
        else
            this.showErrors = true;

    }
    logout(){
        this.authService.logout();
        this.user = null;
        this.closeLogin.emit();
        this.router.navigate(['/']);
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
    goToDashboard(){
        this.closeLogin.emit();
        if(this.user.role == Constants.Roles.Admin || this.user.role == Constants.Roles.Professional)
            this.router.navigate(['/professional']);
        else
            this.router.navigate(['/client']);
    }
    goToForget(){
        this.showForgot.emit();
    }
    goToSignup(){
        this.showSignUp.emit();
    }
}
