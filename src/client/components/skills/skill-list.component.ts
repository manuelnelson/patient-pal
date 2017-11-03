import { Curriculum } from '../../models';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, CurriculumService } from '../../services';
import { Skill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { DataObserver, data } from 'statex/angular';
import { UpdateCurriculumAction, SetCurriculumAction, RemoveCurriculumSkillAction } from '../../stores/actions';
import { AppState } from '../../models'
import * as _ from 'lodash';

@Component({
    selector: 'skill-list',
    template: require('./skill-list.component.html')
})
export class SkillListComponent extends DataObserver {
    skills: Array<Skill> = new Array<Skill>();

    @data((state: AppState) => state.curriculum)
    curriculum: Curriculum;

    showDelete: boolean = false;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private curriculumService: CurriculumService){
            super();
    }
    ngOnInit(){
        if(this.route.snapshot.data['curriculum']){
            this.skills = this.curriculum.skills; 
            this.showDelete = true;
        }
        else
            this.skills = this.route.snapshot.data["skills"];
    }
    toggleSkill(skill: Skill){
        skill.expanded = !skill.expanded;
    }
    deleteSkill(skill: Skill){
        new RemoveCurriculumSkillAction(skill,this.curriculum).dispatch();
        this.curriculumService.update(this.curriculum).subscribe(updatedCurriculum => {
            this.skills = updatedCurriculum.skills;
            new UpdateCurriculumAction(updatedCurriculum).dispatch();            
        })    
    }
}
