import { appendFile } from 'fs';

import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ProfessionalService, AlertService, AuthenticationService } from '../../services';
import { Professional, Appointment } from '../../models';
import { CalendarEvent, CalendarDateFormatter  } from 'angular-calendar';
import { CustomDateFormatter } from '../../services/providers'
import {ActivatedRoute, Router} from '@angular/router';
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
export class CalendarComponent {
    @Input() user: Professional;
    view: string = 'month';
    viewDate: Date = new Date();
    appointments: Array<Appointment>;
    refresh: Subject<any> = new Subject();
    events: Array<CalendarEvent> = new Array<CalendarEvent>();
    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
    constructor(private profService: ProfessionalService, private authService: AuthenticationService, 
        private alertService: AlertService, private route: ActivatedRoute, private router: Router) 
    {
        this.refreshAppointments();
//        this.appointments = this.route.snapshot.data.appointments;
    }

    nextMonth() {
        //this.viewDate.setMonth(this.viewDate.getMonth() +1);
        this.viewDateChange.next(this.viewDate);
        this.refreshAppointments();
    }
    previousMonth(){
        this.viewDateChange.next(this.viewDate);
        this.refreshAppointments();        
    }
    refreshAppointments(){
        this.events = [];
        
        this.profService.getAppointments(this.authService.getLoggedInUser()._id, this.viewDate.getMonth(), this.viewDate.getFullYear())
        .subscribe(appointments => {
            this.appointments = appointments
            this.appointments.forEach((appointment) => {
                this.events.push({
                    start: new Date(appointment.startDate),
                    end: new Date(appointment.endDate),
                    title: appointment.client.firstname + ' ' + appointment.client.lastname + ' ' + moment(new Date(appointment.startDate)).format('HH:mm'),
                    color:{
                        primary: '#1e90ff',
                        secondary: '#D1E8FF'
                    },
                    meta: {
                        _id: appointment._id
                    }
                });
                this.refresh.next();
            })
        })
    }
    eventClicked({ event }: { event: CalendarEvent }): void {
        console.log('Event clicked', event);
        this.router.navigate([`/appointments/${event.meta._id}/start`]);
    }
}
