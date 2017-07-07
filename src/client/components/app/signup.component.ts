import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService, AlertService } from '../../services';
@Component({
    selector: 'signup-form',
    template: require('./signup.component.html')
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    signupFormString: string;
    @Output() closeSignup = new EventEmitter();

    constructor(private userService:UserService,private alertService:AlertService){

    }
    ngOnInit(){
        let email = new FormControl('',Validators.email);
        let password = new FormControl('',Validators.required);
        let confirmPassword = new FormControl('',Validators.required);
        let role = new FormControl('',Validators.required);

        this.signupForm = new FormGroup({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role
        });
    }
    signUp(signupValues:any){
        if(this.signupForm.valid){
            this.userService.create(signupValues.email,signupValues.password, signupValues.role).subscribe(
                data => {
                    console.log(data);
                    this.closeSignup.emit();
                },
                error => {
                    this.alertService.error(error);
                    // this.loading = false;
                });
        }
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
