import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { Router } from '@angular/router';
@Component({
    selector: 'forgot-password',
    template: require('./forgot-password.component.html')
})
export class ForgotPasswordComponent implements OnInit{
    @Output() closeForgot = new EventEmitter();
    
    resetPasswordForm: FormGroup;
    resetPasswordFormString: string;
    showErrors: boolean = false;


    constructor(private authService:AuthenticationService,private alertService:AlertService,
                private router: Router){
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }


    public ngOnInit(): void {
        let email = new FormControl('',Validators.email);
        this.resetPasswordForm = new FormGroup({
            email: email
        });

    }
    resetPassword(passwordValues: any){
        this.authService.resetPassword(passwordValues.email).subscribe(message => {
            this.alertService.successMessage("A password recovery e-mail was sent to your e-mail address");
            this.closeForgot.emit();
        },
        error => {
            this.alertService.error(error);
            // this.loading = false;
        });
    }
}
