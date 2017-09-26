import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService } from '../../services';
import { Skill, ClientCurriculum, SkillData } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'skill-list',
    template: require('./curriculum-skill-list.component.html')
})
export class CurriculumSkillListComponent implements OnInit { 
    clientCurriculum: ClientCurriculum;
    skillData: Array<SkillData>;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){            
            this.clientCurriculum = this.route.snapshot.data["clientCurriculum"];
            this.skillData = this.route.snapshot.data["skillData"];
    }
    ngOnInit(){
    }
    reachedMaximum(skill: Skill){
        console.log(skill);
        console.log(this.skillData);
        let data = this.skillData.filter(x=>x.skill._id === skill._id).sort((a, b) => b.trialNumber - a.trialNumber);
        console.log(data);
        if(data && data.length > 0)
            return data[0].trialNumber >= skill.numberOfTrials;
    }
    runSkill(skill:Skill){
        const currRoute = this.router.url.replace('navigation','');
        this.router.navigate([currRoute + '/skill/' + skill._id]);
    }
}
