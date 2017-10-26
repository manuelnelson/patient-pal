import { Component, AfterViewInit, Input } from '@angular/core';
import { User } from '../../models';
import { AuthenticationService, AlertService } from '../../services';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'nav-menu',
    template: require('./navigation.component.html')
})
export class NavigationComponent {
    @Input() isActive: boolean = false;
    showMenu: boolean = false;
    showForgotPassword: boolean = false;
    showSignIn: boolean = false;
    showLogIn: boolean = false;
    user: User = null;
    constructor(private authService: AuthenticationService, private route: ActivatedRoute) {
        this.user = this.authService.getLoggedInUser();
        this.route.queryParams.subscribe(
            (queryParam: any) => {
                if(queryParam['showLogin']){
                    this.showLogIn = true;
                }
        });
        // this.route.queryParams.subscribe(x=>)
    }
    toggleMenu(){
        if(this.showSignIn){
            this.showSignIn = !this.showSignIn;
        }
        else if(this.showLogIn){
            this.showLogIn = !this.showLogIn;
        }
        else if(this.showForgotPassword){
            this.showForgotPassword = !this.showForgotPassword;
        }
        else {
            this.showMenu = !this.showMenu;
        }
    }
    toggleSignIn(){
        this.showSignIn = !this.showSignIn;
    }
    toggleLogIn(){
        this.showLogIn = !this.showLogIn;
    }
    showForgot(){
        this.showForgotPassword = true;
        this.showLogIn = false;
        this.showSignIn = false;
    }
    showSignUp(){
        this.showSignIn = true;
        this.showForgotPassword = false;
        this.showLogIn = false;
    }
    closeForgot(){
        this.showForgotPassword = false;
    }
    closeLogin(){
        this.showLogIn = false;
    }
    closeSignup(){
        this.user = this.authService.getLoggedInUser();
        this.showSignIn = false;
    }
}
