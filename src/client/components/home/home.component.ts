import { Component, AfterViewInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
    template: require('./home.component.html')
})
export class HomeComponent{
    constructor(private restService: RestService) {
    }
}
