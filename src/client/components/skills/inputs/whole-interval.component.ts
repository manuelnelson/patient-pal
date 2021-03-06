import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi, DttType, Timer } from '../../../models';
import { SkillDataService, AlertService, TimerService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'whole-interval-component',
    template: require('./whole-interval.component.html')
})
export class WholeIntervalComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>(); 
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number;
    counter: number = 0;
    timer: Timer;
    completed: boolean = false;
    
    constructor(private skillDataService: SkillDataService, private router: Router, private alertService: AlertService,
    private timerService: TimerService){
    }

    ngOnInit(){
        this.timer = this.timerService.getTimer(this.skill._id);
        if(!this.timer){
            this.timer = this.timerService.addTimer(this.skill._id);            
        }
        this.timer.initializeCountdownTimer(this.skill.interval)

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
        let data = { duration: this.timer.totalValue, checked: this.completed};
        
        let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber,null,JSON.stringify(data), '', null);
        this.skillDataService.create(skillData)
            .subscribe(skill => {
                //increase trial number
                this.trialNumber++;
                this.clear();
                this.checkMaximum();
            })
    }
    //check if we hit max trials
    checkMaximum(){       
        if(this.trialNumber > this.skill.numberOfTrials){
            this.alertService.warningMessage("You've reached the maximum number of trials for this skill", true);
            this.skillList();
        }
    }
    start(){
        this.timer.start();
    }
    stop(){
        this.timer.stop();
    }
    clear(){
        this.timer.clear();
    }
    toggle(){
        this.completed = !this.completed;
    }

    canSave(){
        return this.timer.stopped && this.timer.totalValue > 0;
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
