import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CurriculumService, AlertService } from '../../services';
import { Curriculum, ClientCurriculum, Appointment } from '../../models';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'select-curriculum-list',
    template: require('./select-curriculum-list.component.html')
})
export class SelectCurriculumListComponent implements OnInit {
    @Input() clientCurriculums: Array<ClientCurriculum>;
    curriculums: Array<Curriculum>;
    constructor(private curriculumService:CurriculumService,private alertService:AlertService,
        private router: Router, private route: ActivatedRoute){
    }
    ngOnInit(){
        this.curriculums = this.clientCurriculums ? this.clientCurriculums.map(x => x.curriculum) : null;
    }
    
    goToNavigate(curriculum:Curriculum){
        const clientCurriculum = this.clientCurriculums.find(x=>x.curriculum._id == curriculum._id)
        this.router.navigate(['/appointments/' + clientCurriculum.appointment._id + '/start/client-curriculum/' + clientCurriculum._id + '/navigation']);
    }
}
