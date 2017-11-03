import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppointmentService, AlertService } from '../../services';
import { Appointment, Curriculum, Skill, ClientCurriculum, DttType } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'run-appointment',
    template: require('./run-appointment.component.html')
})
export class RunAppointmentComponent implements OnInit{
    appointment: Appointment;
    clientCurriculum: ClientCurriculum;
    currentSkill: Skill = null;
    dttTypes: Array<DttType>;
    skillNdx: number = 0;
    constructor(private appointmentService:AppointmentService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.appointment = this.route.parent.snapshot.data["appointment"];
            this.clientCurriculum = this.route.snapshot.data["clientCurriculum"];
            this.currentSkill = this.clientCurriculum.curriculum.skills.find(skill => skill._id == this.route.snapshot.params['skillId']);            
            this.dttTypes = this.route.snapshot.data["dttTypes"];
            
    }

    ngOnInit(){
    }

    //TODO: this function should return the next skill not completed.  For now we are just cycling through them
    getNextSkill(){
        this.skillNdx++;
        //if(this.skillNdx > this.curriculum.skills.length)
        this.currentSkill = this.clientCurriculum.curriculum.skills[this.skillNdx];
    }

    skillList(){      
        this.router.navigate(['/appointments/' + this.appointment._id + '/start/client-curriculum/' + this.clientCurriculum._id + '/navigation']);
    }

    isTargetType(name:string){
        return this.currentSkill.targetType.name.toLowerCase() == name.toLowerCase();
    }
}
