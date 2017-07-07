
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional } from '../../models';
import { CalendarEvent, CalendarDateFormatter  } from 'angular-calendar';
import { CustomDateFormatter } from '../../services/providers'

@Component({
    selector: 'calendar-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require('./calendar.component.html'),
    providers: [{
       provide: CalendarDateFormatter,
       useClass: CustomDateFormatter
     }]
 })
export class CalendarComponent implements OnInit{
    @Input() user: Professional;
    view: string = 'month';
    viewDate: Date = new Date();
    constructor(private profService: ProfessionalService, private authService: AuthenticationService,
        private alertService: AlertService)
    {

    }

    ngOnInit(){
    }
}
