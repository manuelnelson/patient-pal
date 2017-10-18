import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, ClientCurriculumService } from '../../services';
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
        private router: Router, private route: ActivatedRoute, private clientCurriculumService: ClientCurriculumService){            
            this.clientCurriculum = this.route.snapshot.data["clientCurriculum"];
            this.skillData = this.route.snapshot.data["skillData"];
    }
    ngOnInit(){
        this.isCurriculumCompleted(); 
    }
    reachedMaximum(skill: Skill){
        let data = this.skillData.filter(x=>x.skill._id === skill._id).sort((a, b) => b.trialNumber - a.trialNumber);
        if(data && data.length > 0)
            return data[0].trialNumber >= skill.numberOfTrials;
    }

    isCurriculumCompleted(){
        console.log('notFinished'); 
        let notFinished = this.clientCurriculum.curriculum.skills.filter(x=>!this.reachedMaximum(x));
        if(!notFinished || notFinished.length === 0){
            console.log('finished!')
            this.clientCurriculum.completed = true;
            this.clientCurriculumService.update(this.clientCurriculum).subscribe(curriculum => curriculum);

        }
    }

    runSkill(skill:Skill){
        const currRoute = this.router.url.replace('navigation','');
        this.router.navigate([currRoute + '/skill/' + skill._id]);
    }
}
