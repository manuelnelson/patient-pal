import { Curriculum, Skill } from '../../models'

import { Action } from 'statex'

export class AddCurriculumAction extends Action {
  constructor(public Curriculum: Curriculum) { super() }
}

export class RemoveCurriculumAction extends Action {
  constructor(public id: string) { super() }
}

export class UpdateCurriculumAction extends Action {
  constructor(public Curriculum: Curriculum) { super() }
}
export class RemoveCurriculumSkillAction extends Action {
  constructor(public Skill: Skill, public Curriculum: Curriculum) { super() }
}
export class AddCurriculumSkillAction extends Action {
  constructor(public Skill: Skill, public Curriculum: Curriculum) { super() }
}

export class SetCurriculumAction extends Action {
  constructor(public Curriculum: Curriculum) { super() }
}
