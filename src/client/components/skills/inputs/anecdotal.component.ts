import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill, ClientCurriculum, SkillDataApi } from '../../../models';
import { SkillDataService } from '../../../services';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'anecdotal-component',
    template: require('./anecdotal.component.html')
})
export class AnecdotalComponent implements OnInit{
    @Input() skill: Skill;
    @Input() clientCurriculum: ClientCurriculum;
    @Output() goToNextSkill =  new EventEmitter<boolean>();
    @Output() goToSkillList =  new EventEmitter<boolean>();

    form: FormGroup;

    text: String = "";
    constructor(private skillDataService: SkillDataService){
    }

    ngOnInit(){
        console.log(this.skill._id);
        let text = new FormControl('', Validators.required);
        this.form = new FormGroup({
            text: text,
        });
    }

    save(){
        debugger;
        if(this.form.valid){
            let skillData = this.skillDataService.buildApiModel(this.skill._id, this.clientCurriculum._id,1,null,this.form.controls.text.value, '');
            this.skillDataService.create(skillData)
                .subscribe(skill => {
                    //update buttons
                })

        }
    }
    //send event to let know to move to next skill
    nextSkill(){
        this.goToNextSkill.emit();
    }
    //head back to skill list
    skillList(){
        this.goToSkillList.emit();
    }

}
