import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'nav-menu',
    template: require('./navigation.component.html')
})
export class NavigationComponent {
    @Input() isActive: boolean = false;
    showMenu: boolean = false;
    showSignIn: boolean = false;
    showLogIn: boolean = false;
    constructor() {
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
}
