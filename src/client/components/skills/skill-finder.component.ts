import { Curriculum } from '../../models';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, CurriculumService } from '../../services';
import { Skill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import { DataObserver, data } from 'statex/angular';
import { UpdateCurriculumAction, SetCurriculumAction, AddCurriculumSkillAction } from '../../stores/actions';
import { AppState } from '../../models'
import {sortFn} from '../../helpers/search-helpers';


export const selectState = (state: AppState) => state

@Component({
    selector: 'skill-finder',
    template: require('./skill-finder.component.html')
})
export class SkillFinderComponent extends DataObserver {
    skills: Array<Skill> = new Array<Skill>();

    @data((state: AppState) => state.curriculum)
    curriculum: Curriculum;

    // works with functions to allow complex calculations
    //update list when curriculum changes
    @data(selectState)     
    curriculumDidChange(state: AppState) {
      // you logic here
      this.updateTargetList();
    }


    ascendingOrder:boolean = false;
    sortField: String = 'targetName';
    pageSize: 5;
    page: 1;
    skillFinderForm: FormGroup;
    allFilteredSkills: Array<Skill>;
    
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private curriculumService: CurriculumService){
            super();
    }
    ngOnInit(){
        if(!this.curriculum){
            this.alertService.warningMessage("Unable to find curriculum");
            this.router.navigate(['/professional']);   
            return;             
        }
        this.updateTargetList();
        this.sortBy('targetName');

        this.skillFinderForm = new FormGroup({
            targetName: new FormControl('')
        });
    }
    add(skill:Skill){
        if(this.doesTargetAlreadyExist(skill)){
            this.skills = this.skills.filter(x=>x._id !== skill._id);
            return;
        }
        new AddCurriculumSkillAction(skill,this.curriculum).dispatch();
        this.curriculumService.update(this.curriculum).subscribe(updateCurriculum => {
            this.updateTargetList();
            new UpdateCurriculumAction(this.curriculum).dispatch();
        })
    }

    sortBy(sort: String, dontToggle:boolean = false){
        this.ascendingOrder = dontToggle ? this.ascendingOrder : !this.ascendingOrder;
        this.sortField = sort;
        switch(sort){
            case 'targetName':
                this.skills.sort((x,y) => sortFn(x.targetName.toUpperCase(), y.targetName.toUpperCase(), this.ascendingOrder));
                break;
            case 'targetType':
                this.skills.sort((x,y) => sortFn(x.targetType.name.toUpperCase(), y.targetType.name.toUpperCase(), this.ascendingOrder))
                break;
        }
    }

    search(){
        if(this.skillFinderForm.controls.targetName.value.length > 0)
            this.skills = this.skills.filter(x => (x.targetName.toUpperCase().indexOf(this.skillFinderForm.controls.targetName.value.toUpperCase()) > -1) 
            || (x.targetType.name.toUpperCase().indexOf(this.skillFinderForm.controls.targetName.value.toUpperCase()) > -1))
        else
            this.skills = this.allFilteredSkills;
    }

    updateTargetList(){
        let existingSkills = this.curriculum.skills;
        let allSkills = this.route.snapshot.data["skills"] as Array<Skill>;
        //remove any targets that already exist on the curriculum.
        this.skills = allSkills.filter(x=>existingSkills.find(y=>y._id === x._id) === undefined && x.targetType);
        this.allFilteredSkills = this.skills;
        this.sortBy(this.sortField, true);
    }
    doesTargetAlreadyExist(skill:Skill){
        return this.curriculum.skills.filter(x=> x._id === skill._id).length > 0;
    }

    toggleSkill(skill: Skill){
        skill.expanded = !skill.expanded;
    }
}
