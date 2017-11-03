import { ReplaceableState, Store, action } from 'statex/angular'

import { AddCurriculumAction, RemoveCurriculumAction, UpdateCurriculumAction, SetCurriculumAction, RemoveCurriculumSkillAction, AddCurriculumSkillAction } from './actions'   
import { AppState } from '../models'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { Observer } from 'rxjs/Rx'
import { CurriculumService } from './../services/curriculum.service'
import {clone, cloneDeep} from 'lodash';
@Injectable()
export class CurriculumStore extends Store {

  constructor(private curriculumService: CurriculumService) {
    super()
  }

  @action()
  update(state: AppState, action: UpdateCurriculumAction): AppState {      
    return {
      curriculum: action.Curriculum
    }
  }

  @action()
  removeSkill(state: AppState, action: RemoveCurriculumSkillAction): AppState {   
    let mutableCurriculum = cloneDeep(action.Curriculum); 
    mutableCurriculum.skills = mutableCurriculum.skills.filter(x=>x._id !== action.Skill._id);
    return {
      curriculum: mutableCurriculum
    }
  }
  @action()
  addSkill(state: AppState, action: AddCurriculumSkillAction): AppState {   
    let mutableCurriculum = cloneDeep(action.Curriculum); 
    mutableCurriculum.skills.push(action.Skill);
    console.log(mutableCurriculum);
    
    return {
      curriculum: mutableCurriculum
    }
  }

  @action()
  set(state: AppState, action: SetCurriculumAction): AppState {      
    return {
      curriculum: action.Curriculum
    }
  }

}