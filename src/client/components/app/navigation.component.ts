import { Component, AfterViewInit, Input } from '@angular/core';
import { User } from '../../models';
import { AuthenticationService, AlertService } from '../../services';

@Component({
    selector: 'nav-menu',
    template: require('./navigation.component.html')
})
export class NavigationComponent {
    @Input() isActive: boolean = false;
    showMenu: boolean = false;
    showSignIn: boolean = false;
    showLogIn: boolean = false;
    user: User = null;
    constructor(private authService: AuthenticationService) {
        this.user = this.authService.getLoggedInUser();
    }
    toggleMenu(){
        if(this.showSignIn){
            this.showSignIn = !this.showSignIn;
        }
        else if(this.showLogIn){
            this.showLogIn = !this.showLogIn;
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
    showSignUp(){
        this.showSignIn = true;
        this.showLogIn = false;
    }
    closeLogin(){
        this.showLogIn = false;
    }
    closeSignup(){
        this.user = this.authService.getLoggedInUser();
        this.showSignIn = false;
    }
}
