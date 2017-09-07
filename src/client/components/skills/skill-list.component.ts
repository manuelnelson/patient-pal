import { Curriculum } from '../../models';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService } from '../../services';
import { Skill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'skill-list',
    template: require('./skill-list.component.html')
})
export class SkillListComponent implements OnInit {
    skills: Array<Skill> = new Array<Skill>();
    curriculum: Curriculum;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            if(this.route.snapshot.data['curriculum']){
                this.curriculum = this.route.snapshot.data['curriculum'];
                this.skills = this.curriculum.skills;
            }
            else
                this.skills = this.route.snapshot.data["skills"];
    }
    ngOnInit(){
    }
    toggleSkill(skill: Skill){
        skill.expanded = !skill.expanded;
    }
}
