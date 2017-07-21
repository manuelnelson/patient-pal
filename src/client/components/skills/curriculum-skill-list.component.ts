import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SkillService, AlertService } from '../../services';
import { Skill, ClientCurriculum } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'skill-list',
    template: require('./skill-list.component.html')
})
export class CurriculumSkillListComponent implements OnInit {
    clientCurriculum: ClientCurriculum;
    // skills: Array<Skill>;
    constructor(private skillService:SkillService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){            
            this.clientCurriculum = this.route.snapshot.data["clientCurriculum"];
    }
    ngOnInit(){
    }
}
