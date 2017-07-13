import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, AlertService } from '../../services';
import { Curriculum } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'curriculum-list',
    template: require('./curriculum-list.component.html')
})
export class CurriculumListComponent implements OnInit {
    curriculums: Array<Curriculum> = new Array<Curriculum>();
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            this.curriculums = this.route.snapshot.data["curriculums"];
    }
    ngOnInit(){
    }
}
