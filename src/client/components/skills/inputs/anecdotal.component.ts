import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi } from '../../../models';
import { SkillDataService, AlertService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'anecdotal-component',
    template: require('./anecdotal.component.html')
})
export class AnecdotalComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    
    //used to consolidate logic in the run appointment component
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();
    
    trialNumber: number = 0;
    form: FormGroup;
    text: String = "";

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
        let text = new FormControl('', Validators.required);
        this.form = new FormGroup({
            text: text,
        });
    }

    save(){
        if(this.form.valid){
            let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,this.trialNumber,null,this.form.controls.text.value, '', null);
            this.skillDataService.create(skillData)
                .subscribe(skill => {
                    //update buttons
                    this.form.reset();
                    //increase trial number
                    this.trialNumber++;
                    this.checkMaximum();
                })

        }
    }

    //check if we hit max trials
    checkMaximum(){       
        if(this.trialNumber > this.skill.numberOfTrials){
            //TODO: put in a warning message
            this.alertService.warningMessage("You've reached the maximum number of trials for this skill", true);
            this.skillList();
        }
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
