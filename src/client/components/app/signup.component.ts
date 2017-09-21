import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService, AlertService } from '../../services';
import {Constants} from '../../constants';

@Component({
    selector: 'signup-form',
    template: require('./signup.component.html')
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    signupFormString: string;
    passwordMismatch: boolean = false;
    @Output() closeSignup = new EventEmitter();

    constructor(private userService:UserService,private alertService:AlertService, private router: Router){

    }
    ngOnInit(){
        let email = new FormControl('',Validators.email);
        let organization = new FormControl('',Validators.required);
        let password = new FormControl('',Validators.required);
        let confirmPassword = new FormControl('',Validators.required);
        // let role = new FormControl('',Validators.required);

        this.signupForm = new FormGroup({
            email: email,
            organization: organization,
            password: password,
            confirmPassword: confirmPassword,
            // role: role
        });
    }
    signUp(signupValues:any){
        if(!this.signupForm.valid){
            return;
        }
        if(signupValues.password != signupValues.confirmPassword){
            this.passwordMismatch = true;
            return;
        }
        this.userService.create(signupValues.email,signupValues.password, signupValues.organization, Constants.Roles.Admin).subscribe(
                data => {
                    console.log(data);
                    this.signupForm.reset();
                    this.closeSignup.emit();
                    this.router.navigate(['/professional']);                    
                },
                error => {
                    this.alertService.error(error);
                    // this.loading = false;
                });
    }
    // private formInputMatch(){
    //     return (control: FormControl) : {[key: string]: boolean} => {
    //         let password = this.signupForm.controls.password;
    //         let confirmPassword = this.signupForm.controls.confirmPassword;
    //         return (password.value === confirmPassword.value) ? null : {nomatch: true};
    //     };
    // }
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
