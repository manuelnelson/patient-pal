import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi, DttType } from '../../../models';
import { SkillDataService, AlertService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'frequency-component',
    template: require('./frequency.component.html')
})
export class FrequencyComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number;
    counter: number = 0;
    constructor(private skillDataService: SkillDataService, private router: Router, private alertService: AlertService){
    }

    ngOnInit(){
    this.skillDataService.getLatest(this.skill._id, this.clientCurriculum._id)
            .subscribe(skillData => {
                if(skillData == null)
                    this.trialNumber = 1;
                else{
                    this.trialNumber = skillData.trialNumber + 1;
                    this.checkMaximum();
                }
            })
            
    }

    save(){
        let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber,this.counter,null, '', null);
        this.skillDataService.create(skillData)
            .subscribe(skill => {
                //increase trial number
                this.trialNumber++;
                this.counter = 0;
                this.checkMaximum();
            })
    }
    increment(){
        this.counter++;
    }
    decrement(){
        this.counter--;
    }
    //check if we hit max trials
    checkMaximum(){       
        if(this.trialNumber > this.skill.numberOfTrials){
            this.alertService.warningMessage("You've reached the maximum number of trials for this skill", true);
            this.skillList();
        }
    }
    //TODO: confirm with Beth that the frequency can be zero. If so, they whould be able to save right away
    canSave(){
        return true;
    }
    //send event to let know to move to next skill
    nextSkill(){
        this.goToNextSkill.emit();
        }
    //head back to skill list
    skillList(){
        this.goToSkillList.emit();
    }

}
