
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Event, NavigationEnd } from '@angular/router';
@Component({
    selector: 'back-component',
    template: require('./back.component.html')
})
export class BackComponent{
    previousRoute: string;
    routes: Array<string> = new Array<string>();
    ignorePush: boolean= false;
    defaultRoute: '/professional';
    currentRoute: string = '/professional';
    constructor(private router: Router){
        this.router.events.subscribe((event:Event) => {
            if(event instanceof NavigationEnd && !this.ignorePush && this.router.url != this.previousRoute){
                //this.previousRoute = this.currentRoute;
                this.routes.push(this.currentRoute);
                this.currentRoute = this.router.url;
                this.ignorePush = false;
            }
            return;
        });
    }
    goToPrevious(){
        this.ignorePush = true;
        if(this.routes.length > 0)
            this.router.navigate([this.routes.pop()])
        else
            this.router.navigate([this.defaultRoute])
    }
}
