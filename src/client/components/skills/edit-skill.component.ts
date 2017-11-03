import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, AuthenticationService } from '../../services';
import { Skill, TargetType, DttType } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'edit-skill-form',
    template: require('./edit-skill.component.html')
})
export class EditSkillComponent implements OnInit {
    skillForm: FormGroup;
    targetTypes: Array<TargetType> = null;
    dttTypes: Array<DttType> = null;
    dttTypeId: string;
    jumpToId: string;
    durationId: string;
    fluencyId: string;
    wholeId: string;
    quantityId: string;
    taskAnalysisId: string;
    showErrors: boolean = false;
    currentSkill: Skill;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private authService: AuthenticationService){
        this.targetTypes = this.route.snapshot.data['targetTypes'];
        this.dttTypes = this.route.snapshot.data['dttTypes'];
        //get ids for special cases
        this.dttTypeId = this.getId('dtt');
        // this.jumpToId = this.getId('jump');
        this.durationId = this.getId('duration');
        this.fluencyId = this.getId('fluency');
        this.wholeId = this.getId('whole');
        this.quantityId = this.getId('quantity');
        this.taskAnalysisId = this.getId('task analysis');
        this.currentSkill = this.route.snapshot.data.skill;
    }
    ngOnInit(){

        let targetName = new FormControl(this.currentSkill.targetName || '');
        let goalName = new FormControl(this.currentSkill.goalName || '');
        let stimulus = new FormControl(this.currentSkill.stimulus || '');
        let numberOfTrials = new FormControl(this.currentSkill.numberOfTrials,Validators.pattern(/\d+/));
        let targetType = new FormControl(this.currentSkill.targetType ? this.currentSkill.targetType._id : '');
        let dttType = new FormControl(this.currentSkill.dttType ? this.currentSkill.dttType._id : '');
        let interval = new FormControl(this.currentSkill.interval || '');
        let maxThreshold = new FormControl(this.currentSkill.maxThreshold  || '');
        let taskSteps = new FormControl(this.currentSkill.taskSteps  || '');
        let masteryType = new FormControl(this.currentSkill.masteryType || '');
        let targetInstructions = new FormControl(this.currentSkill.targetInstructions || '');

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
            taskSteps: taskSteps,
            targetInstructions: targetInstructions
        });
    }
    skill(skillValues:Skill){
        if(this.skillForm.valid){
            var cleanObject = this.removeEmptyFields(skillValues);
            skillValues.organization = this.authService.getLoggedInUser().organizationId;
            skillValues._id = this.currentSkill._id;
            this.skillService.update(cleanObject).subscribe(
                data => {
                    this.router.navigate(['/professional/skills']);
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                });
        }
        else
            this.showErrors = true;
    }
    removeEmptyFields(skillValues: Skill){
        for(var prop in skillValues){
            if(skillValues[prop] == "")
                delete skillValues[prop];
        }
        return skillValues;
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
    getId(key: string){
        let target = this.targetTypes.find(targetType => targetType.name.toLowerCase().indexOf(key) > -1);
        return target === null ? '' : target._id;
    }
    showDtt() {
        let val = this.skillForm.controls.targetType.value;
        return val === this.dttTypeId;
    }
    showTaskAnalysis() {
        let val = this.skillForm.controls.targetType.value;
        return val === this.taskAnalysisId;
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
