import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, SkillService, AlertService, AuthenticationService, ClientCurriculumService } from '../../services';
import { Curriculum, ClientCurriculum, Appointment, ClientCurriculumApi } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
import {sortFn} from '../../helpers/search-helpers';

@Component({
    selector: 'assign-curriculum',
    template: require('./assign-curriculum.component.html')
})
export class AssignCurriculumComponent implements OnInit {
    curriculumFinderForm: FormGroup;
    curriculums: Array<Curriculum>;
    allCurriculums: Array<Curriculum>;
    existingClientCurriculums: Array<ClientCurriculum> = null;
    existingCurriculums: Array<Curriculum> = null;
    appointment: Appointment
    ascendingOrder:boolean = false;
    sortField: String = 'targetName';
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private authService: AuthenticationService, private route: ActivatedRoute,
        private clientCurriculumService: ClientCurriculumService){
        this.appointment = route.parent.snapshot.data["appointment"]; 
        this.existingClientCurriculums = route.snapshot.data["existingClientCurriculums"];
        this.curriculums = route.snapshot.data['curriculums'];
        this.allCurriculums = this.curriculums;
        
    }
    ngOnInit(){
        let name = new FormControl('');
        let curriculum = new FormControl('');

        this.curriculumFinderForm = new FormGroup({
            name: name, 
            curriculum: curriculum
        });

    }
    sortBy(sort: String, dontToggle:boolean = false){
        this.ascendingOrder = dontToggle ? this.ascendingOrder : !this.ascendingOrder;
        this.sortField = sort;
        switch(sort){
            case 'name':
                this.curriculums.sort((x,y) => sortFn(x.name.toUpperCase(), y.name.toUpperCase(), this.ascendingOrder));
                break;
            case 'curriculumCategory':
                this.curriculums.sort((x,y) => sortFn(x.curriculumCategory.name.toUpperCase(), y.curriculumCategory.name.toUpperCase(), this.ascendingOrder))
                break;
        }
    }
    add(selectedCurriculum:Curriculum){
        let clientCurriculum = new ClientCurriculumApi();
        clientCurriculum.client = this.appointment.client._id;
        clientCurriculum.curriculum = selectedCurriculum._id;
        clientCurriculum.appointment = this.appointment._id;
        this.clientCurriculumService.create(clientCurriculum).subscribe(
            data => {
                this.router.navigate(['/appointments/' + this.appointment._id + '/start/client-curriculum/' + data._id + '/navigation']);
            },
            error => {
                this.alertService.error(error);
            }
        );    
    }
    search(){
        if(this.curriculumFinderForm.controls.name.value.length > 0)
            this.curriculums = this.curriculums.filter(x => (x.name.toUpperCase().indexOf(this.curriculumFinderForm.controls.name.value.toUpperCase()) > -1) 
            || (x.curriculumCategory.name.toUpperCase().indexOf(this.curriculumFinderForm.controls.name.value.toUpperCase()) > -1))
        else
            this.curriculums = this.allCurriculums;
    }

}
