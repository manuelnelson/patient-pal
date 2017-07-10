import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, AuthenticationService } from '../../services';
import { Skill, Patient } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'skill-form',
    template: require('./add-skill.component.html')
})
export class AddSkillComponent implements OnInit {
    skillForm: FormGroup;
    //patients: Array<Patient> = null;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private datePipe: DatePipe){
        //this.patients = this.route.snapshot.data['patients'];
    }
    ngOnInit(){

        let targetName = new FormControl('');
        let goalName = new FormControl('');
        let stimulus = new FormControl('');
        let numberOfTrials = new FormControl('');
        let targetType = new FormControl('');
        let ddtType = new FormControl('');
        let interval = new FormControl('');
        let maxThreshold = new FormControl('');
        let masteryType = new FormControl('');
        let targetInstructions = new FormControl('');

        this.skillForm = new FormGroup({
            targetName: targetName,
            goalName: goalName,
            stimulus: stimulus,
            numberOfTrials: numberOfTrials,
            targetType: targetType,
            ddtType: ddtType,
            interval: interval,
            maxThreshold: maxThreshold,
            masteryType: masteryType,
            targetInstructions: targetInstructions
        });
    }
    skill(skillValues:Skill){
        if(this.skillForm.valid){
            this.skillService.create(skillValues).subscribe(
                data => {
                    this.router.navigate(['/professional/skills']);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                });
        }
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
}
