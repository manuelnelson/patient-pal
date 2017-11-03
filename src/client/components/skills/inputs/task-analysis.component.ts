import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi, DttType, TaskStep } from '../../../models';
import { SkillDataService, AlertService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'task-analysis-component',
    template: require('./task-analysis.component.html')
})
export class TaskAnalysisComponent implements OnInit{
    tasks: Array<TaskStep> = new Array<TaskStep>();
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number;
    constructor(private skillDataService: SkillDataService, private router: Router, private alertService: AlertService){
    }

    ngOnInit(){
        this.skill.taskSteps.split(',').map((task) => {
            let taskStep : TaskStep = {
                name: task.trim(),
                value: false
            };
            this.tasks.push(taskStep);
        })
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
    toggleTask(task: TaskStep){
        task.value = !task.value;
    }
    save(){
        //serialize task data
        let stringData = JSON.stringify(this.tasks);
        let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber, 0, stringData, '', null);
        this.skillDataService.create(skillData)
            .subscribe(skill => {
                //increase trial number
                this.trialNumber++;
                this.tasks.forEach(x => x.value = false);
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
    //TODO: confirm with Beth that the task-analysis can be zero. If so, they whould be able to save right away
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
