import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment, Curriculum, Skill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'run-appointment',
    template: require('./run-appointment.component.html')
})
export class RunAppointmentComponent{
    appointment: Appointment;
    curriculum: Curriculum;
    currentSkill: Skill = null;
    skillNdx: number = 0;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.appointment = this.route.snapshot.data["appointment"];
            //TODO: what to do if curriculum is null? Redirect to error page?
            this.curriculum = this.route.snapshot.data["curriculums"] ? this.route.snapshot.data["curriculums"][0] : null;
            this.currentSkill = this.getNextSkill();
    }

    //TODO: this function should return the next skill not completed.  For now we are just cycling through them
    getNextSkill(){
        return this.curriculum.skills[this.skillNdx];
    }
}
