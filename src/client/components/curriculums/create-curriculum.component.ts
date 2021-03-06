import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, SkillService, AlertService, AuthenticationService } from '../../services';
import { Curriculum, Skill } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'curriculum-form',
    template: require('./create-curriculum.component.html')
})
export class CreateCurriculumComponent implements OnInit {
    curriculumForm: FormGroup;
    searchResults: Array<Skill> = null;
    selectedItems: Array<Skill> = new Array<Skill>();
    keyword: string = '';
    searchInProgress: boolean = false;
    showErrors: boolean = false;
    @Output() curriculumCreated: EventEmitter<any> = new EventEmitter();

    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private skillService: SkillService, private authService: AuthenticationService){
    }
    ngOnInit(){
        let name = new FormControl('', Validators.required);
        // let skills = new FormControl('', Validators.required);
        // let keyword = new FormControl('');

        this.curriculumForm = new FormGroup({
            name: name,
            // skills: skills,
            // keyword: keyword
        });
    }
    curriculum(curriculumValues:any){
        //this.router.navigate(['/professional/curriculums']);
        if(this.curriculumForm.valid){
            // curriculumValues.skills = JSON.parse(curriculumValues.skills);
            curriculumValues.organization = this.authService.getLoggedInUser().organizationId;
            this.curriculumService.create(curriculumValues).subscribe(
                data => {
                    this.router.navigate([`/professional/curriculums/view/${data._id}`], {queryParams: {refresh: true}});
                },
                error => {
                    this.alertService.error(error);
                });
        }
        else
            this.showErrors = true;
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
    // search(){
    //     if(this.curriculumForm.controls.keyword.value && this.curriculumForm.controls.keyword.value.length > 1 && !this.searchInProgress){
    //         this.searchInProgress = true;
    //         this.skillService.search(this.curriculumForm.controls.keyword.value)
    //             .subscribe(results => {
    //                 console.log(results)
    //                 this.searchInProgress = false;
    //                 this.searchResults = results
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //             });
    //     }
    // }
    // selectSkill(skill: Skill){
    //     this.searchResults = null;
    //     this.curriculumForm.controls.keyword.reset();
    //     this.selectedItems.push(skill);
    //     let selectedValues = this.selectedItems.map(x => x._id.toString());
    //     this.curriculumForm.controls.skills.patchValue(JSON.stringify(selectedValues));
    // }
    // removeSkill(skill: Skill){
    //     this.selectedItems = this.selectedItems.filter(x => x.targetName !== skill.targetName)
    //     let selectedValues = this.selectedItems.map(x => x._id.toString());
    //     this.curriculumForm.controls.skills.patchValue(JSON.stringify(selectedValues));
    // }
}
