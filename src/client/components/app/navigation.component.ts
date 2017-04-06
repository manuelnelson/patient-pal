import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'nav-menu',
    template: require('./navigation.component.html')
})
export class NavigationComponent {
    @Input() isActive: boolean = false;
    showMenu: boolean = false;
    constructor() {
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
    }
}
