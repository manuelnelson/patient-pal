import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, AlertService } from '../../services';
import { Curriculum, CurriculumCategory } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import {Constants} from '../../constants';
import {groupBy} from 'lodash';
@Component({
    selector: 'curriculum-list',
    template: require('./curriculum-list.component.html')
})
export class CurriculumListComponent implements OnInit {
    //curriculums: Array<Curriculum> = new Array<Curriculum>();
    curriculumCategories: Array<any>;
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
            //organize by curriculum categories
            let curriculums = this.route.snapshot.data["curriculums"] as Array<Curriculum>;
            curriculums.map(x => {
                if(!x.curriculumCategory){
                    let curriculumCategory = new CurriculumCategory();
                    curriculumCategory.name = Constants.DefaultCurriculumCategory;
                    x.curriculumCategory = curriculumCategory
                }
            });
            let grouped = groupBy(curriculums, 'curriculumCategory.name');
            // console.log(Object.keys(grouped));
            this.curriculumCategories = (Object.keys(grouped)).reduce((x:any,y:string) => {
                return x.concat([{name: y, curriculums: grouped[y]}]);
            },[])
            console.log(this.curriculumCategories);
            
    }
    ngOnInit(){
        this.route.queryParams.subscribe(
            (queryParam: any) => {
                // if(queryParam['refresh']){
                //     this.curriculumService.list('').subscribe(curriculums => this.curriculums = curriculums);                    
                // }
        });
    }
}
