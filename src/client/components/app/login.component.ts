import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { Router } from '@angular/router';
import { User } from '../../models';
@Component({
    selector: 'login-form',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    @Output() showSignUp = new EventEmitter();
    @Output() closeLogin = new EventEmitter();
    @Input() user: User;
    loginForm: FormGroup;
    loginFormString: string;

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
                    this.user = data;
                    this.closeLogin.emit();
                },
                error => {
                    this.alertService.error(error);
                });
        }
    }
    logout(){
        this.authService.logout();
        this.user = null;
        this.closeLogin.emit();
        this.router.navigate(['/']);
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
    goToDashboard(){
        this.closeLogin.emit();
        this.router.navigate(['/professional']);
    }
    goToSignup(){
        this.showSignUp.emit();
    }
}
