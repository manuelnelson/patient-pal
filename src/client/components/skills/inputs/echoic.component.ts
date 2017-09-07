import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi, DttType } from '../../../models';
import { SkillDataService, AlertService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'echoic-component',
    template: require('./echoic.component.html')
})
export class EchoicComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number;
    slider:number; 
    
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
        let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber,this.slider,null, '', null);
        this.skillDataService.create(skillData)
            .subscribe(skill => {
                //increase trial number
                this.trialNumber++;
                this.slider = 0;
                this.checkMaximum();
            })
    }
    //check if we hit max trials
    checkMaximum(){       
        if(this.trialNumber > this.skill.numberOfTrials){
            //TODO: put in a warning message
            this.alertService.warningMessage("You've reached the maximum number of trials for this skill", true);
            this.skillList();
        }
    }

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
