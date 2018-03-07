import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService, ClientCurriculumService, MasteredSkillService } from '../../services';
import { Skill, ClientCurriculum, SkillData, MasteredSkill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'curriculum-skill-list',
    template: require('./curriculum-skill-list.component.html')
})
export class CurriculumSkillListComponent implements OnInit { 
    clientCurriculum: ClientCurriculum;
    skillData: Array<SkillData>;
    masteredSkills: Array<MasteredSkill>;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private clientCurriculumService: ClientCurriculumService,
        private masteredSkillService: MasteredSkillService){             
            this.clientCurriculum = this.route.snapshot.data["clientCurriculum"];
            this.skillData = this.route.snapshot.data["skillData"];
            let query = `client=${this.clientCurriculum.client._id}&curriculum=${this.clientCurriculum.curriculum._id}`
            this.masteredSkillService.list(query).subscribe(masteredSkills => {
                //update computes on the skills
                this.masteredSkills = masteredSkills;
                this.updateSkills();
            })
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
        if(this.clientCurriculum.completed == true)
            return true;
        let notFinished = this.clientCurriculum.curriculum.skills.filter(x=>!this.reachedMaximum(x));
        if(!notFinished || notFinished.length === 0){
            this.clientCurriculum.completed = true;
            this.clientCurriculumService.update(this.clientCurriculum).subscribe(curriculum => curriculum);

        }
    }

    ///If skill is mastered - let's delete it (it must have been a mistake)
    //else let's add it to the mastery segment.
    masterSkill(skill:Skill){
        
        if(skill.mastered){
            skill.mastered = false;
            let currentMasterSkill = this.masteredSkills.find(master => master.skill == skill._id);
            this.masteredSkillService.delete(currentMasterSkill._id).subscribe(y => y);
            return;
        }
        let masteredSkill = new MasteredSkill();
        masteredSkill.client = this.clientCurriculum.client._id;
        masteredSkill.curriculum = this.clientCurriculum.curriculum._id;
        masteredSkill.skill = skill._id;
        masteredSkill.numberOfTrials = skill.numberOfTrials;
        this.masteredSkillService.create(masteredSkill).subscribe(x => {            
            this.masteredSkills.push(x);
            this.updateSkills();
        },
        error => {
            this.alertService.errorMessage(JSON.parse(error._body).message);
        });
    }

    updateSkills(){
        if(this.masteredSkills && this.masteredSkills.length > 0)
            this.clientCurriculum.curriculum.skills.map(skill => skill.mastered = this.masteredSkills.findIndex(x=>x.skill === skill._id) > -1)
    }
    runSkill(skill:Skill){
        const currRoute = this.router.url.replace('navigation','');
        this.router.navigate([currRoute + '/skill/' + skill._id]);
    }
    toAppointment(){
        this.router.navigate([`appointments/${this.clientCurriculum.appointment._id}/start/assign`])
    }
}
