
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AlertService, AuthenticationService } from '../../services';
import { Client } from '../../models';
import { CalendarEvent, CalendarDateFormatter  } from 'angular-calendar';
import { CustomDateFormatter } from '../../services/providers'

@Component({
    selector: 'client-calendar-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./calendar.component.html'),
    providers: [{
       provide: CalendarDateFormatter,
       useClass: CustomDateFormatter
     }]
 })
export class ClientCalendarComponent implements OnInit{
    @Input() user: Client;
    view: string = 'month';
    viewDate: Date = new Date();
    constructor(private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

    ngOnInit(){
    }
}
