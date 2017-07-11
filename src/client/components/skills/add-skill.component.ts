import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, AuthenticationService } from '../../services';
import { Skill, TargetType, DttType } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'skill-form',
    template: require('./add-skill.component.html')
})
export class AddSkillComponent implements OnInit {
    skillForm: FormGroup;
    targetTypes: Array<TargetType> = null;
    dttTypes: Array<DttType> = null;
    dttTypeId: string;
    jumpToId: string;
    durationId: string;
    fluencyId: string;
    wholeId: string;
    quantityId: string;

    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private authService: AuthenticationService){
        this.targetTypes = this.route.snapshot.data['targetTypes'];
        this.dttTypes = this.route.snapshot.data['dttTypes'];
        //get ids for special cases
        this.dttTypeId = this.getId('dtt');
        this.jumpToId = this.getId('jump');
        this.durationId = this.getId('duration');
        this.fluencyId = this.getId('fluency');
        this.wholeId = this.getId('whole');
        this.quantityId = this.getId('quantity');
    }
    ngOnInit(){

        let targetName = new FormControl('');
        let goalName = new FormControl('');
        let stimulus = new FormControl('');
        let numberOfTrials = new FormControl('',Validators.pattern(/\d+/));
        let targetType = new FormControl('');
        let dttType = new FormControl('');
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
            dttType: dttType,
            interval: interval,
            maxThreshold: maxThreshold,
            masteryType: masteryType,
            targetInstructions: targetInstructions
        });
    }
    skill(skillValues:Skill){
        if(this.skillForm.valid){
            var cleanObject = this.removeEmptyFields(skillValues);
            this.skillService.create(cleanObject).subscribe(
                data => {
                    this.router.navigate(['/professional/skills']);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                });
        }
    }
    removeEmptyFields(skillValues: Skill){
        for(var prop in skillValues){
            if(skillValues[prop] == "")
                delete skillValues[prop];
        }
        return skillValues;
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched;
    }
    getId(key: string){
        let target = this.targetTypes.find(targetType => targetType.name.toLowerCase().indexOf(key) > -1);
        return target === null ? '' : target._id;
    }
    showDtt() {
        let val = this.skillForm.controls.targetType.value;
        return val === this.dttTypeId || val === this.jumpToId;
    }
    showInterval() {
        let val = this.skillForm.controls.targetType.value;
        return val === this.fluencyId || val === this.durationId || val === this.wholeId;
    }
    showMaxThreshold() {
        let val = this.skillForm.controls.targetType.value;
        return val === this.quantityId;
    }
}
