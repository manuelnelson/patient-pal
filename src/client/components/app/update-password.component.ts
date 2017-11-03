import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models';
@Component({
    selector: 'Update-password',
    template: require('./update-password.component.html')
})
export class UpdatePasswordComponent implements OnInit{

    resetPasswordForm: FormGroup;
    resetPasswordFormString: string;
    showErrors: boolean = false;
    user: User;

    constructor(private authService:AuthenticationService,private alertService:AlertService, private router: Router,
         private route: ActivatedRoute){
            this.user = this.route.snapshot.data['user'];
            if(!this.user){
                this.alertService.warningMessage("The link provided has expired.  Please reset your password again", true);
                this.router.navigate(['/']);
            }
    }

    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }


    public ngOnInit(): void {

        let password = new FormControl('',Validators.required);
        let confirmPassword = new FormControl('',Validators.required);
        this.resetPasswordForm = new FormGroup({
            password: password,
            confirmPassword: confirmPassword,
        });

    }
    resetPassword(passwordValues: any){
        if(passwordValues.password !== passwordValues.confirmPassword){
            this.showErrors =true;
            return;
        }
        if(this.resetPasswordForm.valid){
            this.authService.updatePassword(this.user.email, passwordValues.password).subscribe(updatedUser => {
                this.alertService.successMessage("Your password was successfully updated", true);
                this.router.navigate(['/'], {queryParams:{"showLogin": true}});
            })    
        }
    }
}
