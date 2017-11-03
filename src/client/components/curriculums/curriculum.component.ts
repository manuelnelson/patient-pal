import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, AlertService, CurriculumCategoryService, AuthenticationService } from '../../services';
import { Curriculum, ClientCurriculum, CurriculumCategory, CurriculumApi } from '../../models';
import { Router, ActivatedRoute } from "@angular/router"; 
import { DataObserver, data } from 'statex/angular';
import { UpdateCurriculumAction, SetCurriculumAction } from '../../stores/actions'

@Component({
    selector: 'curriculum',
    template: require('./curriculum.component.html')
})
export class CurriculumComponent extends DataObserver {     
    curriculum: Curriculum;
    categoryForm: FormGroup;
    searchResults: Array<CurriculumCategory> = null;
    searchInProgress: boolean = false;    
    isCategoryEditable: boolean = false;
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute, private curriculumCategoryService: CurriculumCategoryService,
        private authService: AuthenticationService){
            super();
            this.curriculum = this.route.snapshot.data.curriculum;
            new SetCurriculumAction(this.curriculum).dispatch();
    }
    toggleCategoryEditMode(){
        this.isCategoryEditable = !this.isCategoryEditable;
    }
    ngOnInit(){
        let keyword = new FormControl(this.curriculum.curriculumCategory ?this.curriculum.curriculumCategory.name: '', Validators.required);

        this.categoryForm = new FormGroup({
            keyword: keyword
        });

    }
    search(){
        if(this.categoryForm.controls.keyword.value && this.categoryForm.controls.keyword.value.length > 1 && !this.searchInProgress){
            this.searchInProgress = true;
            this.curriculumCategoryService.search(this.categoryForm.controls.keyword.value)
                .subscribe(results => {
                    this.searchInProgress = false;
                    this.searchResults = results
                },
                error => {
                    this.alertService.error(error);
                });
        }
    }
    selectCategory(category: CurriculumCategory){
        this.searchResults = null;
        this.categoryForm.controls.keyword.setValue(category.name);
        //this.categoryForm.controls. // set(category.name);
    }

    category(curriculumValues:any){
        if(this.categoryForm.controls.keyword.value.length > 0){
            let category = new CurriculumCategory();
            category.name = this.categoryForm.controls.keyword.value;
            category.organization = this.authService.getLoggedInUser().organizationId;
            this.curriculumCategoryService.create(category).subscribe(
                data => {
                    let curriculumApi = new CurriculumApi(this.curriculum);
                    curriculumApi.curriculumCategory = data._id;
                    this.curriculumService.updateCategory(curriculumApi).subscribe(updatedCurriculum =>{
                        this.toggleCategoryEditMode();
                        this.curriculum = updatedCurriculum;
                    })
                },
                error => {
                    this.alertService.error(error);
                });
        }
    }


    ngOnDestroy(){
        //new SetCurriculumAction(undefined).dispatch();        
    }
}
