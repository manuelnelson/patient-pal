import { appendFile } from 'fs';

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional, Appointment } from '../../models';
import { CalendarEvent, CalendarDateFormatter  } from 'angular-calendar';
import { CustomDateFormatter } from '../../services/providers'
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
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
    appointments: Array<Appointment>;
    refresh: Subject<any> = new Subject();
    events: Array<CalendarEvent> = new Array<CalendarEvent>();
    constructor(private profService: ProfessionalService, private authService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute) 
    {
        this.appointments = this.route.snapshot.data.appointments;
        this.appointments.forEach((appointment) => {
            this.events.push({
                start: new Date(appointment.startDate),
                end: new Date(appointment.endDate),
                title: appointment.client.firstname + ' ' + appointment.client.lastname + ' ' + moment(new Date(appointment.startDate)).format('HH:mm'),
                color:{
                    primary: '#1e90ff',
                    secondary: '#D1E8FF'
                },
            })
        })
        console.log(this.events)
    }

    ngOnInit(){
    }
}
