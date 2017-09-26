import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, SkillService, AlertService, AuthenticationService, ClientCurriculumService } from '../../services';
import { Curriculum, ClientCurriculum, Appointment, ClientCurriculumApi } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'assign-curriculum',
    template: require('./assign-curriculum.component.html')
})
export class AssignCurriculumComponent implements OnInit {
    curriculumForm: FormGroup;
    searchResults: Array<Curriculum> = null;
    selectedCurriculum: Curriculum;
    existingClientCurriculums: Array<ClientCurriculum> = null;
    existingCurriculums: Array<Curriculum> = null;
    searchInProgress: boolean = false;
    showErrors: boolean = false;
    appointment: Appointment
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private authService: AuthenticationService, private route: ActivatedRoute,
        private clientCurriculumService: ClientCurriculumService){
        this.appointment = route.parent.snapshot.data["appointment"];
        this.existingClientCurriculums = route.snapshot.data["existingClientCurriculums"];
        
    }
    ngOnInit(){
        let keyword = new FormControl('');
        let curriculum = new FormControl('');

        this.curriculumForm = new FormGroup({
            keyword: keyword, 
            curriculum: curriculum
        });

    }
    curriculum(curriculumValues:any){
        if(this.curriculumForm.valid){
            let clientCurriculum = new ClientCurriculumApi();
            clientCurriculum.client = this.appointment.client._id;
            clientCurriculum.curriculum = this.selectedCurriculum._id;
            clientCurriculum.appointment = this.appointment._id;
            this.clientCurriculumService.create(clientCurriculum).subscribe(
                data => {
                    this.router.navigate(['/appointments/' + this.appointment._id + '/start/client-curriculum/' + data._id + '/navigation']);
                },
                error => {
                    this.alertService.errorMessage(JSON.parse(error._body).message);
                });
        }
        else
            this.showErrors = true;
    }
    invalidControl(control:FormControl){
        return control.invalid && control.touched || control.invalid && this.showErrors;
    }
    search(){
        if(this.curriculumForm.controls.keyword.value.length > 2 && !this.searchInProgress){
            this.searchInProgress = true;
            this.curriculumService.search(this.curriculumForm.controls.keyword.value)
                .subscribe(results => {
                    this.searchInProgress = false;
                    this.searchResults = results
                });
        }
    }
    select(curriculum: Curriculum){
        this.searchResults = null;
        this.curriculumForm.controls.keyword.reset();
        this.selectedCurriculum = curriculum;
        this.curriculumForm.controls.keyword.patchValue(curriculum.name);
        this.curriculumForm.controls.curriculum.patchValue(curriculum._id);
    }
}
