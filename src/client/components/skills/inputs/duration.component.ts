import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi, DttType } from '../../../models';
import { SkillDataService, AlertService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'duration-component',
    template: require('./duration.component.html')
})
export class DurationComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number;
    stopped: boolean = true;
    timerValue: number = 0;
    timer = Observable.timer(0,1000);
    timerSubscription: Subscription;
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
        let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber,null,null, '', this.timerValue);
        this.skillDataService.create(skillData)
            .subscribe(skill => {
                //increase trial number
                this.trialNumber++;
                this.timerValue = 0;
                this.checkMaximum();
            })
    }
    start(){
        this.stopped = false;
        this.timerSubscription = this.timer.subscribe(t=>this.timerValue = t)
    }
    stop(){
        this.stopped = true;
        this.timerSubscription.unsubscribe();
    }
    clear(){
        this.timerValue = 0;
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
        return this.stopped && this.timerValue > 0;
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
